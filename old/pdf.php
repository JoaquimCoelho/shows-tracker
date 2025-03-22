<?php

session_start();

if (isset($_SESSION['logged'])) {
    $username = $_SESSION['username'];
    $email = $_SESSION['email'];
} else {
    $username = "";
    $email = "";
}


$host = 'localhost';
$username = 'root';
$password = '';
$database = 'Projeto';

$conn = mysqli_connect($host, $username, $password, $database);

if (!$conn) {
    die('Database connection error: ' . mysqli_connect_error());
}

$id = $_SESSION['id'];

$query = "SELECT * FROM `Watched` WHERE id_user = $id";

$result = mysqli_query($conn, $query);

if (!$result) {
    die('Database query error: ' . mysqli_error($conn));
}

$rows = array();

while ($row = mysqli_fetch_assoc($result)) {
    $rows[] = $row;
}

mysqli_close($conn);
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Generate PDF</title>
</head>

<body>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.16/jspdf.plugin.autotable.min.js"></script>


    <script>
        window.jsPDF = window.jspdf.jsPDF;


        // Retrieve the TV show data from PHP
        var tvShows = <?php echo json_encode($rows); ?>;

        // Create a new PDF document
        var doc = new jsPDF();

        // Set the font size and style for the title
        doc.setFontSize(18);

        // Add the title
        doc.text('TV Show Progress Report', 10, 20);

        // Set the font size and style for the table
        doc.setFontSize(12);

        // Create an empty array to hold the table data
        var tableData = [];

        // Add the table headers
        tableData.push(['User ID', 'Show ID', 'Episodes', 'Score', 'Status']);

        // Add the TV show data to the table
        tvShows.forEach(function(tvShow) {
            tableData.push([tvShow.id_user, tvShow.id_show, tvShow.episode, tvShow.score, tvShow.status]);
        });

        // Set the x and y coordinates for the table
        var startX = 10;
        var startY = 30;

        // Set the table column widths
        var columnWidths = [80, 80];

        // Add the table to the document
        doc.autoTable({
            head: tableData.slice(0, 1),
            body: tableData.slice(1),
            startY: startY,
            startX: startX,
            columnWidths: columnWidths
        });

        // Save the PDF file
        doc.save('tv_show_progress_report.pdf');

    </script>

</body>

</html>