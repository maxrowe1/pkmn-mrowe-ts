<?
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Play!</title>
    <script src="dist/main.js" type="module"></script>
  </head>
  <body>
    <table>
        <tr>
            <td id="enemy_name">Enemy Name</td>
            <td colspan="3"></td>
        </tr>
        <tr>
          <td style="font-family: monospace;">
            HP: <span id="enemy_health" style="color:green">&#9608;&#9608;||||||||||||||||</span>
          </td>
        </tr>
        <tr>
          <td style="font-family: monospace;">
            HP: <span id="enemy_health" style="color:green">&#9608;&#9610;||||||||||||&nbsp;&nbsp;&nbsp;&nbsp;
          </td>
        </tr>
        <tr style="height: 100px;">
          <td>&nbsp;</td><!-- Space in between -->
        </tr>
        <tr>
        <td colspan="3"></td>
          <td align="right" style="font-family: monospace;">
            HP: <span id="player_health" style="color:green">||||||||||||||||||</span>
          </td>
        </tr>
        <tr>
        <td colspan="3"></td>
          <td id="player_name" align="right">Your Name</td>
        </tr>
        <tr>
            <td colspan="4" style="border: solid;"><p id="message">What will you do?</p></td>
        </tr>
        <tr>
        <td colspan="2"><button id="1" name="attack">Attack 1</button></td>
        <td colspan="2"><button id="2" name="attack">Attack 2</button></td>
        </tr>
    </table>
  </body>
  <script>var exports = {"__esModule": true};</script>
</html>