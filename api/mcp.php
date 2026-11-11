<?php
/* Daily Math Puzzle — MCP server for the live blackboard.

   Endpoint:  https://dailymathpuzzle.com/api/mcp.php   (MCP "Streamable HTTP" transport, JSON responses, no sign-in)
   Any MCP client (Claude, ChatGPT, Cursor, MCP Inspector…) can connect to this URL. The AI creates a board,
   gives the person the link to live.html, and draws on it with commands; the page plays them live.

   Tools:     board_guide · create_board · draw · get_board
   Resource:  board://guide   (the full guide, board-guide.md)
   Prompt:    explain_on_board

   Stateless: every POST is a JSON-RPC message (or a batch); there is no server-to-client stream, so GET returns 405
   for event-stream requests. Storage, limits and validation live in boards-lib.php. Needs PHP 7.4+. */

declare(strict_types=1);
require __DIR__ . '/boards-lib.php';

const SERVER_NAME = 'dailymathpuzzle-blackboard';
const SERVER_VERSION = '1.0.0';
const PROTOCOLS = ['2025-06-18', '2025-03-26', '2024-11-05'];
const GUIDE_FILE = __DIR__ . '/../board-guide.md';

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE');
header('Access-Control-Allow-Headers: Content-Type, Accept, Authorization, Mcp-Session-Id, MCP-Protocol-Version, Last-Event-ID');
header('Access-Control-Expose-Headers: Mcp-Session-Id');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');
header('X-Robots-Tag: noindex');

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
if ($method === 'OPTIONS') { http_response_code(204); exit; }
if ($method === 'DELETE') { http_response_code(204); exit; }            // "end session": nothing to forget
if ($method === 'GET') {
  if (stripos($_SERVER['HTTP_ACCEPT'] ?? '', 'text/event-stream') !== false) { http_response_code(405); header('Allow: POST'); exit; }
  header('Content-Type: application/json; charset=utf-8');
  echo json_encode(['name' => SERVER_NAME, 'mcp' => 'Streamable HTTP: POST JSON-RPC messages to this URL', 'docs' => SITE_URL . 'mcp.html', 'guide' => SITE_URL . 'board-guide.md'], JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT);
  exit;
}
if ($method !== 'POST') { http_response_code(405); header('Allow: POST, GET, OPTIONS'); exit; }

$raw = (string)file_get_contents('php://input', false, null, 0, 600000);
$msg = json_decode($raw, true);
header('Content-Type: application/json; charset=utf-8');
if (!is_array($msg)) { echo json_encode(rpc_error(null, -32700, 'Parse error: the body must be JSON-RPC 2.0')); exit; }

$batch = array_is_list_compat($msg) && $msg;
$replies = [];
foreach ($batch ? $msg : [$msg] as $m) { $r = handle($m); if ($r !== null) $replies[] = $r; }
if (!$replies) { http_response_code(202); exit; }                        // only notifications/responses
echo json_encode($batch ? $replies : $replies[0], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);

// ------------------------------------------------------------------ JSON-RPC

function array_is_list_compat(array $a): bool { return $a === [] || array_keys($a) === range(0, count($a) - 1); }
function rpc_result($id, $result): array { return ['jsonrpc' => '2.0', 'id' => $id, 'result' => $result]; }
function rpc_error($id, int $code, string $message): array { return ['jsonrpc' => '2.0', 'id' => $id, 'error' => ['code' => $code, 'message' => $message]]; }

