<?php
/* Shared code for live boards: storage, limits and command validation.
   Used by api/mcp.php (the MCP server AIs connect to) and api/board.php (what live.html polls).

   A board is one file, data/boards/<id>.json:
     { id, title, lang, created, updated, expires, keyHash, rev, commands: [ {seq, type, …}, … ], reports: [ … ] }
   - id is public (it is in the view link); the edit key is only given to whoever created the board
     and is stored hashed. Writing needs both.
   - Boards expire BOARD_TTL_DAYS after their last change and are then deleted.
   - The command list only grows; "clear" is a command too, so the viewer can replay the whole lesson.
   Needs PHP 7.4+ and write access to data/ (the same folder the daily puzzle uses). */

declare(strict_types=1);

const SITE_URL = 'https://dailymathpuzzle.com/';
const BOARDS_DIR = __DIR__ . '/../data/boards';
const BOARD_TTL_DAYS = 30;
const MAX_COMMANDS = 600;            // per board
const MAX_PER_CALL = 80;             // per draw call
const MAX_BOARD_BYTES = 400000;      // per board file
const MAX_NEW_BOARDS_PER_HOUR = 30;  // per IP
const MAX_DRAWS_PER_MINUTE = 40;     // per board
const MAX_REPORTS = 30;

const COLORS = ['chalk', 'white', 'yellow', 'pink', 'blue', 'green', 'orange'];
const CONSTRUCTIONS = ['incircle', 'circumcircle', 'altitudes', 'medians', 'midpoint', 'perpBisector', 'foot'];

final class BoardError extends Exception {}

function boards_dir(): string {
  $data = dirname(BOARDS_DIR);
  if (!is_dir($data) && !@mkdir($data, 0755, true)) throw new BoardError('The server cannot create its data folder.');
  if (!file_exists($data . '/.htaccess')) @file_put_contents($data . '/.htaccess', "Require all denied\nDeny from all\n");
  if (!is_dir(BOARDS_DIR) && !@mkdir(BOARDS_DIR, 0755, true)) throw new BoardError('The server cannot create data/boards.');
  return BOARDS_DIR;
}

function board_path(string $id): string {
  if (!preg_match('/^[a-z0-9]{12,32}$/', $id)) throw new BoardError('Unknown board_id.');
  return boards_dir() . '/' . $id . '.json';
}

function new_id(int $bytes): string {
  // lowercase letters and digits (no look-alikes is not needed: ids are copied, not typed)
  return substr(strtolower(rtrim(strtr(base64_encode(random_bytes($bytes)), '+/', 'ab'), '=')), 0, (int)ceil($bytes * 4 / 3));
}

function view_url(string $id): string { return SITE_URL . 'live.html?b=' . $id; }

function client_ip(): string { return (string)($_SERVER['REMOTE_ADDR'] ?? '0'); }

/** small fixed-window rate limiter kept in one file */
function rate_ok(string $bucket, int $limit, int $window): bool {
  $f = boards_dir() . '/_rate.json';
  $fh = @fopen($f, 'c+'); if (!$fh) return true;
  flock($fh, LOCK_EX);
  $d = json_decode((string)stream_get_contents($fh), true); if (!is_array($d)) $d = [];
  $now = time(); $slot = (string)intdiv($now, $window);
  foreach ($d as $k => $v) if (!is_array($v) || ($v['t'] ?? 0) < $now - 7200) unset($d[$k]);
  $key = hash('sha256', $bucket . '|' . $slot);
  $n = ($d[$key]['n'] ?? 0) + 1;
  $d[$key] = ['n' => $n, 't' => $now];
  ftruncate($fh, 0); rewind($fh); fwrite($fh, json_encode($d)); fflush($fh); flock($fh, LOCK_UN); fclose($fh);
  return $n <= $limit;
}

/** delete expired boards now and then (about one request in 50) */
function maybe_gc(): void {
  if (random_int(1, 50) !== 1) return;
  foreach (glob(boards_dir() . '/*.json') ?: [] as $f) {
    if (basename($f)[0] === '_') continue;
    if (filemtime($f) < time() - BOARD_TTL_DAYS * 86400) @unlink($f);
  }
}

