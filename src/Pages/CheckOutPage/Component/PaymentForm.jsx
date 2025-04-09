import { Link } from "react-router-dom";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { User, Truck, CreditCard, CheckCircle2 } from "lucide-react";

function PaymentForm(){
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
        </>
      );
}
export default PaymentForm;