export async function getUserNameAndEmail(userId){
    let data;
    try {
        const response = await fetch(`http://127.0.0.1:8000/users/${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch User');
        }
        data = await response.json();
        
      } catch (error) {
        console.error('Error:', error);
      }
      return data;
}

export async function getNumberOfCartItem(userId){
  let data;
  try {
      const response = await fetch(`http://127.0.0.1:8000/cart/count/${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch Number of cart items');
      }
      data = await response.json();
      
    } catch (error) {
      console.error('Error:', error);
    }
    return data;
}
