import { toast } from 'react-toastify';

export async function InsertOrder(order, products) {
  try {
    // Step 1: Insert order
    const response = await fetch("http://127.0.0.1:8000/orders/insertDeliveryOrder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    });

    const data = await response.json();

    if (!response.ok) {
      toast.error(`Order insertion failed!`, { containerId: "other" });
      return;
    }

    if(data.status === true){
    const order_id = data.order_id
    const productsWithOrderId = {
        order_id: order_id,
        products: products.map(product => ({
          product_id: product.product_id,
          quantity: product.quantity,
        }))
      };
    console.log(productsWithOrderId)
    const response1 = await fetch("http://127.0.0.1:8000/orders/add-products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productsWithOrderId),
    });

    const data1 = await response1.json()
    if (!response1.ok) {
        toast.error(`Order insertion failed111111!`, { containerId: "other" });
        return;
      }
      else{
        toast.success(`Order inserted successfully!`, { containerId: "other" });
        return true;
      }
  }
} catch (error) {
    console.error("Error during order/product insertion:", error);
    alert("An error occurred. Please try again later.");
  }
}

export async function InsertOnlineOrder(order, products) {
  try {
    // Step 1: Insert order
    const response = await fetch("http://127.0.0.1:8000/orders/insertOnlineOrder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    });

    const data = await response.json();

    if (!response.ok) {
      toast.error("Order insertion failed!", { containerId: "other" });
      return;
    }

    if(data.status === true){
    const order_id = data.order_id
    const productsWithOrderId = {
        order_id: order_id,
        products: products.map(product => ({
          product_id: product.product_id,
          quantity: product.quantity,
        }))
      };
    console.log(productsWithOrderId)
    const response1 = await fetch("http://127.0.0.1:8000/orders/add-products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productsWithOrderId),
    });

    const data1 = await response1.json()
    if (!response1.ok) {
        toast.error("Order insertion failed111111!", { containerId: "other" });
        return;
      }
      else{
        toast.success("Order inserted successfully!", { containerId: "other" });
        return true;
      }
  }
} catch (error) {
    console.error("Error during order/product insertion:", error);
    alert("An error occurred. Please try again later.");
  }
}

