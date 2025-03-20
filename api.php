<?php 

header("Content-Type: application/json; charset=UTF-8");

try {
    $con = mysqli_connect("localhost", "root", "", "Projeto", 3307);
}
catch (mysqli_sql_exception $e) {
    echo "Can't connect to database because $e";
}

if (isset ($_GET['nome']) && isset ($_GET['email']) && isset ($_GET['password'])){
    $sql = "INSERT INTO `User`(`username`, `email`, `password`, `admin`) VALUES ('" . $_GET['nome'] . "','" . $_GET['email'] . "','" . $_GET['password'] . "', 0)";
    $result = mysqli_query($con, $sql);
    echo json_encode($result);
}
else if (isset ($_GET['mostrarUser'])){
    $sql = "SELECT * FROM `User`";
    $result = mysqli_query($con, $sql);
    $rows = array();
    while($r = mysqli_fetch_assoc($result)) {
        $rows[] = $r;
    }
    echo json_encode($rows);
}
else if(isset ($_GET['atualizar']) && ($_GET['status']) && isset ($_GET['episode']) && isset ($_GET['score']) && isset ($_GET['id_show']) && isset ($_GET['id_user'])) {
    $sql = "UPDATE `Watched` SET `episode`='" . $_GET['episode'] . "',`score`='" . $_GET['score'] . "' WHERE `id_show`='" . $_GET['id_show'] . "' AND `id_user`='" . $_GET['id_user'] . "'";
    $result = mysqli_query($con, $sql);
    echo json_encode($result);
}
else if(isset ($_GET['remove']) && isset ($_GET['id_show']) && isset ($_GET['id_user'])) {
    $sql = "DELETE FROM `Watched` WHERE `id_show`='" . $_GET['id_show'] . "' AND `id_user`='" . $_GET['id_user'] . "'";
    $result = mysqli_query($con, $sql);
    echo json_encode($result);
}
else if (isset ($_GET['status']) && isset ($_GET['episode']) && isset ($_GET['score']) && isset ($_GET['id_show']) && isset ($_GET['id_user'])) {
    $sql = "INSERT INTO `Watched`(`episode`, `score`, `status`, `id_show`, `id_user`) VALUES ('" . $_GET['episode'] . "','" . $_GET['score'] . "','" . $_GET['status'] . "','" . $_GET['id_show'] . "','" . $_GET['id_user'] . "')";
    $result = mysqli_query($con, $sql);
    echo json_encode($result);
    
} 
else if (isset ($_GET['mostrarWatched']) && isset ($_GET['id_user']) && isset ($_GET['id_show'])){
    $sql = "SELECT * FROM `Watched` WHERE id_user = " . $_GET['id_user'] ."AND". "id_show = " . $_GET['id_show'];
    $result = mysqli_query($con, $sql);
    $rows = array();
    while($r = mysqli_fetch_assoc($result)) {
        $rows[] = $r;
    }
    echo json_encode($rows);
}
else if (isset ($_GET['mostrarWatched'])){
    $sql = "SELECT * FROM `Watched`";
    $result = mysqli_query($con, $sql);
    $rows = array();
    while($r = mysqli_fetch_assoc($result)) {
        $rows[] = $r;
    }
    echo json_encode($rows);
}

?>