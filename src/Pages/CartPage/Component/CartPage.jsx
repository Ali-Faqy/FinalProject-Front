import {Link} from 'react-router-dom';
import Navication from "../../HomePage/Component/Navication.jsx";
import HeroBackGround from "../../CategoriesPage/Component/HeroBackGround.jsx";
import CartItem from './CartItems.jsx';
import { ChevronRight, ShoppingCart } from "lucide-react";
function CartPage() {
  return (
    <div className=' h-screen w-screen overflow-x-hidden'>
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
            to={`/cart/${1}`}
            className="text-black hover:text-teal-600 transition-colors pt-[100px]"
          >
            Cart
          </Link>
        </div>
        <div className='flex flex-rwo gap-2 items-center justify-start'>
            <ShoppingCart className="h-8 w-8 text-black" />
            <h2 className="text-3xl font-bold text-black">Your Shopping Cart</h2>
        </div>
        <p className="text-[#a4a4a4] m-0 py-[30px]">
          Browse our complete collection of high-quality agricultural tools and
          equipment
        </p>
      </HeroBackGround>
      <div className='flex flex-row gap-12 items-start justify-start w-full h-[650px] pt-[50px]'>
        <CartItem />
      </div>
    </div>
  );
}
export default CartPage;