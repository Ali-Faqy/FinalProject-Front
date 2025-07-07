export async function getAllTools() {
    let data;
    try {
        const response = await fetch(`http://localhost:8000/products`);
        if (!response.ok) {
          throw new Error('Failed to fetch all tools');
        }
        data = await response.json();
        
      } catch (error) {
        console.error('Error:', error);
      }
      return data;
  }