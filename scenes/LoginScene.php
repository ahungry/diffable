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
        parent::__construct($state);

        foreach ($state as $k => $v) {
            $this->{$k} = $v;
        }
    }

    private function isValidAuth()
    {
        return (strlen($this->username) > 8 &&
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

    private function maskPhone(string $s): string
    {
        $c = preg_replace('/\D/', '', $s);

        if (strlen($c) < 1) {
            return '';
        }

        if (strlen($c) < 3) {
            return '(' . $c;
        }

        if (strlen($c) < 6) {
            return '(' . substr($c, 0, 3) . ') ' . substr($c, 3);
        }

        return '(' . substr($c, 0, 3) . ') ' . substr($c, 3, 3) . '-' . substr($c, 6, 4);
    }

    public function next(): string
    {
        if ($this->maybeChangeScene($this->state)) {
            return $this->maybeChangeScene($this->state);
        }

        if ('clicked' === $this->go) {
            if ($this->isValidAuth()) {
                return (new SelectScene([]))->next();
            }

            $this->error = $this->render('ErrorView', ['error' => 'Invalid Credentials!']);
        }

        if ('clicked' === $this->inc) {
            $this->counter++;
        }

        $this->checkLength('username');
        $this->checkLength('password');
        $this->username = $this->maskPhone($this->username);

        return $this->render('LoginView', $this);
    }
}
