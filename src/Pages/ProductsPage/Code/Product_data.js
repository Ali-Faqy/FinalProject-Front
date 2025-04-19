export async function getAllProducts() {
    let data;
    try {
        const response = await fetch(`http://127.0.0.1:8000/products`);
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        data = await response.json();
        
      } catch (error) {
        console.error('Error:', error);
      }
      return data;
}
export async function getAllCategories() {
    let data;
    try {
        const response = await fetch(`http://127.0.0.1:8000/categories`);
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        data = await response.json();
        
      } catch (error) {
        console.error('Error:', error);
      }
      return data;
}

export async function getAllBrands() {
    let data;
    try {
        const response = await fetch(`http://127.0.0.1:8000/companies`);
        if (!response.ok) {
          throw new Error('Failed to fetch brands');
        }
        data = await response.json();
        
      } catch (error) {
        console.error('Error:', error);
      }
      return data;
}