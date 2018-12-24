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
    public $error = '';
    public $info = '';

    public function __construct($state)
    {
        foreach ($state as $k => $v) {
            $this->{$k} = $v;
        }
    }

    private function isValidAuth()
    {
        return ('testing1' === $this->username &&
                'testing1' === $this->password);
    }

    private function isTooShort(int $n): bool
    {
        return $n > 0 && $n < 8;
    }

    private function checkLength(string $key)
    {
        $len = strlen($this->$key);

        if ($this->isTooShort($len)) {
            return $this->info .= $this->render(
                'InfoView',
                ['info' => "Keep typing, $key too short! ({$len} / 8+ chars)"]
            );
        }

        if ($len > 0) {
            return $this->info .= $this->render(
                'SuccessView',
                ['info' => "Good job, your $key is perfect!"]
            );
        }
    }

    public function next(): string
    {
        if (parent::next() !== '') {
            return parent::next();
        }

        if ('clicked' === $this->go) {
            if ($this->isValidAuth()) {
                return (new DashboardScene([]))->next();
            }

            $this->error = $this->render('ErrorView', ['error' => 'Invalid Credentials!']);
        }

        if ('clicked' === $this->inc) {
            $this->counter++;
        }

        $this->checkLength('username');
        $this->checkLength('password');

        return $this->render('LoginView', $this);
    }
}
