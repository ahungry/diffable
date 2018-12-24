<?php require_once 'globals.php' ?>

<?php include 'HeaderView.php' ?>

<h1>Sign In</h1>

<input type="hidden" diffable refresh id="scene" value="LoginScene">
<div style="margin: auto;">
  <form>
    <div>
      Phone:<br />
      <input type="text"
             value="<?php s('username'); ?>"
             id="username"
             diffable />
    </div>
    <div>
      Password:<br />
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
