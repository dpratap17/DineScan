<?php
$host = "localhost";
$username = "root";
$password = "";
$database = "dinescanmenu";

$conn = new mysqli($host, $username, $password, $database);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Fetch all orders and their items from the database
$sql = "SELECT orders.order_id, orders.table_number, orders.total_amount, order_items.quantity, menu_items.name, menu_items.image, menu_items.description
        FROM orders
        INNER JOIN order_items ON orders.order_id = order_items.order_id
        INNER JOIN menu_items ON order_items.menu_item_id = menu_items.id
        ORDER BY orders.order_id";

$result = $conn->query($sql);

$orders = array();

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $order_id = $row["order_id"];
        $table_number = $row["table_number"];
        $total_amount = $row["total_amount"];

        $item = array(
            "name" => $row["name"],
            "image" => $row["image"],
            "quantity" => $row["quantity"],
            "instructions" => $row["description"]
        );

        if (!isset($orders[$order_id])) {
            $orders[$order_id] = array(
                "order_id" => $order_id,
                "table_number" => $table_number,
                "total_amount" => $total_amount,
                "items" => array()
            );
        }

        $orders[$order_id]["items"][] = $item;
    }
}

$conn->close();

// Return the orders data as JSON
header('Content-Type: application/json');
echo json_encode(array_values($orders));
?>
