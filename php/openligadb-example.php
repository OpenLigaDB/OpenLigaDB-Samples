<?php
$matchCount = 34;
$current = 1;
$error = false;

if (!empty($_GET["spieltag"])) {
    if ($_GET["spieltag"] > 0 && $_GET["spieltag"] <= $matchCount) {
        $current = $_GET["spieltag"];
    } else {
        $error = true;
    }
}

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, "https://www.openligadb.de/api/getmatchdata/bl1/2016/" . (string)$current);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

$output = curl_exec($ch);
curl_close($ch);

$matches = json_decode($output, true);
?><!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8"/>
    <title>OpenLigaDB - PHP Sample</title>

    <style>
        body {
            font-family: Arial;
        }

        td {
            padding: 3px 5px 3px 5px;
        }

        table {
            margin-top: 30px;
        }

        .error {
            border: 1px solid red;
        }
    </style>
</head>

<body>
<h1>Fußballdaten per PHP abrufen</h1>
<h2>Spielergebnisse, Tore und mehr unter <a href="http://www.OpenLigaDb.de" target="_blank">OpenLigaDB</a>!</h2>

<div>
    <form action="<?php echo $_SERVER["PHP_SELF"]; ?>">
        <label for="spieltag">Spieltag:</label>
        <input class="<?php echo $error === true ? "error" : ""; ?>" type="text" id="spieltag" name="spieltag"/>
        <button type="submit">Lade Spieltag (Saison 2016/2017)</button>
    </form>
    <table>
        <thead>
        <tr>
            <th>Datum</th>
            <th>Team1</th>
            <th>Team2</th>
        </tr>
        </thead>
        <tbody>
        <?php
        foreach ($matches as $match) {
            ?>
            <tr>
                <td><?php echo $match["MatchDateTime"]; ?></td>
                <td><?php echo $match["Team1"]["TeamName"]; ?></td>
                <td><?php echo $match["Team2"]["TeamName"]; ?></td>
            </tr>
            <?php
        }
        ?>
        </tbody>
    </table>
</div>
</body>
</html>
