import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Separtor } from "../../UI/Separtor.jsx";
import image10 from "../../../assets/image10.png";
import EmptyCart from "./EmptyCart.jsx";
import {getAllProductInCart} from "../Data/getAllProductInCart.js";

function CartItems() {
  const { userId } = useParams();
  const [items, setItems] = useState([]);




  const fetchProducts = async () => {
      const data = await getAllProductInCart(2);
      if (data) {
        const updatedItems = data.map((item) => ({
          id: item.id,
          name: item.name,
          brand: item.brand,
          price: item.price,
          image: item.image[0],
          quantity: item.quantity,
          quantityAvailable: item.quantityAvailable,
          discount: item.discount,
        }));
        
        setItems(updatedItems);
      }
    };
    useEffect(() => {
        fetchProducts();
      }, []);


  const increaseQuantity = (id) => {
    setItems((prevItems) => {
      return prevItems.map((item) => {
        if (item.id === id) {
          if (item.quantity < item.quantityAvailable) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            alert("Maximum quantity available in this product is " + item.quantityAvailable);
          }
        }
        return item;
      });
    });
  };
  
  

  const decreaseQuantity = (id) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const subtotal = items.reduce((acc, item) => {
    const discountedPrice = item.discount > 0
      ? item.price * (1 - item.discount / 100)
      : item.price;
    return acc + discountedPrice * item.quantity;
  }, 0);
  
  const shippingEstimate = 20; // Static shipping estimate for now
  const taxEstimate = subtotal * 0.1; // Example: 10% tax

  const total = subtotal + shippingEstimate + taxEstimate;

  // Function to print the current state of items
  const print = () => {
    console.log(items); // Log the updated state (items array)
  };

  return (
    <>
      <div className="flex flex-col w-[60%] h-[95%] bg-white rounded-lg border-2 shadow-sm ml-[50px] overflow-auto">
        <h2 className="text-xl font-semibold pl-[16px] pt-[25px]">
          Cart Items
        </h2>
        {items.length === 0 ? (
          <EmptyCart />
        ) : (
          items.map((item) => (
            <div key={item.id}>
              <div className="flex flex-row justify-between w-[95%] h-[150px] items-center ml-5 mt-5">
                <div className="flex flex-row justify-start items-start gap-2">
                  <img
                    src={item.image === "" ? image10 : item.image}
                    className="w-[120px] h-[120px] rounded-lg ml-[16px]"
                  />
                  <div className="flex flex-col justify-start items-start gap-2 h-[120px] pl-[5px]">
                    <h3 className="text-lg font-semibold color-black m-0">
                      {item.name}
                    </h3>
                    <p className="m-0 text-sm text-muted-foreground">
                      {item.brand}
                    </p>
                    <div className="flex items-center justify-center border rounded-md h-10 mt-[15px]">
                      <button
                        onClick={() => decreaseQuantity(item.id)}
                        className="h-10 w-8 flex items-center justify-center rounded-none rounded-l-md"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-10 text-center text-sm">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => increaseQuantity(item.id)}
                        className="h-10 w-8 flex items-center justify-center rounded-none rounded-r-md"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-[50px] h-[120px] mr-5 items-center justify-center w-[100px]">
                  <div>
                    {item.discount > 0 ? (
                      <div className="flex items-center gap-2">
                        <p className="font-bold text-lg text-teal-600">
                          $
                          {(
                            item.price *
                            (1 - item.discount / 100) *
                            item.quantity
                          ).toFixed(2)}
                        </p>
                        <p className="text-sm text-[#a4a4a4] line-through">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    ) : (
                      <p className="font-bold text-lg text-teal-600">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    )}
                  </div>

                  <div
                    onClick={() => removeItem(item.id)}
                    className="flex flex-row items-center justify-center gap-1 group hover:cursor-pointer hover:bg-red-100 rounded-md"
                  >
                    <Trash2 className="h-4 w-4 text-red-600" />
                    <span className="text-sm text-red-600">Remove</span>
                  </div>
                </div>
              </div>
              <Separtor className="w-[90%] h-[1px] mt-5 ml-12" />
            </div>
          ))
        )}
      </div>

      <div className="flex flex-col border-2 w-[30%] h-[60%] bg-white rounded-lg border shadow-sm gap-4">
        <h2 className="text-xl font-semibold pl-[16px] pt-[25px]">
          Order Summary
        </h2>
        <div className="flex flex-row justify-between pl-[16px] pr-[16px]">
          <p className="text-l text-muted-foreground m-0">Subtotal</p>
          <p className="text-l text-muted-foreground m-0">${subtotal}</p>
        </div>
        <div className="flex flex-row justify-between pl-[16px] pr-[16px]">
          <p className="text-l text-muted-foreground m-0">Shipping estimate</p>
          <p className="text-l text-muted-foreground m-0">
            ${shippingEstimate}
          </p>
        </div>
        <div className="flex flex-row justify-between pl-[16px] pr-[16px]">
          <p className="text-l text-muted-foreground m-0">Tax estimate</p>
          <p className="text-l text-muted-foreground m-0">
            ${taxEstimate.toFixed(2)}
          </p>
        </div>
        <Separtor className="w-[90%] h-[2px] ml-[20px]" />
        <div className="flex flex-row justify-between pl-[16px] pr-[16px]">
          <p className="text-l text-black font-semibold m-0">Order total</p>
          <p className="text-l text-black font-semibold m-0">
            ${total.toFixed(2)}
          </p>
        </div>
        <Link to={`/checkout/${userId}`}
        state={{ cart: items, total }}>
          <button
            className="bg-black text-white rounded-md h-[50px] w-[90%] ml-[20px] hover:bg-muted-foreground transition-colors"
            onClick={print}
          >
            Proceed to Checkout
          </button>
        </Link>
        <p className="text-center text-sm text-muted-foreground m-0">
          Secure checkout powered by Stripe
        </p>
      </div>
    </>
  );
}

export default CartItems;
