<?php
declare(strict_types=1);
namespace Scene;

require_once __DIR__ . '/AbstractScene.php';

class DashboardScene extends AbstractScene
{
    public $templateId = 'LoginView.php';
    public $templates = [];

    public function __construct($state)
    {
        foreach ($state as $k => $v) {
            $this->{$k} = $v;
        }

        $this->setTemplates();
    }

    public function setTemplates()
    {
        $this->templates = scandir(__DIR__ . '/../views');
    }

    public function next(): string
    {
        return $this->render('DashboardView', $this);
    }
}
