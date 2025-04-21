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

export async function InsertProductIntoCart(userId, ProductId, quantity) {
  try {
    const response = await fetch("http://127.0.0.1:8000/cart/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: userId,          // ✅ Correct key
        product_id: ProductId,
        quantity: quantity,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      alert("Product added successful!");
    } else {
      alert(data.message || "Product added failed.");
    }
  } catch (error) {
    console.error("Error during Product added", error);
    alert("An error occurred. Please try again later.");
  }
}

export async function InsertProductIntoWishlist(userId, productId) {
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
      alert("Insert product into Wishlist successful!");
      console.log(data);
      return data;
    } else {
      alert(data.message || "Insert product into Wishlist failed.");
    }
  } catch (error) {
    console.error("Error during Insert product into Wishlist:", error);
    alert("An error occurred. Please try again later.");
  }
}


