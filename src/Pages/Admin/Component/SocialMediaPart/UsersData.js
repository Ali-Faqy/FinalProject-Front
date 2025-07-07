export async function getActiveUsers() {
    let data;
    try {
        const response = await fetch(`http://127.0.0.1:8000/social/active-users-detailed`);
        if (!response.ok) {
          throw new Error('Failed to fetch top performance post data');
        }
        data = await response.json();
        
      } catch (error) {
        console.error('Error:', error);
      }
      return data;
  }