export async function getProductInfo() {
    let data;
    try {
        const response = await fetch(`http://localhost:8000/products/simple-products`);
        if (!response.ok) {
          throw new Error('Failed to fetch product information');
        }
        data = await response.json();
        
      } catch (error) {
        console.error('Error:', error);
      }
      return data;
  }

  export async function getInventoryAnalytics() {
    let data;
    try {
        const response = await fetch(`http://localhost:8000/products/inventory-stats`);
        if (!response.ok) {
          throw new Error('Failed to fetch inventory information');
        }
        data = await response.json();
        
      } catch (error) {
        console.error('Error:', error);
      }
      return data;
  }