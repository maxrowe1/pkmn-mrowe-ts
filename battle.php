<?
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Requested-With, X-Auth-Token, Authorization');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
  // If it's a preflight request, return a 200 response
  http_response_code(200);
  exit();
}
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
    <table style="table-layout: fixed; width:40em; margin-left:auto; margin-right:auto;">
      <tr>
        <td style="width: 50%;"></td>
        <td style="width: 50%;"></td>
      </tr>
      <tr>
          <td id="enemy_name" colspan="2">Enemy Name</td>
      </tr>
      <tr>
        <td colspan="2" style="font-family: monospace;">
          HP: <span id="enemy_health" style="color:green">||||||||||||||||||||</span>
        </td>
      </tr>
      <tr style="height: 100px;">
        <td>&nbsp;</td><!-- Space in between -->
      </tr>
      <tr>
        <td colspan="2" align="right" style="font-family: monospace;">
          HP: <span id="player_health" style="color:green">||||||||||||||||||</span>
        </td>
      </tr>
      <tr>
        <td id="player_name" colspan="2" align="right">Your Name</td>
      </tr>
      <tr>
        <td colspan="2" style="border: solid;"><p id="message" style="padding-left: 10px;">What will you do?</p></td>
      </tr>
      <tr>
        <td><button id="1" name="attack" style="width: 100%;">Attack 1</button></td>
        <td><button id="2" name="attack" style="width: 100%;">Attack 2</button></td>
      </tr>
      <tr>
        <td><button id="3" name="attack" style="width: 100%;">Attack 3</button></td>
        <td><button id="4" name="attack" style="width: 100%;">Attack 4</button></td>
      </tr>
    </table>
  </body>
  <script>var exports = {"__esModule": true};</script>
</html>