import { toast } from 'react-toastify';
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

export async function RemoveItemFromCart(cart_id, product_id) {
  try {
      const response = await fetch(`http://127.0.0.1:8000/cart/remove/${cart_id}/${product_id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(),
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data);
        return data;
      } else {
        toast.error("Remove failed.", { containerId: "sign-container" });
      }
      console.log("Response data:", data);
    } catch (error) {
      console.error("Error during remove item from cart:", error);
    }
  };