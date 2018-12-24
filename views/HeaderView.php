<?php require_once 'globals.php' ?>

<input type="hidden" value="<?=s('sceneId', false);?>" id="sceneId" diffable />

<button
  pointer="sceneId"
  value="DashboardScene"
  clickable>
  Dashboard
</button>

<button
  pointer="sceneId"
  value="ProfileScene"
  clickable>
  Account Profile
</button>

<button
  pointer="sceneId"
  value="LoginScene"
  clickable>
  Logout
</button>
