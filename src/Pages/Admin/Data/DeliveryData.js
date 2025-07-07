export async function getAllDeliveryOrders() {
    let data;
    try {
        const response = await fetch(`http://127.0.0.1:8000/drivers/orders`);
        if (!response.ok) {
          throw new Error('Failed to fetch Delivery Orders');
        }
        data = await response.json();
        
      } catch (error) {
        console.error('Error:', error);
      }
      return data;
  }

  export async function getDeliveryDetails(order_id) {
    let data;
    try {
        const response = await fetch(`http://127.0.0.1:8000/order-info/${order_id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch Delivery Details');
        }
        data = await response.json();
        
      } catch (error) {
        console.error('Error:', error);
      }
      return data;
  }