<?php
declare(strict_types=1);
namespace Scene;

require_once __DIR__ . '/AbstractScene.php';

class ProfileScene extends AbstractScene
{
    public function __construct($state)
    {
        parent::__construct($state);

        foreach ($state as $k => $v) {
            $this->{$k} = $v;
        }
    }

    public function next(): string
    {
        if ($this->maybeChangeScene($this->state)) {
            return $this->maybeChangeScene($this->state);
        }

        return $this->render('ProfileView', $this);
    }
}
