<?php require_once 'globals.php' ?>

<input type="hidden" diffable id="scene" value="DashboardScene">
<input type="hidden" value="<?=s('templateId', false);?>" id="templateId" diffable />

<div style="margin: auto;">
  Welcome to your dashboard!

  <h1>Your templates</h1>

  <div>
    <?php foreach (s('templates', false) as $key => $value): ?>
      <button
        pointer="templateId"
        value="<?=$value;?>"
        clickable>
        <?=$value;?>
      </button>
    <?php endforeach; ?>
  </div>

  </table>
  <iframe style="width: 500px;" src="/views/<?php s('templateId'); ?>"></iframe>
</div>
