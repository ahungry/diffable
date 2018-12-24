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
  value="DashboardScene"
  clickable>
  Dashboard Demo (iframe links)
</button>

<button
  pointer="sceneId"
  value="ProfileScene"
  clickable>
  Account Profile (Static page)
</button>
