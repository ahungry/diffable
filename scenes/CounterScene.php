<?php
declare(strict_types=1);
namespace Scene;

require_once __DIR__ . '/AbstractScene.php';

class CounterScene extends AbstractScene
{
    public $inc;
    public $counter = 0;

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

        if ('clicked' === $this->inc) {
            $this->counter++;
        }

        return $this->render('CounterView', $this);
    }
}
