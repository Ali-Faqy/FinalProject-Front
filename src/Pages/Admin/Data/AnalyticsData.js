export async function getSalesAnalytics() {
    let data;
    try {
        const response = await fetch(`http://localhost:8000/orders/sales-analytics`);
        if (!response.ok) {
          throw new Error('Failed to fetch sales analytics');
        }
        data = await response.json();
        
      } catch (error) {
        console.error('Error:', error);
      }
      return data;
  }

  export async function getProductsAnalytics() {
    let data;
    try {
        const response = await fetch(`http://localhost:8000/products/product-analytics`);
        if (!response.ok) {
          throw new Error('Failed to fetch products analytics');
        }
        data = await response.json();
        
      } catch (error) {
        console.error('Error:', error);
      }
      return data;
  }

  export async function getTopPerformanceProducts() {
    let data;
    try {
        const response = await fetch(`http://localhost:8000/products/top-performing-products`);
        if (!response.ok) {
          throw new Error('Failed to fetch top performance products analytics');
        }
        data = await response.json();
        
      } catch (error) {
        console.error('Error:', error);
      }
      return data;
  }

  export async function getCategoryPerformance() {
    let data;
    try {
        const response = await fetch(`http://localhost:8000/categories/top-performance-categories`);
        if (!response.ok) {
          throw new Error('Failed to fetch top performance category analytics');
        }
        data = await response.json();
        
      } catch (error) {
        console.error('Error:', error);
      }
      return data;
  }

  export async function getSalesByRegion() {
    let data;
    try {
        const response = await fetch(`http://localhost:8000/orders/sales-by-region`);
        if (!response.ok) {
          throw new Error('Failed to fetch search by region analytics');
        }
        data = await response.json();
        
      } catch (error) {
        console.error('Error:', error);
      }
      return data;
  }

  export async function getSalesByCategory() {
    let data;
    try {
        const response = await fetch(`http://localhost:8000/orders/sales-by-category`);
        if (!response.ok) {
          throw new Error('Failed to fetch search by category analytics');
        }
        data = await response.json();
        
      } catch (error) {
        console.error('Error:', error);
      }
      return data;
  }

  export async function getTopPerformanceProduct() {
    let data;
    try {
        const response = await fetch(`http://localhost:8000/orders/top-performance-products`);
        if (!response.ok) {
          throw new Error('Failed to fetch search by Top Performance Product analytics');
        }
        data = await response.json();
        
      } catch (error) {
        console.error('Error:', error);
      }
      return data;
  }