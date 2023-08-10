<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "dinescanmenu";

try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $data = json_decode(file_get_contents("php://input"), true);

    $name = $data['name'];
    $image = $data['image'];
    $description = $data['description'];
    $cost = $data['cost'];

    $stmt = $conn->prepare("INSERT INTO menu_items (name, image, description, cost) VALUES (?, ?, ?, ?)");
    $stmt->execute([$name, $image, $description, $cost]);

    echo json_encode(['success' => true]);
} catch (PDOException $e) {
    echo json_encode(['success' => false]);
}
?>
