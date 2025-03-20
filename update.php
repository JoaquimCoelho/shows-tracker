<?php

if (isset($_GET['id_show']) && isset($_GET['id_user']) && isset($_GET['remove'])) {
    $id_show = $_GET['id_show'];
    $id_user = $_GET['id_user'];
    remove($id_show, $id_user);
}
else if (isset($_GET['id_show']) && isset($_GET['id_user'])) {
    $id_show = $_GET['id_show'];
    $id_user = $_GET['id_user'];
    $score = $_POST['score'];
    $status = $_POST['status'];
    $episode = $_POST['episode'];
    update($score, $status, $episode, $id_show, $id_user);
}


function update ($score, $status, $episode, $id_show, $id_user) {
    
    $json = file_get_contents("http://localhost:8080/Projeto/api.php?mostrarWatched&id_show=" . $id_show . "&id_user=" . $id_user . "");

    $json = json_decode($json);

    if ($json == null) {
        file_get_contents("http://localhost:8080/Projeto/api.php?score=$score&status=$status&episode=$episode&id_show=$id_show&id_user=$id_user");
    }
    else {
        file_get_contents("http://localhost:8080/Projeto/api.php?atualizar&score=$score&status=$status&episode=$episode&id_show=$id_show&id_user=$id_user");
    }

    header("Location: show.php?id=$id_show");

    die();

}

function remove ($id_show, $id_user) {
  
    file_get_contents("http://localhost:8080/Projeto/api.php?remove=1&id_show=$id_show&id_user=$id_user");

    header("Location: show.php?id=$id_show");

    die();

}


?>