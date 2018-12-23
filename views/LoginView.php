<?php require_once 'globals.php' ?>

<input type="hidden" diffable id="scene" value="LoginScene">
<div style="margin: auto;">
  <form>
    <div>
      <input type="text"
             value="<?php s('username'); ?>"
             id="username"
             diffable />
    </div>
    <div>
      <input type="password"
             value="<?php s('password'); ?>"
             id="password"
             diffable />
    </div>
    <div>
      <button id="go"
              clickable
              diffable>Login</button>
    </div>
    <div style="background:#333;padding:20px;">
      <?php s('error'); ?>
    </div>
    <div style="background:#333;padding:20px;">
      <?php s('info'); ?>
    </div>
    <div>
      <button id="inc" clickable diffable>Clicked <?php s('counter'); ?> times!</button>
    </div>
    <input type="hidden" id="counter" diffable value="<?php s('counter'); ?>" />
  </form>
</div>