function handle($m): ?array {
  if (!is_array($m) || ($m['jsonrpc'] ?? '') !== '2.0') return rpc_error(null, -32600, 'Invalid Request');
  $id = $m['id'] ?? null; $isNote = !array_key_exists('id', $m);
  $name = $m['method'] ?? null;
  if ($name === null) return null;                                         // a response to us: ignore
  $p = is_array($m['params'] ?? null) ? $m['params'] : [];
  try {
    switch ($name) {
      case 'initialize':
        $want = (string)($p['protocolVersion'] ?? '');
        return rpc_result($id, [
          'protocolVersion' => in_array($want, PROTOCOLS, true) ? $want : PROTOCOLS[0],
          'capabilities' => ['tools' => ['listChanged' => false], 'resources' => ['listChanged' => false], 'prompts' => ['listChanged' => false]],
          'serverInfo' => ['name' => SERVER_NAME, 'title' => 'Daily Math Puzzle blackboard', 'version' => SERVER_VERSION, 'websiteUrl' => SITE_URL . 'mcp.html'],
          'instructions' => instructions()
        ]);
      case 'ping': return rpc_result($id, new stdClass());
      case 'tools/list': return rpc_result($id, ['tools' => tools()]);
      case 'tools/call': return rpc_result($id, call_tool((string)($p['name'] ?? ''), is_array($p['arguments'] ?? null) ? $p['arguments'] : []));
      case 'resources/list': return rpc_result($id, ['resources' => [[
        'uri' => 'board://guide', 'name' => 'board-guide', 'title' => 'How to teach on the blackboard',
        'description' => 'Every drawing command, the maths syntax, layout tips and a full example.', 'mimeType' => 'text/markdown']]]);
      case 'resources/templates/list': return rpc_result($id, ['resourceTemplates' => []]);
      case 'resources/read':
        if (($p['uri'] ?? '') !== 'board://guide') return rpc_error($id, -32002, 'Resource not found');
        return rpc_result($id, ['contents' => [['uri' => 'board://guide', 'mimeType' => 'text/markdown', 'text' => guide()]]]);
      case 'prompts/list': return rpc_result($id, ['prompts' => [[
        'name' => 'explain_on_board', 'title' => 'Explain on the blackboard',
        'description' => 'Explain a maths question step by step on a live blackboard the person watches.',
        'arguments' => [['name' => 'question', 'description' => 'What to explain', 'required' => true], ['name' => 'language', 'description' => 'en, fr, es, ja or zh', 'required' => false]]]]]);
      case 'prompts/get':
        if (($p['name'] ?? '') !== 'explain_on_board') return rpc_error($id, -32602, 'Unknown prompt');
        $q = (string)($p['arguments']['question'] ?? ''); $l = (string)($p['arguments']['language'] ?? 'en');
        return rpc_result($id, ['description' => 'Explain on the blackboard', 'messages' => [['role' => 'user', 'content' => ['type' => 'text',
          'text' => "Explain this on the Daily Math Puzzle blackboard, step by step, in language \"$l\":\n\n$q\n\n" .
                    "Create a board, give me its view_url first so I can watch, then draw the explanation in steps (one idea per step, short captions). " .
                    "Read the guide (board_guide tool) if you have not yet."]]]]);
      case 'logging/setLevel': return rpc_result($id, new stdClass());
      default:
        if (strpos($name, 'notifications/') === 0) return null;
        return $isNote ? null : rpc_error($id, -32601, "Method not found: $name");
    }
  } catch (Throwable $e) {
    return $isNote ? null : rpc_error($id, -32603, 'Internal error');
  }
}

// ------------------------------------------------------------------ tools

function guide(): string { $g = @file_get_contents(GUIDE_FILE); return $g !== false ? $g : 'Guide: ' . SITE_URL . 'board-guide.md'; }

function instructions(): string {
  return "Teach maths on a live chalkboard the person watches in their browser.\n" .
    "1) create_board → give the person view_url right away. 2) draw commands in steps: each part starts with {\"type\":\"step\",\"text\":\"caption\"} " .
    "then 1–4 drawing commands. Positions are board fractions (x 0→1 left→right, y 0→1 top→bottom). " .
    "tex/captions use LaTeX ($…$); equation/plot use calculator syntax (y = x^2 - 3, sin(x), sqrt(x)). " .
    "3) get_board shows what the viewer could not draw. Call board_guide once for every command, the syntax and an example.";
}

