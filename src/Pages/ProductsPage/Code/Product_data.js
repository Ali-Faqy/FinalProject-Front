import { toast } from 'react-toastify';
export async function getAllProducts() {
    let data;
    try {
        const response = await fetch(`http://127.0.0.1:8000/products`);
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        data = await response.json();
        
      } catch (error) {
        console.error('Error:', error);
      }
      return data;
}
export async function getAllCategories() {
    let data;
    try {
        const response = await fetch(`http://127.0.0.1:8000/categories`);
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        data = await response.json();
        
      } catch (error) {
        console.error('Error:', error);
      }
      return data;
}

export async function getAllBrands() {
    let data;
    try {
        const response = await fetch(`http://127.0.0.1:8000/companies`);
        if (!response.ok) {
          throw new Error('Failed to fetch brands');
        }
        data = await response.json();
        
      } catch (error) {
        console.error('Error:', error);
      }
      return data;
}

export async function getProductById(product_id) {
  let data;
  try {
      const response = await fetch(`http://127.0.0.1:8000/products/${product_id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch product');
      }
      data = await response.json();
      
    } catch (error) {
      console.error('Error:', error);
    }
    return data;
}

export async function InsertProductIntoCart(userId, ProductId, quantity, name) {
  try {
    const response = await fetch("http://127.0.0.1:8000/cart/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: userId,
        product_id: ProductId,
        quantity: quantity,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      toast.success(`${name} added to cart successfully!`, { containerId: "other" });
      return data;
    } else {
      toast.error(`${name} added to cart failed!`, { containerId: "other" });
    }
  } catch (error) {
    console.error("Error during Product added", error);
    alert("An error occurred. Please try again later.");
  }
}

export async function InsertProductIntoWishlist(userId, productId, name) {
  try {
    const response = await fetch("http://127.0.0.1:8000/wishlist/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id: userId, product_id: productId }),
    });

    const data = await response.json();

    if (response.ok) {
      if(data.message === "Product added to wishlist successfully"){
        toast.success(`${name} added to Wishlist successfully!`, { containerId: "other" });
      }
      else if (data.message === "Already in wishlist"){
        toast.success(`${name} already in your wishlist!`, { containerId: "other" });
      }
      
    } else {
      toast.error(`${name} added to Wishlist failed!`, { containerId: "other" });
    }
  } catch (error) {
    console.error("Error during Insert product into Wishlist:", error);
    alert("An error occurred. Please try again later.");
  }
}


