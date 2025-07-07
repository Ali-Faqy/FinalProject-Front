export async function getAllCustomer() {
    let data;
    try {
        const response = await fetch(`http://localhost:8000/users/admin/users`);
        if (!response.ok) {
          throw new Error('Failed to fetch all users');
        }
        data = await response.json();
        
      } catch (error) {
        console.error('Error:', error);
      }
      return data;
}

export async function getAllOrderForCustomer(customerId) {
  let data;
  try {
      const response = await fetch(`http://localhost:8000/orders/customer-orders/${customerId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch all user orders');
      }
      data = await response.json();
      
    } catch (error) {
      console.error('Error:', error);
    }
    return data;
}

export async function getAllCustomerOrder() {
  let data;
  try {
      const response = await fetch(`http://localhost:8000/orders/all-customers-orders`);
      if (!response.ok) {
        throw new Error('Failed to fetch all orders');
      }
      data = await response.json();
      
    } catch (error) {
      console.error('Error:', error);
    }
    return data;
}

export async function getCustomerInfo(order_id) {
  let data;
  try {
      const response = await fetch(`http://localhost:8000/orders/customer-info-order/${order_id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch customer information for order');
      }
      data = await response.json();
      
    } catch (error) {
      console.error('Error:', error);
    }
    return data;
}

export async function getOrderInfo(order_id) {
  let data;
  try {
      const response = await fetch(`http://localhost:8000/orders/order-info/${order_id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch order information');
      }
      data = await response.json();
      
    } catch (error) {
      console.error('Error:', error);
    }
    return data;
}

export async function getProductsInOrder(order_id) {
  let data;
  try {
      const response = await fetch(`http://localhost:8000/orders/order-products/${order_id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch products information for order');
      }
      data = await response.json();
      
    } catch (error) {
      console.error('Error:', error);
    }
    return data;
}