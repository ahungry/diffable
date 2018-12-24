<?php
namespace Scene;

require_once __DIR__ . '/../views/globals.php';

require_once 'CounterScene.php';
require_once 'LoginScene.php';
require_once 'SelectScene.php';

abstract class AbstractScene
{
    public $state = [];

    public function __construct($state)
    {
        $this->state = $state;
    }

    public function render(string $tpl, $arrayOrObject = [])
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

    abstract public function next();

    public $maybeAnswer = '';

    public function maybeChangeScene($state)
    {
        if (!empty($this->maybeAnswer)) {
            return $this->maybeAnswer;
        }

        if (!empty($state->sceneId) && $state->sceneId !== $state->scene) {
            $class = '\\Scene\\' . $state->sceneId;
            $state->scene = $state->sceneId;
            $obj = new $class($state);
            $this->maybeAnswer = $obj->next();

            return $this->maybeAnswer;
        }

        return '';
    }
}
