async function getAllCategoriesWithProducts() {
    let data;
    try {
        const response = await fetch(`http://127.0.0.1:8000/categories/with-tools`);
        if (!response.ok) {
          throw new Error('Failed to fetch categories with products');
        }
        data = await response.json();
        
      } catch (error) {
        console.error('Error:', error);
      }
      return data;
}
export default getAllCategoriesWithProducts;
