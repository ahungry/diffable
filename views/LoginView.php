<?php require_once 'globals.php' ?>

<form>
  <?php s('error'); ?>
  <input type="text"
         value="<?php s('username'); ?>"
         id="username"
         diffable />
  <?php s('info'); ?>
  <input type="password"
         value="<?php s('password'); ?>"
         id="password"
         diffable />
  <button id="go"
          clickable
          diffable>Login</button>
  <div>
    <strong id="inc" clickable diffable>Clicked <?php s('counter'); ?> times!</strong>
  </div>
  <input type="hidden" id="counter" diffable value="<?php s('counter'); ?>" />
</form>
