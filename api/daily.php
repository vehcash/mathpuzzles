<?php
/* Mathpuzzles — puzzle of the day.

   GET api/daily.php               today's puzzle: { date, id, cat, n, left }
   GET api/daily.php?date=Y-m-d    a past day's puzzle (only days already in the history)
   GET api/daily.php?list=1        the archive: every day shown so far, newest first

   Admin (header X-Admin-Key: the key in api/config.php; used by daily-admin.html):
   GET  api/daily.php?admin=1                          history, schedule and every puzzle with its status
   POST api/daily.php  {"action":"plan","date":"Y-m-d","id":"…"}   choose the puzzle for today or a future day
   POST api/daily.php  {"action":"unplan","date":"Y-m-d"}          remove a scheduled future day

   The first request of each day picks the puzzle and saves it in data/daily-history.json,
   so every visitor gets the same one and it never changes during the day.
   Rules: a puzzle is never the daily puzzle twice; categories take turns
   (the next category in CATEGORY_ORDER that still has unused puzzles).
   Scheduled days (chosen in daily-admin.html) win over the automatic choice.
   Days start at midnight in DAILY_TZ. Needs PHP 7.4+ and write access to data/.
   Site: https://dailymathpuzzle.com */

declare(strict_types=1);

const DAILY_TZ = 'Europe/Madrid';
const CATEGORY_ORDER = ['geometry', 'trigonometry', 'algebra', 'matrix', 'complex', 'calculus', 'combinatorics', 'probability', 'number'];
const INDEX_FILE = __DIR__ . '/../puzzles/index.js';
const DATA_DIR = __DIR__ . '/../data';
const HISTORY_FILE = DATA_DIR . '/daily-history.json';
require __DIR__ . '/config.php';                  // defines ADMIN_KEY

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');

