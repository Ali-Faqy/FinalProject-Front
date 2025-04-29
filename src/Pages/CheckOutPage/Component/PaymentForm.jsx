import { Link } from "react-router-dom";
import { User, Truck, CreditCard, CheckCircle2 } from "lucide-react";

function PaymentForm() {
  const handleCheckout = async () => {
    try {
      const response = await fetch("http://localhost:8000/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product_name: "Sample Product",
          amount: 5000, // $50.00
          quantity: 1,
        }),
      });

      const data = await response.json();
      if (data.url) {
        window.location.href = data.url; // Redirect to Stripe Checkout
      } else {
        console.error("Error creating checkout session:", data.error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div className="flex flex-row justify-between items-center w-full h-[100px] ">
        <div className="flex flex-col items-center pl-[30px]">
          <div className="flex items-center justify-center h-10 w-10 bg-black rounded-2xl">
            <User className="h-6 w-6 text-white" />
          </div>
          <span className="text-sm text-black">Contact</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center h-10 w-10 bg-black rounded-2xl">
            <Truck className="h-6 w-6 text-white" />
          </div>
          <span className="text-sm text-black">Shipping</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center h-10 w-10 bg-black rounded-2xl">
            <CreditCard className="h-6 w-6 text-white" />
          </div>
          <span className="text-sm text-black">Payment</span>
        </div>
        <div className="flex flex-col items-center pr-[30px]">
          <div className="flex items-center justify-center h-10 w-10 bg-gray-200 rounded-2xl">
            <CheckCircle2 className="h-6 w-6 text-muted-foreground" />
          </div>
          <span className="text-sm text-muted-foreground">Confirm</span>
        </div>
      </div>
      <h2 className="text-2xl font-semibold m-0 pl-[30px] pt-[30px]">
        Payment Method
      </h2>
      <div className="pl-[30px] pt-[20px]">
        <button
          onClick={handleCheckout}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Proceed to Checkout
        </button>
      </div>
    </>
  );
}

export default PaymentForm;