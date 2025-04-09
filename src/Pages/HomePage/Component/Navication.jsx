import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
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
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  let numberOfItemsCart = 3;
  let userName = "Ali Othman";
  let userEmail = "AliFaqy@gmail.com";
  let userId = 1;
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
          <Link to="/Products"> <button className="text-gray-700 hover:text-green-600 transition duration-300 text-lg font-medium transition-colors">
            Products
          </button></Link>
          <Link to="/categories"><button className="text-gray-700 hover:text-green-600 transition duration-300 text-lg font-medium transition-colors">
            Category
          </button></Link>
          <Link to="/home"><button className="text-gray-700 hover:text-green-600 transition duration-300 text-lg font-medium transition-colors">
            Social Media
          </button></Link>
          <Link to="/home"><button className="text-gray-700 hover:text-green-600 transition duration-300 text-lg font-medium transition-colors">
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
          <div className="relative" ref={dropdownRef}>
            <div
              className="h-[48px] w-[48px] rounded-full flex justify-center items-center hover:bg-green-100 cursor-pointer"
              onClick={() => {
                setIsOpen(!isOpen);
              }}
            >
              <User className="h-[24px] w-[24px] text-black" />
            </div>

            {isOpen && (
              <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-[999]">
                <div
                  className="py-1"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  <div className="flex flex-col gap-2 items-start justify-start px-4 py-2 border-b">
                    <span className='text-sm font-medium text-gray-900"'>
                      {userName}
                    </span>
                    <span className="text-xs text-gray-500 truncate">
                      {userEmail}
                    </span>
                  </div>

                  <Link
                    to="/"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <UserCircle className="mr-3 h-5 w-5 text-gray-500" />
                    My Profile
                  </Link>

                  <Link
                    to="/"
                    href="#"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <Truck className="mr-3 h-5 w-5 text-gray-500" />
                    My Orders
                  </Link>

                  <Link
                    to="/"
                    href="#"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <Settings className="mr-3 h-5 w-5 text-gray-500" />
                    Settings
                  </Link>

                  <div className="border-t-2"></div>

                  <Link
                    to="/"
                    href="#"
                    className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    <LogOut className="mr-3 h-5 w-5 text-red-500" />
                    Sign out
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navigation;
