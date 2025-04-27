import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import {getUserNameAndEmail, getNumberOfCartItem} from "../Code/Navication_data.js";
import {
  Tractor,
  User,
  ShoppingCart,
  LogOut,
  UserCircle,
  Settings,
  Truck,
} from "lucide-react";

function Navigation() {
  const userId = localStorage.getItem("userId");
    if (!userId) {
        <Link to="/signIn"></Link>
    }
    
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const [userData, setUserData] = useState({ userName: "", userEmail: "" });
  const [numberOfItemsCart, setNumberOfCartItem] = useState(0);

  const fetchUserData = async () => {
    try {
      const data = await getUserNameAndEmail(userId);
      const user = {
        "userName": data.user_name,
        "userEmail": data.user_email,
      };
      setUserData(user);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const fetchNumberOfCartItem = async () => {
    try {
      const data = await getNumberOfCartItem(userId);
      const cartItem = {
        "user_id": data.user_id,
        "numberOfItemsCart": data.product_count
      }
      setNumberOfCartItem(cartItem.numberOfItemsCart);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  
  
    // Fetch user data from the API
    useEffect(() => {
      fetchUserData();
      fetchNumberOfCartItem();
    }, []);
    




  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="h-[80px] w-full fixed top-0 left-0 z-[900] justify-between align-center px-[60px] shadow-md shadow-black/50 bg-white">
      <div className="flex flex-row justify-between items-center h-full">
        <div className="flex items-center gap-3">
          <div className="h-[50px] w-[50px] bg-green-600 rounded-full flex justify-center items-center">
            <Tractor className="text-white" />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-amber-600 bg-clip-text text-transparent">
            Maeadati
          </span>
        </div>
        <nav className="flex flex-row gap-12">

          <Link to="/home"><button className="text-gray-700 hover:text-green-600 transition duration-300 text-lg font-medium transition-colors">
            Home
          </button></Link>
          <Link to="/Products" state={{userId}}> <button className="text-gray-700 hover:text-green-600 transition duration-300 text-lg font-medium transition-colors">
            Products
          </button></Link>
          <Link to="/categories"><button className="text-gray-700 hover:text-green-600 transition duration-300 text-lg font-medium transition-colors">
            Category
          </button></Link>
          <Link to="/home"><button className="text-gray-700 hover:text-green-600 transition duration-300 text-lg font-medium transition-colors">
            Social Media
          </button></Link>
          <Link to="/AI"><button className="text-gray-700 hover:text-green-600 transition duration-300 text-lg font-medium transition-colors">
            Advanced Search
          </button></Link>
        </nav>
        <div className="flex flex-row gap-10 align-center items-center">
          <Link to={`/cart/${userId}`}><div className="h-[48px] w-[48px] rounded-full flex justify-center items-center relative hover:bg-green-100">
            <ShoppingCart className="h-[24px] w-[24px] text-black" />
            <div className="absolute -top-1 -right-1 bg-green-600 text-white text-xs font-bold rounded-full h-[20px] w-[20px] flex items-center justify-center">
              {numberOfItemsCart}
            </div>
          </div></Link>
          <Link to="/profile">
            <div className="h-[48px] w-[48px] rounded-full flex justify-center items-center hover:bg-green-100 cursor-pointer">
              <User className="h-[24px] w-[24px] text-black" />
            </div>
            </Link>

          </div>
        </div>
      </div>
  );
}

export default Navigation;
