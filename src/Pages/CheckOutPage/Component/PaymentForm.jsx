import { Link } from "react-router-dom";
import { User, Truck, CreditCard, CheckCircle2 } from "lucide-react";

function PaymentForm({ onContinue, cart }) {
  const handleCheckout = async () => {
    try {
      const response = await fetch("http://localhost:8000/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cart }),
      });
  
      const data = await response.json();
      console.log("Checkout session:", data);
      // maybe redirect user to checkout page, e.g.:
      // window.location.href = data.url;
  
    } catch (err) {
      console.error("Checkout failed:", err);
    }
  };
  

  return (
    <>
      <div className="flex flex-row justify-between items-center w-full h-[100px] ">
            <div className="flex flex-col items-center pl-5">
              <div className="flex items-center justify-center h-10 w-10 bg-black rounded-2xl">
                <User className="h-6 w-6 text-white" />
              </div>
              <span className="text-sm text-black">Contact</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center h-10 w-10 bg-black rounded-2xl">
                <CreditCard className="h-6 w-6 text-white" />
              </div>
              <span className="text-sm text-black">Payment</span>
            </div>
            <div className="flex flex-col items-center pr-5">
              <div className="flex items-center justify-center h-10 w-10 bg-gray-200 rounded-2xl">
                <Truck className="h-6 w-6 text-muted-foreground" />
              </div>
              <span className="text-sm text-muted-foreground">Shipping</span>
            </div>
          </div>
      <h2 className="text-2xl font-semibold m-0 pl-[30px] pt-[30px]">
        Payment Method
      </h2>
      <div className="flex flex-row justify-between mt-10 ml-[30px] mr-[30px] mb-2">
      <div className="pl-[30px] pt-[20px]">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => onContinue("contact")}
        >
          Back
        </button>
      </div>
      <div className="pl-[30px] pt-[20px]">
        <button
          onClick={handleCheckout}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Visa Card, Master Card, Pay Pal
        </button>
      </div>
      <div className="pl-[30px] pt-[20px]">
        <button
        onClick={onContinue}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          On delivered
        </button>
      </div>
      </div>
      
    </>
  );
}

export default PaymentForm;