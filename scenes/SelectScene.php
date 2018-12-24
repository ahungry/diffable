<?php
namespace Scene;

require_once __DIR__ . '/AbstractScene.php';

class SelectScene extends AbstractScene
{
    public $species = array(
        '', 'cat', 'dog', 'fish',
    );

    public $name = array(
        '' => array(),
        'cat' => array('', 'Noah', 'Coleco', 'Raven'),
        'dog' => array('', 'Mickey', 'Minnie'),
        'fish' => array('', 'Goldie', 'BigEye'),
    );

    public $nameList = array();
    public $speciesChosen = '';
    public $nameChosen = '';
    public $rhymingNames = '';

    public function __construct($state)
    {
        parent::__construct($state);

        foreach ($state as $k => $v) {
            $this->{$k} = $v;
        }
    }

    public function getRhymingNames($name)
    {
        $matches = file_get_contents('https://api.datamuse.com/words?rel_rhy=' . $name);
        $words = array();

        foreach (json_decode($matches, true) as $k => $v) {
            $words[] = $v['word'];
        }

        return $words;
    }

    public function next()
    {
        if ($this->maybeChangeScene($this->state)) {
            return $this->maybeChangeScene($this->state);
        }

        $this->nameList = $this->name[$this->speciesChosen];

        if (!empty($this->nameChosen)) {
            $this->rhymingNames = implode(', ', $this->getRhymingNames($this->nameChosen));
        }

        return $this->render('SelectView', $this);
    }
}
