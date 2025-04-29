import { useState } from "react";
import { Link } from "react-router-dom";
import { useParams, useLocation } from "react-router-dom";
import Navication from "../../HomePage/Component/Navication.jsx";
import HeroBackGround from "../../CategoriesPage/Component/HeroBackGround.jsx";
import ContactForm from "./ContactForm.jsx";
import ShippingForm from "./ShippingForm.jsx"
import PaymentForm from "./PaymentForm.jsx";
import {
  ChevronRight,
  CreditCard,
} from "lucide-react";
import CartSummary from "./CartSummary.jsx";
function CheckOutPage() {
  const { userId } = useParams();
  const location = useLocation();
  const [step, setStep] = useState("contact");
  const renderStepForm = () => {
    switch (step) {
      case "contact":
        return <ContactForm onContinue={() => setStep("shipping")} />;
      case "shipping":
        return <ShippingForm onContinue={() => setStep("payment")} />;
      case "payment":
        return <PaymentForm onContinue={() => setStep("confirm")} />;
      default:
        return null;
    }
  };
  const { cart, total } = location.state || { cart: [], total: 0 };


  return (
    <div className=" h-screen w-screen overflow-x-hidden">
      <Navication />
      <HeroBackGround>
        <div className="mb-6 flex items-center">
          <Link
            to="/home"
            className="text-[#a4a4a4] hover:text-teal-600 transition-colors pt-[100px]"
          >
            Home
          </Link>
          <ChevronRight className="text-[#a4a4a4] mx-2 h-4 w-4 mt-[100px]" />
          <Link
            to={`/cart/${userId}`}
            className="text-[#a4a4a4] hover:text-teal-600 transition-colors pt-[100px]"
          >
            Cart
          </Link>
          <ChevronRight className="text-[#a4a4a4] mx-2 h-4 w-4 mt-[100px]" />
          <Link
            to={`/checkout/${userId}`}
            className="text-black hover:text-teal-600 transition-colors pt-[100px]"
          >
            Checkout
          </Link>
        </div>
        <div className="flex flex-rwo gap-2 items-center justify-start">
          <CreditCard className="h-8 w-8 text-black" />
          <h2 className="text-3xl font-bold text-black">Checkout Order</h2>
        </div>
        <p className="text-[#a4a4a4] m-0 py-[30px]">
          Browse our complete collection of high-quality agricultural tools and
          equipment
        </p>
      </HeroBackGround>
      <div className="flex flex-row gap-12 items-start justify-start w-full h-[650px] pt-[50px]">
        <div className="flex flex-col w-[60%] bg-white rounded-lg border-2 shadow-sm ml-[50px] overflow-auto">
        {renderStepForm()}
        </div>
        {/*Cart item*/}
        <div className="flex flex-col border-2 w-[30%] h-[80%] bg-white rounded-lg border shadow-sm gap-4">
        <CartSummary cart={cart} total={total} />
        </div>
      </div>
    </div>
  );
}
export default CheckOutPage;
