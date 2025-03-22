<?php 

if (isset($_GET['regist'])) {
    $username = $_POST['username'];
    $email = $_POST['email'];
    $password = $_POST['password'];
    $page = $_GET['page'];

    echo register($username, $email, $password, $page);
} 
elseif (isset($_GET['login'])) {
    $username = $_POST['username'];
    $password = $_POST['password'];
    $page = $_GET['page'];

    echo login($username, $password, $page);
}
elseif (isset($_GET['logout'])) {
    $page = $_GET['page'];

    echo logout($page);
}

function register ($username, $email, $password, $page) {
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);
    
    $json = file_get_contents("http://localhost:8080/Projeto/api.php?mostrarUser");

    $json = json_decode($json);

    foreach ($json as $key => $value) {
        if ($value->username == $username) {
            $return = "Username already exists";
        }
        if ($value->email == $email) {
            $return = "Email already exists";
        }
    }

    file_get_contents("http://localhost:8080/Projeto/api.php?nome=$username&email=$email&password=$hashed_password");

    header("Location: http://localhost:8080/Projeto/$page");

    return $return;

    die();
}

function login ($username, $password, $page) {
    $json = file_get_contents("http://localhost:8080/Projeto/api.php?mostrarUser");

    $json = json_decode($json);

    foreach ($json as $key => $value) {
        if ($value->username == $username) {
            if (password_verify($password, $value->password)) {
                session_start();
                $_SESSION['id'] = $value->ID;
                $_SESSION['logged'] = true; 
                $_SESSION['username'] = $username;
                $_SESSION['email'] = $value->email;
                $_SESSION['admin'] = $value->admin;

                header("Location: http://localhost:8080/Projeto/$page");

                return "Login successful";
            } else {
                return "Wrong password";
            }
        }
    }

    return "Username not found";

    die();
}

function logout ($page) {
    session_start();
    $_SESSION['logged'] = false;
    session_destroy();

    header("Location: http://localhost:8080/Projeto/$page");

    die();
}

?>