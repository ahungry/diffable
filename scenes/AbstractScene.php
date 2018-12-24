<?php
declare(strict_types=1);
namespace Scene;

require_once __DIR__ . '/../views/globals.php';

abstract class AbstractScene
{
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

    public function next(): string
    {
        if (!empty($this->sceneId) && $this->sceneId !== $this->scene) {
            return $this->render($this->sceneId, $this);
        }

        return '';
    }
}
