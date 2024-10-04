<?
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token, Authorization');
?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script src="dist/load.js" type="module"></script>
    <title>Play!</title>
  </head>
  <body>
    <table>
        <tr>
            <th colspan="100%">
                Welcome to Max's Little Python Pomeon Game!
            </th>
        </tr>
        <tr>
            <td style="width: 50%;">
                <input id="game_id" type="number" title="ID of game played"/>
            </td>
            <td style="width: 50%;">
                <button id="load_game" style="width: 100%;">Load Game</button>
            </td>
        </tr>
        <tr>
            <td colspan="100%">
                <button id="new_game" style="width: 100%;">New Game</button>
            </td>
        </tr>
    </table>
  </body>
  <script>var exports = {"__esModule": true};</script>
</html>