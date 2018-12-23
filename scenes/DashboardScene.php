<?php
declare(strict_types=1);
namespace Scene;

require_once __DIR__ . '/AbstractScene.php';

class DashboardScene extends AbstractScene
{
    public $go;
    public $inc;
    public $username = '';
    public $password = '';
    public $counter = 0;

    public function __construct($state)
    {
        foreach ($state as $k => $v) {
            $this->${k} = $v;
        }
    }

    public function next(): string
    {
        return $this->render('DashboardView', json_encode($this));
    }
}
