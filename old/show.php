<!DOCTYPE html>
<html>

<?php
session_start();

if (isset($_SESSION['logged'])) {
    $username = $_SESSION['username'];
    $email = $_SESSION['email'];
} else {
    $username = "";
    $email = "";
}
?>

<head>
    <title>Show Details</title>
    <link rel="stylesheet" href="show.css">
    <link rel="stylesheet" href="essential.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
</head>

<body>

    <ul class="topnav">
       <!-- <li><a href="index.php">Home</a></li>-->
        <li><a href="search.php">Search</a></li>
        
        <?php
        if (isset($_SESSION['logged']) && $_SESSION['admin'] == 1) {
            echo "<li class='login-button'><a>Admin</a></li>";
        }

        if (isset($_SESSION['logged'])) {
            echo "<li class='login-button'><a href='login.php?logout=1&page=show.php?id=" . $_GET['id'] . "'>Logout</a></li>";
            echo "<li class='login-button' target='_blank'><a href='pdf.php'>PDF</a></li>";
        } else {
            echo "<li class=\"login-button\">
            <a href=\"#\" onclick=\"showLoginPopup()\">Login</a>
            <dialog id=\"login-dialog\">
                <h3>Login</h3>
                <button class=\"close-button\" onclick=\"closeDialog('login-dialog')\"><span class=\"material-symbols-outlined\">cancel</span></button>
                <form method=\"post\" action=\"login.php?login=1&page=show.php?id=" . $_GET['id'] . "\">
                    <input type=\"text\" name=\"username\" placeholder=\"Username\">
                    <input type=\"password\" name=\"password\" placeholder=\"Password\">
                    <button type=\"submit\">Login</button>
                    <button type=\"button\" onclick=\"showRegisterPopup()\">Register</button>
                </form>
            </dialog>
        </li>";
        }
        ?>
    </ul>

    <?php

    $id_show = $_GET['id'];
    $id_user = $_SESSION['id'];

    $json = file_get_contents("http://localhost:8080/Projeto/api.php?mostrarWatched&id_show=" . $id_show . "&id_user=" . $id_user. "");

    $json = json_decode($json);

    if ($json != null && isset($_SESSION['logged'])) {
        $score = $json[0]->score;
        $status = $json[0]->status;
        $episode = $json[0]->episode;

        // Display the update dialog with pre-filled data
        echo '<dialog id="update-dialog">';
        echo '<button class="close-button" onclick="closeDialog(\'update-dialog\')"><span class="material-symbols-outlined">cancel</span></button>';
        echo '<form method="post" action="update.php?id_show=' . $id_show . '&id_user=' . $id_user . '">';
        echo '<select name="status" class="status-select" value="' . $status . '">';
        echo '<option value="not_watched">Not Watched</option>';
        echo '<option value="plan_to_watch">Plan to Watch</option>';
        echo '<option value="watching">Watching</option>';
        echo '<option value="watched">Watched</option>';
        echo '</select>';
        echo '<input type="number" min="0" name="episode" value="' . $episode . '">';
        echo '<input type="number" min="0" max="100" name="score" value="' . $score . '">';
        echo '<button type="button" onclick="showConfirmPopup()">Remover</button>';
        echo '<button type="submit">Update</button>';
        echo '</form>';
        echo '</dialog>';
    } else {
        // Display the update dialog with empty fields
        echo '<dialog id="update-dialog">';
        echo '<button class="close-button" onclick="closeDialog(\'update-dialog\')"><span class="material-symbols-outlined">cancel</span></button>';
        echo '<form method="post" action="update.php?id_show=' . $id_show . '&id_user=' . $id_user . '">';
        echo '<select name="status" class="status-select">';
        echo '<option value="not_watched">Not Watched</option>';
        echo '<option value="plan_to_watch">Plan to Watch</option>';
        echo '<option value="watching">Watching</option>';
        echo '<option value="watched">Watched</option>';
        echo '</select>';
        echo '<input type="number" min="0" name="episode" placeholder="Episode">';
        echo '<input type="number" min="0" max="100" name="score" placeholder="Score">';
        echo '<button type="submit">Update</button>';
        echo '</form>';
        echo '</dialog>';
    }
    ?>

    <?php

    if (isset($_GET['id'])) {
        $apiKey = 'redacted :)';
        $tvShowId = $_GET['id'];
        $url = "https://api.themoviedb.org/3/tv/$tvShowId?api_key=$apiKey&language=en-US";

        $response = file_get_contents($url);

        $data = json_decode($response);

        if ($data) {
            $title = $data->name;
            $overview = $data->overview;
            $posterPath = $data->poster_path;

            echo '<div class="show-details">';

            if ($posterPath) {
                echo '<div class="poster-container">';
                echo '<img src="https://image.tmdb.org/t/p/w500/' . $posterPath . '" alt="' . $title . ' Poster">';
                echo '</div>';
            }

            echo '<div class="show-info">';
            echo '<h1>' . $title . '</h1>';
            echo '<p>' . $overview . '</p>';
            echo '<button class="add-button" onclick="showUpdatePopup()">Add to Watchlist</button>';
            echo '</div>';

            

            echo '</div>';
        } else {
            echo 'No TV show details found.';
        }
    } else {
        echo 'No TV show ID provided.';
    }
    ?>

    

    <dialog id="confirm-dialog">
        <h3>Pretende remover este show da sua watchlist?</h3>
        <button class="close-button" onclick="closeDialog('confirm-dialog')"><span class="material-symbols-outlined">cancel</span></button>
        <form method="post" action="update.php?remove=1&id_show=<?php echo $_GET['id'] ?>&id_user=<?php echo $_SESSION['id'] ?>">
            <button type="submit">Remover</button>
        </form>
    </dialog>

    <dialog id="register-dialog">
        <h3>Register</h3>
        <button class="close-button" onclick="closeDialog('register-dialog')"><span class="material-symbols-outlined">cancel</span></button>
        <form method="post" action="login.php?regist=1&page=show.php?id=<?php echo $_GET['id'] ?>">
            <input type="text" name="username" placeholder="Username">
            <input type="email" name="email" placeholder="Email">
            <input type="password" name="password" placeholder="Password">
            <button type="submit">Register</button>
            </for m>
    </dialog>

    <script>
        var registerDialog = document.getElementById("register-dialog");
        var dialog = document.getElementById("login-dialog");
        var updateDialog = document.getElementById("update-dialog");
        var confirmDialog = document.getElementById("confirm-dialog");

        function showLoginPopup() {
            dialog.showModal();
        }

        function showRegisterPopup() {
            dialog.close();
            registerDialog.showModal();
        }

        function closeDialog(dialogId) {
            if (dialogId == "login-dialog") {
                dialog.close();
            } else if (dialogId == "register-dialog") {
                registerDialog.close();
            } else if (dialogId == "update-dialog") {
                updateDialog.close();
            }
        }

        function showUpdatePopup() {
            updateDialog.showModal();
        }

        function showConfirmPopup() {
            confirmDialog.showModal();
        }
    </script>
</body>

</html>