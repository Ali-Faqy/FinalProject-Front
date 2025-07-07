import { toast } from 'react-toastify';
export async function getTrackingInformation(orderId) {
    let data;
    try {
        const response = await fetch(`http://localhost:8000/tracking/summary/${orderId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch order tracking information');
        }
        data = await response.json();
        
      } catch (error) {
        console.error('Error:', error);
      }
      return data;
  }

  export async function getTrackingHistory(orderId) {
    let data;
    try {
        const response = await fetch(`http://127.0.0.1:8000/tracking/history/${orderId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch order tracking history');
        }
        data = await response.json();
        
      } catch (error) {
        console.error('Error:', error);
      }
      return data;
  }

  export async function insertTrackRecord(newRecord) {
    try {
      const response = await fetch("http://localhost:8000/tracking/new-track", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newRecord),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        toast.success(`Record added success!`, { containerId: "other" });
        return data;
      } else {
        toast.error(`Added to Record failed!`, { containerId: "other" });
      }
    } catch (error) {
      console.error("Error during record added", error);
      alert("An error occurred. Please try again later.");
    }
  }

  export async function getAllDrivers() {
    let data;
    try {
        const response = await fetch(`http://127.0.0.1:8000/drivers`);
        if (!response.ok) {
          throw new Error('Failed to fetch drivers');
        }
        data = await response.json();
        
      } catch (error) {
        console.error('Error:', error);
      }
      return data;
  }