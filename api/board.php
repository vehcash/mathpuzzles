<?php
/* Live boards for live.html (the viewer). The AI side is api/mcp.php.

   GET  api/board.php?b=<id>&since=<seq>   the board's title and the commands after <seq> (0 = all)
   POST api/board.php?b=<id>&report=1       {"errors":[{"seq":3,"error":"…"}]} — what the viewer could not draw,
                                            shown to the AI by the get_board tool so it can fix it */
declare(strict_types=1);
require __DIR__ . '/boards-lib.php';

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');
header('X-Robots-Tag: noindex');

function out(int $status, array $body): void { http_response_code($status); echo json_encode($body, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE); exit; }

try {
  $id = (string)($_GET['b'] ?? '');
  if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_GET['report'])) {
    $body = json_decode((string)file_get_contents('php://input', false, null, 0, 20000), true);
    board_report($id, $body['errors'] ?? null);
    out(200, ['ok' => true]);
  }
  if ($_SERVER['REQUEST_METHOD'] !== 'GET') out(405, ['error' => 'GET only']);
  [$fh, $b] = board_open($id, false); board_close($fh);
  $since = max(0, (int)($_GET['since'] ?? 0));
  if ($since && isset($_GET['rev']) && (int)$_GET['rev'] === $b['rev']) out(200, ['rev' => $b['rev'], 'same' => true]);
  out(200, board_public($b, $since));
} catch (BoardError $e) {
  out(404, ['error' => $e->getMessage()]);
}
