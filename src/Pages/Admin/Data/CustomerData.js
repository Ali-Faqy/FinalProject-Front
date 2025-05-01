export async function getAllCustomer() {
    let data;
    try {
        const response = await fetch(`http://localhost:8000/users/admin/users`);
        if (!response.ok) {
          throw new Error('Failed to fetch all users');
        }
        data = await response.json();
        
      } catch (error) {
        console.error('Error:', error);
      }
      return data;
}