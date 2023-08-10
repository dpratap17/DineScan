const foodForm = document.getElementById("foodForm");

foodForm.addEventListener("submit", async function (event) {
  event.preventDefault();

  const foodName = document.getElementById("foodName").value;
  const foodImage = document.getElementById("foodImage").value;
  const foodDescription = document.getElementById("foodDescription").value;
  const foodCost = document.getElementById("foodCost").value;

  const newFoodItem = {
    name: foodName,
    image: foodImage,
    description: foodDescription,
    cost: foodCost,
  };

  const response = await saveToDatabase(newFoodItem);

  if (response.success) {
    alert("Food item added successfully!");
    foodForm.reset();
  } else {
    alert("Failed to add food item. Please try again.");
  }
});

async function saveToDatabase(foodItem) {
  try {
    const response = await fetch("save_food_item.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(foodItem),
    });

    return await response.json();
  } catch (error) {
    console.error("Error saving data to the database:", error);
    return { success: false };
  }
}
