export async function getAllCategories() {
    let data;
    try {
        const response = await fetch(`http://127.0.0.1:8000/categories/random`);
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        data = await response.json();
        
      } catch (error) {
        console.error('Error:', error);
      }
      return data;
}