<?php
function state($key) {
  echo 'x';
}
?>
<!-- php -S 127.0.0.1:12345 -->
<!doctype html>
<html>
  <head>
    <title>Diffable</title>
  </head>
  <body>
    <div id="diffable">
      <?php include(__DIR__ . '/views/LoginView.php'); ?>
    </div>
  </body>
  <script src="index.js"></script>
</html>
