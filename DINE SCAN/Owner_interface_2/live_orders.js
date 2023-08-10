$(document).ready(function() {
    // Fetch the live orders from the PHP script
    $.getJSON("get_live_orders.php", function(data) {
      // Loop through the orders and create HTML elements for each order
      for (let order of data) {
        addOrder(order);
      }
    });
  
    // Function to add an order to the orders container
    function addOrder(order) {
      const ordersContainer = document.getElementById("orders-container");
  
      // Create a new order card
      const orderCard = document.createElement("div");
      orderCard.classList.add("order-card");
  
      // Add the order number to the order card
      const orderNumber = document.createElement("h3");
      orderNumber.textContent = "Order #" + order.order_id;
      orderCard.appendChild(orderNumber);
  
      // Create a new list for order items
      const orderList = document.createElement("ul");
  
      // Loop through the order items and add them to the order list
      for (let item of order.items) {
        const listItem = document.createElement("li");
  
        // Add the food item image to the list item
        // const foodItemImage = document.createElement("img");
        // foodItemImage.src = item.image;
        // foodItemImage.alt = "Food Item";
        // foodItemImage.classList.add("food-image");
        // listItem.appendChild(foodItemImage);
  
        // Add the order details to the list item
        const orderDetails = document.createElement("div");
        orderDetails.classList.add("order-details");
  
        const tableNo = document.createElement("p");
        tableNo.innerHTML = "Table No: <span class='table-no'>" + order.table_number + "</span>";
        orderDetails.appendChild(tableNo);
  
        const foodItemName = document.createElement("p");
        foodItemName.textContent = "Food Item: " + item.name;
        orderDetails.appendChild(foodItemName);
  
        const quantity = document.createElement("p");
        quantity.textContent = "Quantity: " + item.quantity;
        orderDetails.appendChild(quantity);
  
        const instructions = document.createElement("p");
        instructions.textContent = "Instructions: " + item.instructions;
        orderDetails.appendChild(instructions);
  
        listItem.appendChild(orderDetails);
        orderList.appendChild(listItem);

        
      }
  
      orderCard.appendChild(orderList);
      ordersContainer.appendChild(orderCard);

    //   const toggleBtn = document.createElement("button");
    // toggleBtn.classList.add("toggle-btn");
    // toggleBtn.textContent = "Processing";
    // toggleBtn.addEventListener("click", function() {
    //   toggleOrderStatus(order.order_id);
    // });
    // orderCard.appendChild(toggleBtn);
      
    const toggleSlider = document.createElement("label");
    toggleSlider.classList.add("toggle-slider");
    const inputToggle = document.createElement("input");
    inputToggle.type = "checkbox";
    const sliderSpan = document.createElement("span");
    sliderSpan.classList.add("slider");
    toggleSlider.appendChild(inputToggle);
    toggleSlider.appendChild(sliderSpan);

    // Set the default status
    if (order.status === "completed") {
      toggleSlider.classList.add("completed");
      inputToggle.checked = true;
    }

    toggleSlider.addEventListener("click", function() {
      toggleOrderStatus(order.order_id, toggleSlider, inputToggle);
    });
    orderCard.appendChild(toggleSlider);

    }

    // function toggleOrderStatus(orderId) {
    //   $.post("update_order_status.php", { order_id: orderId }, function(data) {
    //     if (data.success) {
    //       // Update the status in the UI
    //       const toggleBtn = document.querySelector(`#order-${orderId} .toggle-btn`);
    //       if (data.status === "completed") {
    //         toggleBtn.textContent = "Completed";
    //       } else {
    //         toggleBtn.textContent = "Processing";
    //       }
  
    //       // Move the order to the completed orders panel
    //       if (data.status === "completed") {
    //         const orderCard = document.getElementById(`order-${orderId}`);
    //         const completedOrdersContainer = document.getElementById("completed-orders-container");
    //         completedOrdersContainer.appendChild(orderCard);
    //       }
    //     }
    //   });
    // }


    function toggleOrderStatus(orderId, toggleSlider, inputToggle) {
      $.post("update_order_status.php", { order_id: orderId }, function(data) {
        if (data.success) {
          // Toggle the status in the UI
          if (data.status === "completed") {
            toggleSlider.classList.add("completed");
            inputToggle.checked = true;
          } else {
            toggleSlider.classList.remove("completed");
            inputToggle.checked = false;
          }
  
          // Move the order to the completed orders panel
          if (data.status === "completed") {
            const orderCard = document.getElementById(`order-${orderId}`);
            const completedOrdersContainer = document.getElementById("completed-orders-container");
            completedOrdersContainer.appendChild(orderCard);
          }
        }
      });
    }

  });
  