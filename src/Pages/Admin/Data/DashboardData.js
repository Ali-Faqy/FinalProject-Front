export async function getTotalRevenue() {
    let data;
    try {
        const response = await fetch(`http://127.0.0.1:8000/orders/revenue/month`);
        if (!response.ok) {
          throw new Error('Failed to fetch revenue');
        }
        data = await response.json();
        
      } catch (error) {
        console.error('Error:', error);
      }
      return data;
}

export async function getTotalOrders() {
  let data;
  try {
      const response = await fetch(`http://localhost:8000/orders/orders-in-month`);
      if (!response.ok) {
        throw new Error('Failed to fetch total orders');
      }
      data = await response.json();
      
    } catch (error) {
      console.error('Error:', error);
    }
    return data;
}

export async function getTotalProductBuying() {
  let data;
  try {
      const response = await fetch(`http://localhost:8000/orders/products-bought/month`);
      if (!response.ok) {
        throw new Error('Failed to fetch total product buying');
      }
      data = await response.json();
      
    } catch (error) {
      console.error('Error:', error);
    }
    return data;
}