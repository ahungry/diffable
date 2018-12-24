<?php require_once 'globals.php' ?>

<input type="hidden" value="<?=s('sceneId', false);?>" id="sceneId" diffable />

<button
  pointer="sceneId"
  value="LoginScene"
  clickable>
  Input Form / Counter Button Demo
</button>

<button
  pointer="sceneId"
  value="CounterScene"
  clickable>
  Counter Button Demo
</button>

<button
  pointer="sceneId"
  value="SelectScene"
  clickable>
  Tiered Select Lists
</button>
