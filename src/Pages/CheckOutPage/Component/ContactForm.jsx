import { Link } from "react-router-dom";
import { User, Truck, CreditCard, CheckCircle2 } from "lucide-react";

function ContactForm({onContinue}) {
    const { user_id } = 1;
    return(
        <>
        <div className="flex flex-row justify-between items-center w-full h-[100px] ">
            <div className="flex flex-col items-center pl-5">
              <div className="flex items-center justify-center h-10 w-10 bg-black rounded-2xl">
                <User className="h-6 w-6 text-white" />
              </div>
              <span className="text-sm text-black">Contact</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center h-10 w-10 bg-gray-200 rounded-2xl">
                <Truck className="h-6 w-6 text-muted-foreground" />
              </div>
              <span className="text-sm text-muted-foreground">Payment</span>
            </div>
            <div className="flex flex-col items-center pr-5">
              <div className="flex items-center justify-center h-10 w-10 bg-gray-200 rounded-2xl">
                <CreditCard className="h-6 w-6 text-muted-foreground" />
              </div>
              <span className="text-sm text-muted-foreground">Shipping</span>
            </div>
          </div>
          <h2 className="text-2xl font-semibold m-0 pl-[30px] pt-[30px]">
            Contact Information
          </h2>
          <form className="flex flex-col gap-2 pl-[30px] pt-[20px]">
            <label className="text-black font-semibold">
              Email Address
            </label>
            <input
              type="email"
              placeholder="email@gmail.com"
              className="w-[90%] h-[50px] border-2 rounded-md border-gray-300 focus:outline-none focus:border-black pl-2"
            />
          </form>
          <form className="flex flex-col gap-2 pl-[30px] pt-[20px]">
            <label className="text-black font-semibold">
              Phone Number
            </label>
            <input
              type="email"
              placeholder="+972-592126817"
              className="w-[90%] h-[50px] border-2 rounded-md border-gray-300 focus:outline-none focus:border-black pl-2"
            />
          </form>
          <div className="flex flex-row justify-between mt-10 ml-[30px] mr-[30px] mb-2">
            <Link to={`/cart/${user_id}`}><button className="border-2 rounded-md w-[100px] h-[50px] font-semibold hover:bg-muted-foreground">
              Back
            </button></Link>
            <button className="rounded-md w-[100px] h-[50px] font-semibold bg-black text-white hover:text-black hover:bg-white hover:border-2"
            onClick={onContinue}>
              Continue
            </button>
          </div>
        </>
    );
}
export default ContactForm;
