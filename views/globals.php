<?php

$world = [];

function set_world($w) {
    global $world;
    $world = $w;
}

function maybe_default ($key) {
    return ($_SERVER['CONTENT_TYPE'] ?? '') === 'application/json' ? '' : $key;
}

function s ($key, $echo = true) {
    global $world;

    $val = $world[$key] ?? maybe_default($key);

    if ($echo) {
        echo $val;
    }

    return $val;
}
