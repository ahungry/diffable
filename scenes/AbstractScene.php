<?php
declare(strict_types=1);
namespace Scene;

require_once __DIR__ . '/../views/globals.php';

require_once 'LoginScene.php';
require_once 'DashboardScene.php';
require_once 'ProfileScene.php';

abstract class AbstractScene
{
    public $state = [];

    public function __construct($state)
    {
        $this->state = $state;
    }

    public function render(string $tpl, $arrayOrObject = []): string
    {
        $start = microtime(true);
        $input = json_decode(json_encode($arrayOrObject), true);
        ob_start();
        set_world($input);
        include __DIR__ . '/../views/' . $tpl . '.php';
        $html = ob_get_clean();
        $end = microtime(true);
        $time = round($end - $start, 6);

        $html .= "<i style='color:#666;'>$tpl rendered at " . (new \DateTime())->format('Y-m-d H:i:s')
            . " in $time seconds.</i>";

        return $html;
    }

    abstract public function next(): string;

    public function maybeChangeScene($state): string
    {
        if (!empty($state->sceneId) && $state->sceneId !== $state->scene) {
            $class = '\\Scene\\' . $state->sceneId;
            $newState = clone $state;
            $newState->scene = $newState->sceneId;
            $obj = new $class($newState);

            return $obj->next();
        }

        return '';
    }
}