/** open a board with a lock; returns [handle, board] */
function board_open(string $id, bool $write) {
  $p = board_path($id);
  if (!file_exists($p)) throw new BoardError('Unknown board_id (boards are deleted ' . BOARD_TTL_DAYS . ' days after their last change). Create a new one with create_board.');
  $fh = @fopen($p, $write ? 'c+' : 'r'); if (!$fh) throw new BoardError('The board cannot be opened.');
  flock($fh, $write ? LOCK_EX : LOCK_SH);
  $b = json_decode((string)stream_get_contents($fh), true);
  if (!is_array($b)) { fclose($fh); throw new BoardError('The board file is damaged.'); }
  return [$fh, $b];
}

function board_save($fh, array $b): void {
  $json = json_encode($b, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
  if (strlen($json) > MAX_BOARD_BYTES) throw new BoardError('The board is full (' . MAX_BOARD_BYTES . ' bytes). Create a new board for the next part of the lesson.');
  ftruncate($fh, 0); rewind($fh); fwrite($fh, $json); fflush($fh);
}

function board_close($fh): void { flock($fh, LOCK_UN); fclose($fh); }

function board_create(string $title, string $lang): array {
  maybe_gc();
  if (!rate_ok('new|' . client_ip(), MAX_NEW_BOARDS_PER_HOUR, 3600)) throw new BoardError('Too many new boards from this address — wait a while, or keep drawing on an existing board.');
  $id = new_id(12); $key = new_id(18);
  $now = time();
  $b = ['id' => $id, 'title' => clip_text($title ?: 'Lesson', 120), 'lang' => in_array($lang, ['en', 'fr', 'es', 'ja', 'zh'], true) ? $lang : 'en',
        'created' => $now, 'updated' => $now, 'keyHash' => hash('sha256', $key), 'rev' => 0, 'seq' => 0, 'epoch' => 1, 'commands' => [], 'reports' => []];
  $p = board_path($id);
  if (@file_put_contents($p, json_encode($b, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE), LOCK_EX) === false) throw new BoardError('The server cannot save boards (is data/ writable?).');
  return ['board_id' => $id, 'edit_key' => $key, 'view_url' => view_url($id), 'title' => $b['title'],
          'expires' => gmdate('Y-m-d', $now + BOARD_TTL_DAYS * 86400)];
}

function board_check_key(array $b, string $key): void {
  if ($key === '' || !hash_equals($b['keyHash'], hash('sha256', $key))) throw new BoardError('Wrong edit_key for this board. Use the edit_key that create_board returned.');
}

/** append validated commands; returns a summary */
function board_draw(string $id, string $key, $commands, bool $replace = false): array {
  if (!is_array($commands) || !$commands) throw new BoardError('commands must be a non-empty array of command objects.');
  if (count($commands) > MAX_PER_CALL) throw new BoardError('At most ' . MAX_PER_CALL . ' commands per draw call — split the lesson into several calls.');
  [$fh, $b] = board_open($id, true);
  try {
    board_check_key($b, $key);
    if (!rate_ok('draw|' . $id, MAX_DRAWS_PER_MINUTE, 60)) throw new BoardError('Too many draw calls on this board in one minute — send bigger batches.');
    $clean = []; $warnings = [];
    $known = known_ids($replace ? [] : $b['commands']);
    foreach (array_values($commands) as $i => $c) {
      try {
        $v = validate_command($c, $known, $warnings, $i); $clean[] = $v;
        foreach (['equation'] as $f) if (isset($v[$f]) && strpos($v[$f], '\\') !== false) $warnings[] = 'Command #' . ($i + 1) . ': "' . $f . '" uses calculator syntax, not LaTeX — write sqrt(x), x^2, pi, sin(x) instead of \\sqrt, \\pi…';
        if (($v['type'] === 'write' || $v['type'] === 'step') && substr_count($v['text'] ?? '', '$') % 2) $warnings[] = 'Command #' . ($i + 1) . ': unbalanced $ in text — maths must be inside $…$.';
      }
      catch (BoardError $e) { throw new BoardError('Command #' . ($i + 1) . ': ' . $e->getMessage()); }
    }
    if ($replace) { $b['commands'] = []; $b['reports'] = []; $b['epoch'] = ($b['epoch'] ?? 1) + 1; }
    if (count($b['commands']) + count($clean) > MAX_COMMANDS) throw new BoardError('The board is full (' . MAX_COMMANDS . ' commands). Create a new board for the next part.');
    $seq = (int)($b['seq'] ?? 0);
    foreach ($clean as $c) { $c = ['seq' => ++$seq] + $c; $b['commands'][] = $c; }
    $b['seq'] = $seq; $b['rev']++; $b['updated'] = time();
    board_save($fh, $b);
  } finally { board_close($fh); }
  $steps = count(array_filter($b['commands'], fn($c) => $c['type'] === 'step'));
  return ['board_id' => $id, 'view_url' => view_url($id), 'added' => count($clean), 'total_commands' => count($b['commands']),
          'steps' => $steps, 'first_seq' => $seq - count($clean) + 1, 'last_seq' => $seq, 'warnings' => $warnings];
}

function board_public(array $b, int $since = 0): array {
  return ['id' => $b['id'], 'title' => $b['title'], 'lang' => $b['lang'], 'rev' => $b['rev'], 'epoch' => $b['epoch'] ?? 1, 'updated' => $b['updated'],
          'commands' => array_values(array_filter($b['commands'], fn($c) => $c['seq'] > $since))];
}

/** what the viewer could not draw (unknown equation, missing axes…) so the AI can fix it */
function board_report(string $id, $errors): void {
  if (!is_array($errors)) return;
  if (!rate_ok('report|' . $id, 20, 60)) return;
  [$fh, $b] = board_open($id, true);
  try {
    foreach (array_slice($errors, 0, 10) as $e) {
      if (!is_array($e)) continue;
      $r = ['seq' => (int)($e['seq'] ?? 0), 'error' => clip_text((string)($e['error'] ?? ''), 300), 'at' => time()];
      if ($r['error'] === '') continue;
      foreach ($b['reports'] as $old) if ($old['seq'] === $r['seq'] && $old['error'] === $r['error']) continue 2;
      $b['reports'][] = $r;
    }
    $b['reports'] = array_slice($b['reports'], -MAX_REPORTS);
    board_save($fh, $b);
  } finally { board_close($fh); }
}

// ------------------------------------------------------------------ validation

function clip_text(string $s, int $max): string {
  $s = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/u', '', $s) ?? '';
  return function_exists('mb_substr') ? mb_substr(trim($s), 0, $max) : substr(trim($s), 0, $max);
}

/** ids (axes, graphs, geometry points) defined by earlier commands, so references can be checked */
function known_ids(array $cmds): array {
  $k = ['axes' => [], 'graph' => [], 'point' => []];
  foreach ($cmds as $c) {
    if ($c['type'] === 'clear') { $k = ['axes' => [], 'graph' => [], 'point' => []]; continue; }
    if ($c['type'] === 'axes') $k['axes'][$c['id']] = 1;
    if ($c['type'] === 'plot' && isset($c['id'])) $k['graph'][$c['id']] = 1;
    if ($c['type'] === 'geometry') {
      foreach (array_keys($c['points'] ?? []) as $p) $k['point'][$p] = 1;
      foreach ($c['construct'] ?? [] as $con) foreach ($con['names'] ?? [] as $p) $k['point'][$p] = 1;
    }
  }
  return $k;
}

function num($v, string $what, float $lo = -1e6, float $hi = 1e6): float {
  if (!is_int($v) && !is_float($v) && !(is_string($v) && is_numeric($v))) throw new BoardError("$what must be a number.");
  $f = (float)$v;
  if (!is_finite($f) || $f < $lo || $f > $hi) throw new BoardError("$what must be between $lo and $hi.");
  return $f;
}
function frac($v, string $what): float { return num($v, $what, -0.2, 1.2); }
function ident($v, string $what): string {
  if (!is_string($v) || !preg_match('/^[A-Za-z][A-Za-z0-9_\']{0,15}$/', $v)) throw new BoardError("$what must be a short name like \"A\", \"f\" or \"ax1\".");
  return $v;
}
function color_of(array $c): ?string {
  if (!isset($c['color'])) return null;
  $v = strtolower((string)$c['color']);
  if (!in_array($v, COLORS, true)) throw new BoardError('color must be one of: ' . implode(', ', COLORS) . '.');
  return $v === 'white' ? 'chalk' : $v;
}
function equation($v, string $what): string {
  if (!is_string($v) || trim($v) === '') throw new BoardError("$what is required.");
  if ((function_exists('mb_strlen') ? mb_strlen($v) : strlen($v)) > 300) throw new BoardError("$what is too long (300 characters max).");
  return clip_text($v, 300);
}

/** board position: fractions of the board (x from the left, y from the top), or a point of an axes, or a geometry point */
function position(array $c, array $known, string $what = 'position'): array {
  $o = [];
  if (isset($c['axes'])) {
    $a = ident($c['axes'], 'axes'); if (!isset($known['axes'][$a])) throw new BoardError("no axes called \"$a\" — create it first with {\"type\":\"axes\",\"id\":\"$a\",…}.");
    $o['axes'] = $a; $o['x'] = num($c['x'] ?? null, "$what x"); $o['y'] = num($c['y'] ?? null, "$what y");
  } elseif (isset($c['near'])) {
    $p = ident($c['near'], 'near'); if (!isset($known['point'][$p])) throw new BoardError("no geometry point called \"$p\".");
    $o['near'] = $p;
  } else {
    $o['x'] = frac($c['x'] ?? 0.05, "$what x"); $o['y'] = frac($c['y'] ?? 0.1, "$what y");
  }
  if (isset($c['dx'])) $o['dx'] = num($c['dx'], 'dx', -0.5, 0.5);
  if (isset($c['dy'])) $o['dy'] = num($c['dy'], 'dy', -0.5, 0.5);
  return $o;
}

function validate_command($c, array &$known, array &$warnings, int $i): array {
  if (!is_array($c) || !isset($c['type']) || !is_string($c['type'])) throw new BoardError('each command needs a "type".');
  $t = $c['type']; $o = ['type' => $t];
  $col = color_of($c); if ($col) $o['color'] = $col;
  if (isset($c['pause'])) $o['pause'] = num($c['pause'], 'pause', 0, 10000);
  switch ($t) {
    case 'step':
      $o['text'] = clip_text((string)($c['text'] ?? ''), 1500);
      if ($o['text'] === '') throw new BoardError('step needs "text" (the caption for this step; $…$ for maths).');
      if (isset($c['title'])) $o['title'] = clip_text((string)$c['title'], 120);
      break;
    case 'write':
      if (isset($c['tex'])) $o['tex'] = clip_text((string)$c['tex'], 800);
      elseif (isset($c['text'])) $o['text'] = clip_text((string)$c['text'], 800);
      else throw new BoardError('write needs "tex" (LaTeX) or "text" (words, with $…$ for maths).');
      $o += position($c, $known);
      if (isset($c['size'])) $o['size'] = num($c['size'], 'size', 10, 80);
      if (!empty($c['align']) && in_array($c['align'], ['left', 'right'], true)) $o['align'] = $c['align'];
      break;
    case 'equation':
      $o['equation'] = equation($c['equation'] ?? null, 'equation');
      $o += position($c, $known);
      foreach (['solve', 'plot'] as $f) if (!empty($c[$f])) $o[$f] = true;
      if (isset($c['size'])) $o['size'] = num($c['size'], 'size', 10, 80);
      break;
    case 'system':
      if (!is_array($c['equations'] ?? null) || count($c['equations']) < 2 || count($c['equations']) > 4) throw new BoardError('system needs "equations": 2 to 4 equations.');
      $o['equations'] = array_map(fn($e) => equation($e, 'each equation'), array_values($c['equations']));
      $o += position($c, $known);
      foreach (['solve', 'plot'] as $f) if (!empty($c[$f])) $o[$f] = true;
      break;
    case 'axes':
      $o['id'] = ident($c['id'] ?? null, 'axes id');
      $xr = $c['x_range'] ?? [-6, 6]; $yr = $c['y_range'] ?? [-4, 4];
      if (!is_array($xr) || count($xr) !== 2 || !is_array($yr) || count($yr) !== 2) throw new BoardError('x_range and y_range must be [min, max].');
      $o['x_range'] = [num($xr[0], 'x_range min'), num($xr[1], 'x_range max')];
      $o['y_range'] = [num($yr[0], 'y_range min'), num($yr[1], 'y_range max')];
      if ($o['x_range'][0] >= $o['x_range'][1] || $o['y_range'][0] >= $o['y_range'][1]) throw new BoardError('ranges must be [min, max] with min < max.');
      $o['box'] = box_of($c['box'] ?? [0.45, 0.08, 0.52, 0.84]);
      $known['axes'][$o['id']] = 1;
      break;
    case 'plot':
      $a = ident($c['axes'] ?? null, 'axes'); if (!isset($known['axes'][$a])) throw new BoardError("no axes called \"$a\" — create it first with an \"axes\" command.");
      $o['axes'] = $a; $o['equation'] = equation($c['equation'] ?? null, 'equation');
      if (isset($c['id'])) { $o['id'] = ident($c['id'], 'graph id'); $known['graph'][$o['id']] = 1; }
      if (!empty($c['dashed'])) $o['dashed'] = true;
      if (isset($c['label']) && $c['label'] === false) $o['label'] = false;
      break;
    case 'shade': case 'tangent':
      $g = ident($c['graph'] ?? null, 'graph'); if (!isset($known['graph'][$g])) throw new BoardError("no graph called \"$g\" — give the plot an \"id\".");
      $o['graph'] = $g;
      if ($t === 'shade') { $o['from'] = num($c['from'] ?? null, 'from'); $o['to'] = num($c['to'] ?? null, 'to'); }
      else $o['at'] = num($c['at'] ?? null, 'at');
      break;
    case 'point':
      $a = ident($c['axes'] ?? null, 'axes'); if (!isset($known['axes'][$a])) throw new BoardError("no axes called \"$a\".");
      $o['axes'] = $a; $o['x'] = num($c['x'] ?? null, 'x'); $o['y'] = num($c['y'] ?? null, 'y');
      if (isset($c['label'])) $o['label'] = clip_text((string)$c['label'], 40);
      if (!empty($c['hollow'])) $o['hollow'] = true;
      break;
    case 'line': case 'arrow':
      if (isset($c['axes'])) { $a = ident($c['axes'], 'axes'); if (!isset($known['axes'][$a])) throw new BoardError("no axes called \"$a\"."); $o['axes'] = $a; $n = fn($v, $w) => num($v, $w); }
      else $n = fn($v, $w) => frac($v, $w);
      foreach (['x1', 'y1', 'x2', 'y2'] as $f) $o[$f] = $n($c[$f] ?? null, $f);
      if (!empty($c['dashed'])) $o['dashed'] = true;
      break;
    case 'circle':
      if (isset($c['axes'])) { $a = ident($c['axes'], 'axes'); if (!isset($known['axes'][$a])) throw new BoardError("no axes called \"$a\"."); $o['axes'] = $a; $o['x'] = num($c['x'] ?? null, 'x'); $o['y'] = num($c['y'] ?? null, 'y'); $o['r'] = num($c['r'] ?? null, 'r', 0, 1e6); }
      else { $o['x'] = frac($c['x'] ?? null, 'x'); $o['y'] = frac($c['y'] ?? null, 'y'); $o['r'] = num($c['r'] ?? null, 'r', 0, 1); }
      break;
    case 'geometry':
      $o += validate_geometry($c, $known);
      break;
    case 'highlight':
      $o += position($c, $known); $o['w'] = num($c['w'] ?? 0.2, 'w', 0.01, 1); $o['h'] = num($c['h'] ?? 0.08, 'h', 0.01, 1);
      break;
    case 'wait':
      $o['ms'] = num($c['ms'] ?? 1000, 'ms', 0, 10000);
      break;
    case 'clear':
      $known = ['axes' => [], 'graph' => [], 'point' => []];
      break;
    default:
      throw new BoardError("unknown type \"$t\". Types: step, write, equation, system, axes, plot, shade, tangent, point, line, arrow, circle, geometry, highlight, wait, clear.");
  }
  return $o;
}

function box_of($b): array {
  if (!is_array($b) || count($b) !== 4) throw new BoardError('box must be [left, top, width, height] as fractions of the board.');
  $b = array_map(fn($v) => num($v, 'box value', 0, 1), array_values($b));
  if ($b[2] < 0.05 || $b[3] < 0.05) throw new BoardError('box is too small.');
  return $b;
}

function validate_geometry(array $c, array &$known): array {
  $o = [];
  $pts = $c['points'] ?? [];
  if (!is_array($pts)) throw new BoardError('geometry "points" must be an object like {"A":[0,0],"B":[4,0]}.');
  if (count($pts) > 26) throw new BoardError('at most 26 points per geometry command.');
  $o['points'] = [];
  foreach ($pts as $name => $xy) {
    $n = ident((string)$name, 'point name');
    if (!is_array($xy) || count($xy) !== 2) throw new BoardError("point $n must be [x, y] in units (y up).");
    $o['points'][$n] = [num($xy[0], "$n x", -1000, 1000), num($xy[1], "$n y", -1000, 1000)];
    $known['point'][$n] = 1;
  }
  $need = function ($n) use (&$known) { $n = ident($n, 'point'); if (!isset($known['point'][$n])) throw new BoardError("no geometry point called \"$n\"."); return $n; };
  $names = function ($v, string $what, int $min, int $max) use ($need) {
    if (is_string($v)) $v = preg_split('/(?=[A-Z])/', $v, -1, PREG_SPLIT_NO_EMPTY);   // "ABC" → A, B, C
    if (!is_array($v) || count($v) < $min || count($v) > $max) throw new BoardError("$what needs $min" . ($max > $min ? "–$max" : '') . ' point names.');
    return array_map($need, array_values($v));
  };
  foreach (['segments' => [2, 2], 'polygons' => [3, 12]] as $k => [$mn, $mx]) {
    if (!isset($c[$k])) continue;
    if (!is_array($c[$k]) || count($c[$k]) > 40) throw new BoardError("$k must be a list (at most 40).");
    $o[$k] = array_map(fn($s) => $names($s, rtrim($k, 's'), $mn, $mx), array_values($c[$k]));
  }
  if (isset($c['circles'])) {
    if (!is_array($c['circles']) || count($c['circles']) > 12) throw new BoardError('circles must be a list (at most 12).');
    $o['circles'] = [];
    foreach ($c['circles'] as $ci) {
      if (!is_array($ci)) throw new BoardError('each circle is {"center":"O","radius":3} or {"through":"ABC"}.');
      if (isset($ci['through'])) $o['circles'][] = ['through' => $names($ci['through'], 'circle through', 3, 3)];
      else $o['circles'][] = ['center' => $need($ci['center'] ?? ''), 'radius' => num($ci['radius'] ?? null, 'radius', 0, 1000)];
    }
  }
  if (isset($c['construct'])) {
    if (!is_array($c['construct']) || count($c['construct']) > 10) throw new BoardError('construct must be a list (at most 10).');
    $o['construct'] = [];
    foreach ($c['construct'] as $k) {
      if (!is_array($k) || !in_array($k['type'] ?? '', CONSTRUCTIONS, true)) throw new BoardError('each construction is {"type": one of ' . implode(', ', CONSTRUCTIONS) . ', …}.');
      $x = ['type' => $k['type']];
      if (in_array($k['type'], ['incircle', 'circumcircle', 'altitudes', 'medians'], true)) $x['of'] = $names($k['of'] ?? '', $k['type'] . ' "of" (a triangle)', 3, 3);
      else $x['of'] = $names($k['of'] ?? '', $k['type'] . ' "of" (a segment)', 2, 2);
      if ($k['type'] === 'foot') $x['from'] = $need($k['from'] ?? '');
      if (isset($k['names'])) {
        if (!is_array($k['names']) || count($k['names']) > 3) throw new BoardError('construction "names" is a list of up to 3 new point names.');
        $x['names'] = array_map(fn($n) => ident($n, 'new point name'), array_values($k['names']));
        foreach ($x['names'] as $n) $known['point'][$n] = 1;
      }
      $o['construct'][] = $x;
    }
  }
  if (isset($c['box'])) $o['box'] = box_of($c['box']);
  foreach (['measures', 'angles'] as $f) if (isset($c[$f])) $o[$f] = (bool)$c[$f];
  if (!$o['points'] && empty($o['segments']) && empty($o['polygons']) && empty($o['circles']) && empty($o['construct'])) throw new BoardError('geometry needs points, segments, polygons, circles or construct.');
  return $o;
}