function tools(): array {
  $types = ['step', 'write', 'equation', 'system', 'axes', 'plot', 'shade', 'tangent', 'point', 'line', 'arrow', 'circle', 'geometry', 'highlight', 'wait', 'clear'];
  $cmd = ['type' => 'object', 'required' => ['type'], 'additionalProperties' => true, 'properties' => [
    'type' => ['type' => 'string', 'enum' => $types, 'description' => 'Command type. See board_guide for the fields of each.'],
    'text' => ['type' => 'string', 'description' => 'step: the caption. write: words, with $…$ for maths.'],
    'tex' => ['type' => 'string', 'description' => 'write: LaTeX to write on the board.'],
    'equation' => ['type' => 'string', 'description' => 'equation/plot: calculator syntax, e.g. "y = x^2 - 3", "x^2 - 5x + 6 = 0".'],
    'x' => ['type' => 'number'], 'y' => ['type' => 'number'],
    'color' => ['type' => 'string', 'enum' => COLORS],
    'id' => ['type' => 'string', 'description' => 'axes/plot: a name to refer to it later.'],
    'axes' => ['type' => 'string', 'description' => 'the id of an axes command.']]];
  $board = ['board_id' => ['type' => 'string', 'description' => 'From create_board.'], 'edit_key' => ['type' => 'string', 'description' => 'From create_board.']];
  return [
    ['name' => 'board_guide', 'title' => 'Blackboard guide',
     'description' => 'Read this first: how to teach on the Daily Math Puzzle blackboard — every drawing command with its fields, the maths syntax, where things go, and a complete example lesson.',
     'inputSchema' => ['type' => 'object', 'properties' => new stdClass()],
     'annotations' => ['readOnlyHint' => true, 'openWorldHint' => false]],
    ['name' => 'create_board', 'title' => 'Create a live blackboard',
     'description' => 'Creates an empty blackboard and returns board_id, edit_key and view_url. Give the person the view_url immediately: they open it in a browser and watch everything you draw, live. Keep board_id and edit_key for later draw calls in this conversation.',
     'inputSchema' => ['type' => 'object', 'properties' => [
        'title' => ['type' => 'string', 'description' => 'Shown above the board, e.g. "Where two graphs meet".'],
        'language' => ['type' => 'string', 'enum' => ['en', 'fr', 'es', 'ja', 'zh'], 'description' => 'The person\'s language (the viewer\'s interface).']], 'required' => ['title']],
     'outputSchema' => ['type' => 'object', 'properties' => ['board_id' => ['type' => 'string'], 'edit_key' => ['type' => 'string'], 'view_url' => ['type' => 'string'], 'title' => ['type' => 'string'], 'expires' => ['type' => 'string']], 'required' => ['board_id', 'edit_key', 'view_url']],
     'annotations' => ['readOnlyHint' => false, 'destructiveHint' => false, 'idempotentHint' => false, 'openWorldHint' => true]],
    ['name' => 'draw', 'title' => 'Draw on the blackboard',
     'description' => 'Adds commands to the board; the viewer plays them in order, live. Start each part with {"type":"step","text":"caption"} followed by its drawing commands, e.g. ' .
       '[{"type":"step","text":"Plot $y=x^2$"},{"type":"axes","id":"A","x_range":[-4,4],"y_range":[-1,9]},{"type":"plot","axes":"A","equation":"y = x^2","id":"f","color":"yellow"},' .
       '{"type":"equation","equation":"x^2 - 4 = 0","x":0.04,"y":0.15,"solve":true}]. Positions are board fractions (x left→right, y top→bottom). ' .
       'Types: step, write (tex/text), equation (solve/plot), system, axes, plot, shade, tangent, point, line, arrow, circle, geometry (named points, polygons, constructions), highlight, wait, clear. Call board_guide for all fields.',
     'inputSchema' => ['type' => 'object', 'properties' => $board + [
        'commands' => ['type' => 'array', 'items' => $cmd, 'minItems' => 1, 'maxItems' => MAX_PER_CALL],
        'replace' => ['type' => 'boolean', 'description' => 'true = throw away everything drawn so far and start the lesson again with these commands.']],
       'required' => ['board_id', 'edit_key', 'commands']],
     'annotations' => ['readOnlyHint' => false, 'destructiveHint' => false, 'idempotentHint' => false, 'openWorldHint' => true]],
    ['name' => 'get_board', 'title' => 'Look at the blackboard',
     'description' => 'Returns the board\'s commands so far (grouped by step) and any problems the person\'s viewer reported (e.g. an equation it could not read), so you can fix them with another draw.',
     'inputSchema' => ['type' => 'object', 'properties' => ['board_id' => ['type' => 'string']], 'required' => ['board_id']],
     'annotations' => ['readOnlyHint' => true, 'openWorldHint' => true]],
  ];
}

function tool_text(array $data, string $lead = ''): array {
  return ['content' => [['type' => 'text', 'text' => ($lead ? $lead . "\n\n" : '') . json_encode($data, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT)]],
          'structuredContent' => $data, 'isError' => false];
}
function tool_error(string $msg): array { return ['content' => [['type' => 'text', 'text' => $msg]], 'isError' => true]; }

function call_tool(string $name, array $a): array {
  try {
    switch ($name) {
      case 'board_guide':
        return ['content' => [['type' => 'text', 'text' => guide()]], 'isError' => false];
      case 'create_board':
        $r = board_create((string)($a['title'] ?? ''), (string)($a['language'] ?? 'en'));
        return tool_text($r, "Board created. Give the person this link now so they can watch live: {$r['view_url']}\n" .
          "Then call draw with board_id and edit_key. (If you have not read it yet, board_guide lists every command.)");
      case 'draw':
        $r = board_draw((string)($a['board_id'] ?? ''), (string)($a['edit_key'] ?? ''), $a['commands'] ?? null, !empty($a['replace']));
        $lead = "Drawn: {$r['added']} commands (board now has {$r['total_commands']}, {$r['steps']} steps). The person sees them at {$r['view_url']}.";
        if ($r['warnings']) $lead .= "\nWarnings:\n- " . implode("\n- ", $r['warnings']);
        return tool_text($r, $lead);
      case 'get_board':
        [$fh, $b] = board_open((string)($a['board_id'] ?? ''), false); board_close($fh);
        $steps = []; $cur = null;
        foreach ($b['commands'] as $c) {
          if ($c['type'] === 'step' || $cur === null) { if ($cur !== null) $steps[] = $cur; $cur = ['step' => count($steps) + 1, 'caption' => $c['type'] === 'step' ? $c['text'] : '(before the first step)', 'commands' => []]; if ($c['type'] === 'step') continue; }
          $cur['commands'][] = $c;
        }
        if ($cur !== null) $steps[] = $cur;
        $r = ['board_id' => $b['id'], 'title' => $b['title'], 'view_url' => view_url($b['id']), 'total_commands' => count($b['commands']),
              'steps' => $steps, 'viewer_problems' => $b['reports']];
        $lead = $b['reports'] ? count($b['reports']) . ' problem(s) reported by the viewer — see viewer_problems (seq = the command number).' : 'No problems reported by the viewer.';
        return tool_text($r, $lead);
      default:
        return tool_error("Unknown tool \"$name\". Tools: board_guide, create_board, draw, get_board.");
    }
  } catch (BoardError $e) {
    return tool_error($e->getMessage());
  }
}
