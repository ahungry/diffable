<?php

require_once __DIR__ . '/views/globals.php';

$input = json_decode(file_get_contents('php://input'), true);

function render ($tpl, $input) {
    // extract($input);
    ob_start();
    set_world($input);
    include __DIR__ . '/views/' . $tpl . '.php';
    $html = ob_get_clean();

    return $html;
}

function handleLoginScene ($input) {
    $state = $input;

    if ('clicked' === $state['go']) {
        $state['error'] = render('ErrorView', ['error' => 'Invalid credentials!']);
    }

    if ('clicked' === $state['inc']) {
        $state['counter']++;
    }

    if (strlen($state['password']) > 0 && strlen($state['password']) < 8) {
        $state['info'] = render('InfoView', ['info' => 'Keep typing, pass too short.']);
    }

    return render('LoginView', $state);
}

function handle ($input) {
    switch ($input['scene']) {
        case 'DashboardScene': return handleDashboardScene($input);
        case 'LoginScene':
        default:
            return handleLoginScene($input);
    }
}

$response = [
    'html' => handle($input),
    'input' => $input,
];

$json = json_encode($response);

header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET,HEAD,OPTIONS,POST,PUT,PATCH');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Authorization, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
header('Access-Control-Allow-Origin: *');
header('Content-Length: ' . strlen($json));
header('Content-Type: application/json');

echo $json;
