<?php

$input = json_decode(file_get_contents('php://input'), true);

function render ($input) {
    extract($input);
    ob_start();
    include __DIR__ . '/views/LoginView.php';
    $html = ob_get_clean();

    return $html;
}

$response = [
    'html' => render($input),
];

$json = json_encode($response);

header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET,HEAD,OPTIONS,POST,PUT,PATCH');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Authorization, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
header('Access-Control-Allow-Origin: *');
header('Content-Length: ' . strlen($json));
header('Content-Type: application/json');

echo $json;
