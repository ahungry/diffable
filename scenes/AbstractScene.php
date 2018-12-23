<?php
declare(strict_types=1);
namespace Scene;

require_once __DIR__ . '/../views/globals.php';

abstract class AbstractScene
{
    public function render(string $tpl, $arrayOrObject): string
    {
        $input = json_decode(json_encode($arrayOrObject), true);
        ob_start();
        set_world($input);
        include __DIR__ . '/../views/' . $tpl . '.php';
        $html = ob_get_clean();

        return $html;
    }

    abstract public function next(): string;
}
