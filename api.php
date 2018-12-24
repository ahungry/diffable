<?php

require_once __DIR__ . '/views/globals.php';
require_once __DIR__ . '/scenes/LoginScene.php';
require_once __DIR__ . '/scenes/SelectScene.php';

$input = json_decode(file_get_contents('php://input'));

// Simulate a delay
// sleep(1);

function handle ($input) {
    if (!is_object($input)) {
        $input = new \stdObject();
        $input->scene = 'LoginScene';
    }

    $class = $input->scene;
    $class = '\\Scene\\' . $class;
    $obj = new $class($input);

    return $obj->next();
}

$response = array(
    'html' => handle($input),
    'input' => $input,
);

$json = json_encode($response);

header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET,HEAD,OPTIONS,POST,PUT,PATCH');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Authorization, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
header('Access-Control-Allow-Origin: *');
header('Content-Length: ' . strlen($json));
header('Content-Type: application/json');

echo $json;
