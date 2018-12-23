<?php

$world = [];

function set_world($w) {
    global $world;
    $world = $w;
}

function maybe_default ($key) {
    return ($_SERVER['CONTENT_TYPE'] ?? '') === 'application/json' ? '' : $key;
}

function s ($key) {
    global $world;

    $val = $world[$key] ?? maybe_default($key);
    echo $val;

    return $val;
}
