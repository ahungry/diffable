<?php require_once 'globals.php' ?>

<input type="hidden" diffable id="scene" value="DashboardScene">
<div style="margin: auto;">
  Welcome to your dashboard!

  <h1>Your templates</h1>

  <table>
    <?php foreach (s('templates', false) as $key => $value): ?>
      <tr>
        <td>
          <button
            pointer="templateId"
            value="<?=$value;?>"
            diffable
            clickable >
            <?=$value;?>
          </button>
        </td>
      </tr>
    <?php endforeach; ?>
  </table>

  <select id="templateId" diffable>
    <?php foreach (s('templates', false) as $key => $value): ?>
      <option value="<?=$value;?>"><?=$value;?></option>
    <?php endforeach; ?>
  </select>
  </table>
  <iframe style="width: 500px;" src="/views/<?php s('templateId'); ?>"></iframe>
</div>
