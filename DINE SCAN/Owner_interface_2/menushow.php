<?php

// Connect to the database.
$db = new PDO("mysql:host=localhost;dbname=dinescanmenu", "root", "");

// Get the list of food items.
$sql = "SELECT * FROM menu_items";
$result = $db->query($sql);

// Create an array of food items.
$foodItems = [];
while ($row = $result->fetch()) {
  $foodItems[] = [
    "name" => $row["name"],
    "image" => $row["image"],
    "cost" => $row["cost"],
  ];
}

// Return the array of food items.
echo json_encode($foodItems);

?>