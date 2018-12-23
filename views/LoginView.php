<form>
  <input type="text" value="<?php $username; ?>" id="username" diffable />
  <input type="password" value="<?php $password; ?>" id="password" diffable />
  <button id="go" clickable diffable>Login</button>
  <div>
    <strong id="inc" clickable diffable>Clicked <?php $counter; ?> times!</strong>
  </div>
  <input type="hidden" id="counter" diffable value="<?php $counter; ?>" />
</form>
