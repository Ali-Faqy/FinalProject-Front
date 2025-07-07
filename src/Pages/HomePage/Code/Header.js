export async function getNumberOfProducts(){
    let data;
    try {
        const response = await fetch(`http://127.0.0.1:8000/products/num_of_product`);
        if (!response.ok) {
          throw new Error('Failed to fetch Number products');
        }
        data = await response.json();
        
      } catch (error) {
        console.error('Error:', error);
      }
      return data;
  }

  export async function getTotalUsers(){
    let data;
    try {
        const response = await fetch(`http://127.0.0.1:8000/users/total-users`);
        if (!response.ok) {
            throw new Error('Failed to fetch total users');
        }
        data = await response.json();
    } catch (error) {
        console.error('Error:', error);
    }
    return data;
}
