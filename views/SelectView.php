<?php require_once 'globals.php' ?>

<?php include 'HeaderView.php' ?>

<input type="hidden" diffable id="scene" value="SelectScene">

<div style="margin: auto;">
  <h1>Tiered Select Lists</h1>

  <div>

    <select diffable id="speciesChosen">

      <?php foreach (s('species', false) as $key => $value): ?>
        <option

          <?php if ($value === s('speciesChosen', false)): ?>
          selected="true"
          <?php endif; ?>

          value="<?=$value;?>"
        ><?=$value;?></option>
      <?php endforeach; ?>
    </select>

    <?php if (!empty(s('nameList', false))): ?>
      <select diffable id="nameChosen">

        <?php foreach (s('nameList', false) as $key => $value): ?>
          <option

            <?php if ($value === s('nameChosen', false)): ?>
            selected="true"
            <?php endif; ?>

            value="<?=$value;?>"
          ><?=$value;?></option>
        <?php endforeach; ?>
      </select>
  </div>
  <h3>Rhyming Names</h3>
  <div><?=s('rhymingNames');?></div>
    <?php endif; ?>

</div>
