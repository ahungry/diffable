<?php require_once 'globals.php' ?>

<input type="hidden" diffable id="scene" value="LoginScene">
<div style="margin: auto;">
  <form>
    <?php s('error'); ?>
    <div>
      <input type="text"
             value="<?php s('username'); ?>"
             id="username"
             diffable />
    </div>
    <?php s('info'); ?>
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
    <div>
      <strong id="inc" clickable diffable>Clicked <?php s('counter'); ?> times!</strong>
    </div>
    <input type="hidden" id="counter" diffable value="<?php s('counter'); ?>" />
  </form>
</div>
