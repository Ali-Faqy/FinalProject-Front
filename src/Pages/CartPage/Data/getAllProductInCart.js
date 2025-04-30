export async function getAllProductInCart(user_id) {
    let data;
    try {
        const response = await fetch(`http://127.0.0.1:8000/cart/products/${user_id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch cart products');
        }
        data = await response.json();
        
      } catch (error) {
        console.error('Error:', error);
      }
      return data;
}