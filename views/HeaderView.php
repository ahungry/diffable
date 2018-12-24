<?php require_once 'globals.php' ?>

<input type="hidden" value="<?=s('sceneId', false);?>" id="sceneId" diffable />

<button
  pointer="sceneId"
  value="DashboardView"
  clickable>
  Dashboard
</button>

<button
  pointer="sceneId"
  value="ProfileView"
  clickable>
  Account Profile
</button>
