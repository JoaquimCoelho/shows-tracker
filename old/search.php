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
    <title>Search</title>
    <link rel="stylesheet" href="search.css">
    <link rel="stylesheet" href="essential.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />

</head>

<body>

    <ul class="topnav">
        <!--<li><a href="index.php">Home</a></li>-->
        <li><a href="search.php">Search</a></li>
        <?php
        if (isset($_SESSION['logged']) && $_SESSION['admin'] == 1) {
            echo "<li class='login-button'><a>Admin</a></li>";
        }

        if (isset($_SESSION['logged'])) {   
            echo "<li class='login-button'><a href='login.php?logout=1&page=search.php'>Logout</a></li>";
            echo "<li class='login-button' target='_blank'><a href='pdf.php'>PDF</a></li>";
        } else {
            echo "<li class=\"login-button\">
            <a href=\"#\" onclick=\"showLoginPopup()\">Login</a>
            <dialog id=\"login-dialog\">
                <h3>Login</h3>
                <button class=\"close-button\" onclick=\"closeDialog('login-dialog')\"><span class=\"material-symbols-outlined\">cancel</span></button>
                <form method=\"post\" action=\"login.php?login=1&page=search.php\">
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

    <dialog id="register-dialog">
        <h3>Register</h3>
        <button class="close-button" onclick="closeDialog('login-dialog')"><span class="material-symbols-outlined">cancel</span></button>
        <form method="post" action="login.php?regist=1&page=search.php">
            <input type="text" name="username" placeholder="Username">
            <input type="email" name="email" placeholder="Email">
            <input type="password" name="password" placeholder="Password">
            <button type="submit">Register</button>
        </form>
    </dialog>


    <div class="search-container">
        <form action="search.php" method="post">
            <input type="text" name="tvshow" placeholder="TV Show Name">
            <select name="order" class="order-select">
                <option value="popularity.desc">Popularity Descending</option>
                <option value="popularity.asc">Popularity Ascending</option>
                <option value="vote_average.desc">Rating Descending</option>
                <option value="vote_average.asc">Rating Ascending</option>
            </select>
            <button type="submit">Search</button>
        </form>
    </div>


    <?php
    $apiKey = 'redacted :)';
    $searchQuery = isset($_POST["tvshow"]) ? urlencode($_POST["tvshow"]) : ""; // Get search query from form submission
    $order = isset($_POST["order"]) ? $_POST["order"] : 'popularity.desc'; // Get order from form submission or use default value

    // Display placeholder content when the page is first loaded
    if (empty($searchQuery)) {
        echo '<div class="placeholder-content">';
        echo '<h3>Search for TV shows to get started</h3>';
        echo '</div>';
    } else {
        $url = "https://api.themoviedb.org/3/search/tv?api_key=$apiKey&language=en-US&query=$searchQuery&page=1&sort_by=$order";

        // Make the API request
        $response = file_get_contents($url);

        // Handle the API response
        $data = json_decode($response);
        if ($data && isset($data->results) && !empty($data->results)) {
            // Sort the results based on the selected order
            usort($data->results, function ($a, $b) use ($order) {
                if ($order === 'popularity.desc') {
                    return $b->popularity <=> $a->popularity;
                } elseif ($order === 'popularity.asc') {
                    return $a->popularity <=> $b->popularity;
                } elseif ($order === 'vote_average.desc') {
                    return $b->vote_average <=> $a->vote_average;
                } elseif ($order === 'vote_average.asc') {
                    return $a->vote_average <=> $b->vote_average;
                }
                return 0;
            });

            echo '<div class="tv-shows">';
            foreach ($data->results as $tvShow) {
                $id = $tvShow->id;
                $title = $tvShow->name;
                $posterPath = $tvShow->poster_path;

                // Shorten the title if it is too long
                $shortTitle = (strlen($title) > 17) ? substr($title, 0, 17) . '...' : $title;

                // Display the TV show details
                echo "<a href=\"show.php?id=$id\" class=\"tv-show\">";
                echo "<div class='poster-container'>";
                echo "<img src=\"https://image.tmdb.org/t/p/w500/$posterPath\" alt=\"$title Poster\">";
                echo "</div>";
                echo "<h2>$shortTitle</h2>";
                echo "</a>";
            }
            echo '</div>';
        } else {
            echo "No TV shows found.";
        }
    }
    ?>

    <script>
        var registerDialog = document.getElementById("register-dialog");
        var dialog = document.getElementById("login-dialog");

        function showLoginPopup() {
            dialog.showModal();
        }

        function showRegisterPopup() {
            dialog.close();
            registerDialog.showModal();
        }

        function closeDialog(dialogId) {
            dialog.close();
            registerDialog.close();
        }
    </script>
</body>



</html>