<?php require_once 'globals.php' ?>

<?php include 'HeaderView.php' ?>

<h1>Counter</h1>

<input type="hidden" diffable refresh id="scene" value="CounterScene">
<div style="margin: auto;">
    <div>
      <button id="inc" clickable diffable>Clicked <?php s('counter'); ?> times!</button>
    </div>
    <div>
      The date auto-refreshes, pretty neat huh?
      <?php s('date');?>
    </div>
    <input type="hidden" id="counter" diffable value="<?php s('counter'); ?>" />
</div>
