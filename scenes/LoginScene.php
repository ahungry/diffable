<?php
declare(strict_types=1);
namespace Scene;

require_once __DIR__ . '/AbstractScene.php';

class LoginScene extends AbstractScene
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

    private function isValidAuth()
    {
        return ('test' === $this->username &&
                'test' === $this->password);
    }

    public function next(): string
    {
        if ('clicked' === $this->go) {
            if ($this->isValidAuth()) {
                return $this->render('DashboardView');
            }

            $this->error = $this->render('ErrorView', ['error' => 'Invalid Credentials!']);
        }

        if ('clicked' === $this->inc) {
            $this->counter++;
        }

        if (strlen($this->password) > 0 && strlen($this->password) < 8) {
            $this->info = $this->render('InfoView', ['info' => 'Keep typing, pass too short!']);
        }

        return $this->render('LoginView', $this);
    }
}
