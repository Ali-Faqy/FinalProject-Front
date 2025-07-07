export async function getReportedData() {
    let data;
    try {
        const response = await fetch(`http://127.0.0.1:8000/report/all-reported`);
        if (!response.ok) {
          throw new Error('Failed to fetch reported data');
        }
        data = await response.json();
        
      } catch (error) {
        console.error('Error:', error);
      }
      return data;
  }