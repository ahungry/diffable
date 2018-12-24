<?php

$world = array();

function set_world($w) {
    global $world;

    $world = $w;
}

function maybe_default ($key) {
    if ($_SERVER['CONTENT_TYPE'] && $_SERVER['CONTENT_TYPE'] === 'application/json') {
        return '';
    }

    return $key;
}

function s ($key, $echo = true) {
    global $world;

    $val = isset($world[$key]) ? $world[$key] : maybe_default($key);

    if ($echo) {
        echo $val;
    }

    return $val;
}
