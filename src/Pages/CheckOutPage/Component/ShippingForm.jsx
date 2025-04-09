import { Link } from "react-router-dom";

import { User, Truck, CreditCard, CheckCircle2 } from "lucide-react";
  
function ShippingForm({ onContinue }) {
  
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
          <div className="flex items-center justify-center h-10 w-10 bg-gray-200 rounded-2xl">
            <CreditCard className="h-6 w-6 text-muted-foreground" />
          </div>
          <span className="text-sm text-muted-foreground">Payment</span>
        </div>
        <div className="flex flex-col items-center pr-[30px]">
          <div className="flex items-center justify-center h-10 w-10 bg-gray-200 rounded-2xl">
            <CheckCircle2 className="h-6 w-6 text-muted-foreground" />
          </div>
          <span className="text-sm text-muted-foreground">Confirm</span>
        </div>
      </div>
      <h2 className="text-2xl font-semibold m-0 pl-[30px] pt-[30px]">
        Shipping Information
      </h2>
      <form className="flex flex-col gap-2 pl-[30px] pt-[20px]">
        <label className="text-black font-semibold">Full Name</label>
        <input
          type="text"
          placeholder="Ali Faqy"
          className="w-[90%] h-[50px] border-2 rounded-md border-gray-300 focus:outline-none focus:border-black pl-2"
        />
      </form>
      <form className="flex flex-col gap-2 pl-[30px] pt-[20px]">
        <label className="text-black font-semibold">Street Address</label>
        <input
          type="text"
          placeholder="13 Main St"
          className="w-[90%] h-[50px] border-2 rounded-md border-gray-300 focus:outline-none focus:border-black pl-2"
        />
      </form>
      <div className="flex flex-row justify-start items-center">
        <form className="flex flex-col gap-2 pl-[30px] pt-[20px]">
          <label className="text-black font-semibold">Street Address</label>
          <input
            type="text"
            placeholder="Ramallah"
            className="w-[100%] h-[50px] border-2 rounded-md border-gray-300 focus:outline-none focus:border-black pl-2"
          />
        </form>
        <form className="flex flex-col gap-2 pl-[30px] pt-[20px]">
          <label className="text-black font-semibold">State/Province</label>
          <input
            type="text"
            placeholder="Ramallah"
            className="w-[100%] h-[50px] border-2 rounded-md border-gray-300 focus:outline-none focus:border-black pl-2"
          />
        </form>
        <form className="flex flex-col gap-2 pl-[30px] pt-[20px]">
          <label className="text-black font-semibold">ZIP/Postal Code</label>
          <input
            type="text"
            placeholder="75801"
            className="w-[100%] h-[50px] border-2 rounded-md border-gray-300 focus:outline-none focus:border-black pl-2"
          />
        </form>
      </div>
      <form className="flex flex-col gap-2 pl-[30px] pt-[20px]">
        <label className="text-black font-semibold">Country</label>
        <select
          className="w-[90%] h-[50px] border-2 rounded-md border-gray-300 focus:outline-none focus:border-black pl-2"
          defaultValue=""
        >
          <option value="" disabled>
            Select a Country
          </option>
          <option value="us">United States</option>
          <option value="ca">Canada</option>
          <option value="uk">United Kingdom</option>
          <option value="au">Australia</option>
          <option value="de">Germany</option>
          <option value="fr">France</option>
        </select>
      </form>

      <div className="flex flex-row justify-between mt-10 ml-[30px] mr-[30px] mb-2">
        <button className="border-2 rounded-md w-[100px] h-[50px] font-semibold hover:bg-muted-foreground">
          Back
        </button>
        <button
          className="rounded-md w-[100px] h-[50px] font-semibold bg-black text-white hover:text-black hover:bg-white hover:border-2"
          onClick={onContinue}
        >
          Continue
        </button>
      </div>
    </>
  );
}

export default ShippingForm;
