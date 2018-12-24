<?php
declare(strict_types=1);
namespace Scene;

require_once __DIR__ . '/AbstractScene.php';

class DashboardScene extends AbstractScene
{
    public $templateId = 'SuccessView.php';
    public $templates = [];
    public $preview = '';

    public function __construct($state)
    {
        parent::__construct($state);

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
        if ($this->maybeChangeScene($this->state)) {
            return $this->maybeChangeScene($this->state);
        }

        return $this->render('DashboardView', $this);
    }
}
