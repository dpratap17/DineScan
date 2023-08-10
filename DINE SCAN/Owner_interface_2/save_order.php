<?php
// Get the request payload (order data) as a JSON string
$json = file_get_contents('php://input');

// Decode the JSON string to an associative array
$orderData = json_decode($json, true);

// Get the table number and total amount from the order data
$tableNumber = $orderData['table_number'];
$totalAmount = $orderData['total_amount'];

// Perform the database insertion using PDO (use your actual database credentials)
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "dinescanmenu";

try {
  $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

  // Insert the order data into the 'orders' table
  $stmt = $conn->prepare("INSERT INTO orders (table_number, total_amount) VALUES (:tableNumber, :totalAmount)");
  $stmt->bindParam(':tableNumber', $tableNumber);
  $stmt->bindParam(':totalAmount', $totalAmount);
  $stmt->execute();

  // Get the ID of the last inserted order
  $orderID = $conn->lastInsertId();

  // Insert each item with count greater than 0 into the 'order_items' table
  foreach ($orderData['items'] as $item) {
    $itemName = $item['name'];
    $quantity = $item['quantity'];

    // Get the menu_item_id from the 'menu_items' table
    $stmt = $conn->prepare("SELECT id FROM menu_items WHERE name = :itemName");
    $stmt->bindParam(':itemName', $itemName);
    $stmt->execute();
    $menuItemID = $stmt->fetchColumn();

    // Insert the order item into the 'order_items' table
    $stmt = $conn->prepare("INSERT INTO order_items (order_id, menu_item_id, quantity) VALUES (:orderID, :menuItemID, :quantity)");
    $stmt->bindParam(':orderID', $orderID);
    $stmt->bindParam(':menuItemID', $menuItemID);
    $stmt->bindParam(':quantity', $quantity);
    $stmt->execute();
  }

  // Send a success response back to the frontend
  $response = array('success' => true);
  echo json_encode($response);
} catch (PDOException $e) {
  // Handle database errors
  $response = array('success' => false, 'error' => $e->getMessage());
  echo json_encode($response);
}

// Close the database connection
$conn = null;
?>

