<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $username = $_POST['username'];
    $comment = $_POST['comment'];

    // Manejo del archivo
    $image = $_FILES['image'];
    $imagePath = 'uploads/' . basename($image['name']);
    move_uploaded_file($image['tmp_name'], $imagePath);

    // Conexión a la base de datos
    $conn = new mysqli('localhost', 'root', '', 'payflux_db');
    if ($conn->connect_error) {
        die('Error de conexión: ' . $conn->connect_error);
    }

    // Insertar en la base de datos
    $stmt = $conn->prepare("INSERT INTO posts (username, image_path, comment) VALUES (?, ?, ?)");
    $stmt->bind_param('sss', $username, $imagePath, $comment);
    $stmt->execute();
    $stmt->close();

    echo json_encode(['success' => true]);
}
?>