function reply(int $status, array $body): void {
  http_response_code($status);
  echo json_encode($body, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
  exit;
}

/** puzzles/index.js is "PuzzleBank.setIndex([ {...}, ... ]);" — the array inside is plain JSON */
function load_index(): array {
  $src = @file_get_contents(INDEX_FILE);
  if ($src === false) reply(500, ['error' => 'index-missing']);
  $a = strpos($src, '['); $b = strrpos($src, ']');
  $list = ($a !== false && $b !== false) ? json_decode(substr($src, $a, $b - $a + 1), true) : null;
  if (!is_array($list)) reply(500, ['error' => 'index-unreadable']);
  return array_values(array_filter($list, fn($e) => isset($e['id'], $e['cat'])));
}

function today(): string {
  return (new DateTimeImmutable('now', new DateTimeZone(DAILY_TZ)))->format('Y-m-d');
}

function out(string $date, array $d, ?int $left = null): array {
  $o = ['date' => $date, 'id' => $d['id'], 'cat' => $d['cat'], 'n' => $d['n']];
  if ($left !== null) $o['left'] = $left;
  return $o;
}

/** open the history with an exclusive lock (creating data/ and the file the first time) */
function open_history() {
  if (!is_dir(DATA_DIR) && !@mkdir(DATA_DIR, 0755, true)) reply(500, ['error' => 'data-dir-not-writable']);
  if (!file_exists(DATA_DIR . '/.htaccess')) @file_put_contents(DATA_DIR . '/.htaccess', "Require all denied\nDeny from all\n");
  $fh = @fopen(HISTORY_FILE, 'c+');
  if (!$fh) reply(500, ['error' => 'history-not-writable']);
  flock($fh, LOCK_EX);
  $raw = stream_get_contents($fh);
  $h = $raw ? json_decode($raw, true) : null;
  if (!is_array($h) || !isset($h['days']) || !is_array($h['days'])) $h = ['days' => []];
  if (!isset($h['plan']) || !is_array($h['plan'])) $h['plan'] = [];
  return [$fh, $h];
}

function save_history($fh, array $h): void {
  ksort($h['days']); ksort($h['plan']);
  if (!$h['plan']) $h['plan'] = new stdClass();   // keep it a JSON object
  ftruncate($fh, 0); rewind($fh);
  fwrite($fh, json_encode($h, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE) . "\n");
  fflush($fh);
}

function close_history($fh): void { flock($fh, LOCK_UN); fclose($fh); }

/** choose today's puzzle: next category in turn that still has unused puzzles, random puzzle in it */
function pick(array $days, array $index, string $today, array $plan = []): ?array {
  $used = [];
  foreach ($days as $d) $used[$d['id']] = true;
  $ids = array_column($index, 'cat', 'id');
  if (isset($plan[$today]) && isset($ids[$plan[$today]]) && !isset($used[$plan[$today]]))   // scheduled in the admin page
    return ['id' => $plan[$today], 'cat' => $ids[$plan[$today]], 'left' => count($index) - count($used) - 1];
  foreach ($plan as $date => $id) if ($date > $today) $used[$id] = true;                   // reserved for a later day
  $free = [];
  foreach ($index as $e) if (!isset($used[$e['id']])) $free[$e['cat']][] = $e['id'];
  if (!$free) return null;

  $order = CATEGORY_ORDER;
  foreach ($index as $e) if (!in_array($e['cat'], $order, true)) $order[] = $e['cat'];   // categories added later join the turn

  $last = null;                                   // category of the most recent day before today
  foreach ($days as $date => $d) if ($date < $today) $last = $d['cat'];
  $start = $last === null ? 0 : (array_search($last, $order, true) + 1);
  $n = count($order);
  for ($k = 0; $k < $n; $k++) {
    $cat = $order[($start + $k) % $n];
    if (!empty($free[$cat])) {
      $ids = $free[$cat];
      return ['id' => $ids[random_int(0, count($ids) - 1)], 'cat' => $cat, 'left' => array_sum(array_map('count', $free)) - 1];
    }
  }
  return null;
}

$today = today();

// ---- admin: choose / schedule the daily puzzle ----
function require_admin(): void {
  $key = $_SERVER['HTTP_X_ADMIN_KEY'] ?? '';
  if (ADMIN_KEY === '' ) reply(403, ['error' => 'admin-disabled']);       // set ADMIN_KEY in api/config.php
  if (!is_string($key) || !hash_equals(ADMIN_KEY, $key)) { sleep(1); reply(403, ['error' => 'bad-key']); }
}
function valid_date(string $d): bool {
  $t = DateTimeImmutable::createFromFormat('!Y-m-d', $d, new DateTimeZone(DAILY_TZ));
  return $t !== false && $t->format('Y-m-d') === $d;
}
if (isset($_GET['admin']) && $_SERVER['REQUEST_METHOD'] === 'GET') {
  require_admin();
  [$fh, $h] = open_history(); close_history($fh);
  $shown = []; foreach ($h['days'] as $date => $d) $shown[$d['id']] = (string)$date;
  $planned = []; foreach ($h['plan'] as $date => $id) if ($date >= $today && !isset($h['days'][$date])) $planned[$id] = (string)$date;
  $puzzles = array_map(fn($e) => ['id' => $e['id'], 'cat' => $e['cat'], 'diff' => $e['diff'] ?? null, 'shown' => $shown[$e['id']] ?? null, 'planned' => $planned[$e['id']] ?? null], load_index());
  $days = $h['days']; krsort($days); $hist = [];
  foreach ($days as $date => $d) $hist[] = out((string)$date, $d);
  $plan = []; foreach ($planned as $id => $date) $plan[] = ['date' => $date, 'id' => $id];
  usort($plan, fn($a, $b) => strcmp($a['date'], $b['date']));
  reply(200, ['today' => $today, 'tz' => DAILY_TZ, 'days' => $hist, 'plan' => $plan, 'puzzles' => $puzzles, 'order' => CATEGORY_ORDER]);
}
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  require_admin();
  $in = json_decode((string)file_get_contents('php://input'), true);
  if (!is_array($in)) reply(400, ['error' => 'bad-request']);
  $action = (string)($in['action'] ?? ''); $date = (string)($in['date'] ?? '');
  if (!valid_date($date)) reply(400, ['error' => 'bad-date']);
  if ($date < $today) reply(400, ['error' => 'past-day']);                  // the history of past days is fixed
  [$fh, $h] = open_history();
  if ($action === 'unplan') {
    unset($h['plan'][$date]);
    save_history($fh, $h); close_history($fh);
    reply(200, ['ok' => true]);
  }
  if ($action !== 'plan') { close_history($fh); reply(400, ['error' => 'bad-action']); }
  $id = (string)($in['id'] ?? '');
  $cats = array_column(load_index(), 'cat', 'id');
  if (!isset($cats[$id])) { close_history($fh); reply(404, ['error' => 'unknown-puzzle']); }
  foreach ($h['days'] as $d0 => $d) if ($d['id'] === $id && $d0 !== $date) { close_history($fh); reply(409, ['error' => 'already-shown', 'date' => $d0]); }
  foreach ($h['plan'] as $d0 => $pid) if ($pid === $id && $d0 !== $date && $d0 >= $today) { close_history($fh); reply(409, ['error' => 'already-planned', 'date' => $d0]); }
  if ($date === $today) {                                                    // replace today's puzzle right away
    $n = isset($h['days'][$today]) ? $h['days'][$today]['n'] : count($h['days']) + 1;
    $h['days'][$today] = ['id' => $id, 'cat' => $cats[$id], 'n' => $n];
    unset($h['plan'][$today]);
  } else {
    $h['plan'][$date] = $id;
  }
  save_history($fh, $h); close_history($fh);
  reply(200, ['ok' => true]);
}

// ---- archive: every day so far ----
if (isset($_GET['list'])) {
  [$fh, $h] = open_history(); close_history($fh);
  $days = $h['days'];
  krsort($days);
  $list = [];
  foreach ($days as $date => $d) if ($date <= $today) $list[] = out((string)$date, $d);
  reply(200, ['today' => $today, 'days' => $list]);
}

// ---- a past day ----
if (isset($_GET['date']) && $_GET['date'] !== $today) {
  $date = (string)$_GET['date'];
  if (!preg_match('/^\d{4}-\d{2}-\d{2}$/', $date)) reply(400, ['error' => 'bad-date']);
  if ($date > $today) reply(404, ['error' => 'not-yet']);            // no peeking at tomorrow
  [$fh, $h] = open_history(); close_history($fh);
  if (!isset($h['days'][$date])) reply(404, ['error' => 'no-puzzle-that-day']);
  reply(200, out($date, $h['days'][$date]));
}

// ---- today: chosen once, then the same for everyone ----
[$fh, $h] = open_history();
if (isset($h['days'][$today])) {
  $d = $h['days'][$today];
  close_history($fh);
  reply(200, out($today, $d));
}
$p = pick($h['days'], load_index(), $today, $h['plan']);
if ($p === null) { close_history($fh); reply(410, ['error' => 'no-unused-puzzles', 'date' => $today]); }
$d = ['id' => $p['id'], 'cat' => $p['cat'], 'n' => count($h['days']) + 1];
$h['days'][$today] = $d;
unset($h['plan'][$today]);
save_history($fh, $h);
close_history($fh);
reply(200, out($today, $d, $p['left']));
