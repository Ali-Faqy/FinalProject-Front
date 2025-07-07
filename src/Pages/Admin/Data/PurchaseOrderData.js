import { toast } from 'react-toastify';
export async function getAllSupplier() {
    let data;
    try {
        const response = await fetch(`http://localhost:8000/purchase/suppliers`);
        if (!response.ok) {
          throw new Error('Failed to fetch suppliers information');
        }
        data = await response.json();
        
      } catch (error) {
        console.error('Error:', error);
      }
      return data;
  }

export async function getAllPurchaseOrders() {
    let data;
    try {
        const response = await fetch(`http://localhost:8000/purchase/orders`);
        if (!response.ok) {
          throw new Error('Failed to fetch purchase orders');
        }
        data = await response.json();
        
      } catch (error) {
        console.error('Error:', error);
      }
      return data;
  }

export async function getPurchaseOrderById(id) {
    let data;
    try {
        const response = await fetch(`http://localhost:8000/purchase/order/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch purchase order');
        }
        data = await response.json();
        
      } catch (error) {
        console.error('Error:', error);
      }
      return data;
  }

  export async function insertPurchaseOrder(order) {
      try {
        const response = await fetch("http://127.0.0.1:8000/purchase/new-order", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(order),
        });
    
        const data = await response.json();
    
        if (response.ok) {
          toast.success(`Order added success!`, { containerId: "other" });
          return data;
        } else {
          toast.error(`Added order failed!`, { containerId: "other" });
        }
      } catch (error) {
        console.error("Error during order added", error);
        alert("An error occurred. Please try again later.");
      }
    }

    export async function editPaymentStatus(id, status) {
        try {
          const response = await fetch(`http://127.0.0.1:8000/purchase/update-status/${id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ payment_status: status }),
          });
      
          const data = await response.json();
      
          if (response.ok) {
            toast.success(`Order status updated successfully!`, { containerId: "other" });
            return data;
          } else {
            toast.error(`Failed to update order status!`, { containerId: "other" });
          }
        } catch (error) {
          console.error("Error updating payment status", error);
          alert("An error occurred. Please try again later.");
        }
      }