<?php
$matchCount = 34;
$current = 1;
$error = false;

// Check and assign the current game day
if (!empty($_GET["spieltag"])) {
    $spieltag = (int) $_GET["spieltag"];
    if ($spieltag > 0 && $spieltag <= $matchCount) {
        $current = $spieltag;
    } else {
        $error = true;
    }
}

// Retrieve the data for the current matchday from the OpenLigaDB API
$url = sprintf("https://api.openligadb.de/getmatchdata/bl1/2022/%d", $current);
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

$output = curl_exec($ch);

if ($output === false) {
    die("Error when requesting the API: " . curl_error($ch));
}

curl_close($ch);

// Decoding the API response
$matches = json_decode($output, true);

if ($matches === null) {
    die("Error processing API response: " . json_last_error_msg());
}
?>
<!DOCTYPE html>
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
        <button type="submit">Lade Spieltag (Saison 2022/2023)</button>
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
                <td><?php echo $match["matchDateTime"]; ?></td>
                <td><?php echo $match["team1"]["teamName"]; ?></td>
                <td><?php echo $match["team2"]["teamName"]; ?></td>
            </tr>
            <?php
        }
        ?>
        </tbody>
    </table>
</div>
</body>
</html>
