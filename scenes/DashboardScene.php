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
        foreach (scandir(__DIR__ . '/../views') as $key => $value) {
            if (preg_match('/.*View\.php/', $value)) {
                $keep[] = $value;
            }
        }

        $this->templates = $keep;
        sort($this->templates);
    }

    public function next(): string
    {
        return $this->render('DashboardView', $this);
    }
}
