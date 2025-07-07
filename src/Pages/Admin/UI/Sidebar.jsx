import { useState } from "react";
import { Link, useLocation } from "react-router-dom"; // Correctly import Link and useLocation
import {
  BarChart3,
  ChevronRight,
  ClipboardList,
  LayoutDashboard,
  Package,
  Settings,
  ShoppingCart,
  Sparkles,
  Tractor,
  TrendingUp,
  Truck,
  Users,
  MessageSquare,
} from "lucide-react";

export default function Sidebar({ currentColorTheme, theme, isLoaded }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [hoverStates, setHoverStates] = useState({});
  const pathname = useLocation();

  const setHoverState = (key, state) => {
    setHoverStates((prev) => ({ ...prev, [key]: state }));
  };

  const isActive = (path) => {
    return pathname === path;
  };

  return (
    <div
      className={`${
        isSidebarOpen ? "w-64" : "w-20"
      } bg-white border-r border-gray-200 transition-all duration-500 ease-in-out flex flex-col relative z-10`}
    >
      {/* Logo */}
      <div className={`flex items-center p-4 border-b ${theme.border} relative overflow-hidden`}>
        <div className={`absolute inset-0 opacity-10 ${theme.primary}`}></div>
          <Tractor
            className={`h-8 w-8 ${theme.accent} transition-all duration-700 ${isLoaded ? "rotate-0 scale-100" : "-rotate-90 scale-0"} cursor-pointer`}
          />
          <span
            className={`ml-2 font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-600 ${
              isSidebarOpen ? "opacity-100" : "opacity-0 w-0"
            } transition-all duration-500 cursor-pointer`}
          >
            AgriTech
          </span>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="ml-auto text-gray-500 hover:text-gray-700 transition-colors duration-300 hover:rotate-180"
        >
          <ChevronRight
            className={`h-5 w-5 transition-transform duration-500 ${
              isSidebarOpen ? "" : "rotate-180"
            }`}
          />
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto py-4 relative">
        <div className="absolute inset-0 pointer-events-none z-10"></div>
        <div className="px-4 space-y-2 relative z-0">
          {/* Main Navigation */}
          <div
            className={`text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 ${isSidebarOpen ? "opacity-100" : "opacity-0"} transition-opacity duration-300`}
          >
            Main
          </div>

          <Link to="/admin">
            <div
              className={`transform transition-transform duration-700 ${isLoaded ? "translate-x-0" : "-translate-x-10"} delay-100`}
              onMouseEnter={() => setHoverState("dashboard", true)}
              onMouseLeave={() => setHoverState("dashboard", false)}
            >
              <div
                className={`flex items-center px-4 py-2 rounded-lg transition-all duration-300 relative overflow-hidden cursor-pointer ${
                  isActive("/") ? `text-white ${theme.primary}` : "text-gray-700 hover:bg-gray-100"
                } ${hoverStates["dashboard"] ? "shadow-md" : ""}`}
              >
                <LayoutDashboard
                  className={`h-5 w-5 ${isActive("/") ? "text-white" : theme.accent} relative z-10 ${hoverStates["dashboard"] ? "animate-pulse" : ""}`}
                />
                <span
                  className={`ml-3 relative z-10 ${isSidebarOpen ? "opacity-100" : "opacity-0 w-0"} transition-all duration-300`}
                >
                  Dashboard
                </span>
                {hoverStates["dashboard"] && (
                  <Sparkles className="h-3 w-3 text-yellow-400 absolute right-2 animate-ping" />
                )}
              </div>
            </div>
          </Link>

          <Link to="/tools">
            <div
              className={`transform transition-transform duration-700 ${isLoaded ? "translate-x-0" : "-translate-x-10"} delay-150`}
              onMouseEnter={() => setHoverState("products", true)}
              onMouseLeave={() => setHoverState("products", false)}
            >
              <div
                className={`flex items-center px-4 py-2 rounded-lg transition-all duration-300 relative overflow-hidden cursor-pointer ${
                  isActive("/products") ? `text-white ${theme.primary}` : "text-gray-600 hover:bg-gray-100"
                } ${hoverStates["products"] ? "shadow-md" : ""}`}
              >
                <Package
                  className={`h-5 w-5 ${isActive("/products") ? "text-white" : "text-gray-500"} transition-transform duration-300 ${hoverStates["products"] ? "rotate-12" : ""}`}
                />
                <span className={`ml-3 ${isSidebarOpen ? "opacity-100" : "opacity-0 w-0"} transition-all duration-300`}>
                  Products
                </span>
              </div>
            </div>
          </Link>

          <Link to="/admin/orders">
            <div
              className={`transform transition-transform duration-700 ${isLoaded ? "translate-x-0" : "-translate-x-10"} delay-200`}
              onMouseEnter={() => setHoverState("orders", true)}
              onMouseLeave={() => setHoverState("orders", false)}
            >
              <div
                className={`flex items-center px-4 py-2 rounded-lg transition-all duration-300 relative overflow-hidden cursor-pointer ${
                  isActive("/orders") ? `text-white ${theme.primary}` : "text-gray-600 hover:bg-gray-100"
                } ${hoverStates["orders"] ? "shadow-md" : ""}`}
              >
                <ShoppingCart
                  className={`h-5 w-5 ${isActive("/orders") ? "text-white" : "text-gray-500"} transition-transform duration-300 ${hoverStates["orders"] ? "scale-110" : ""}`}
                />
                <span className={`ml-3 ${isSidebarOpen ? "opacity-100" : "opacity-0 w-0"} transition-all duration-300`}>
                  Orders
                </span>
              </div>
            </div>
          </Link>

          <Link to="/customers">
            <div
              className={`transform transition-transform duration-700 ${isLoaded ? "translate-x-0" : "-translate-x-10"} delay-250`}
              onMouseEnter={() => setHoverState("customers", true)}
              onMouseLeave={() => setHoverState("customers", false)}
            >
              <div
                className={`flex items-center px-4 py-2 rounded-lg transition-all duration-300 relative overflow-hidden cursor-pointer ${
                  isActive("/customers") ? `text-white ${theme.primary}` : "text-gray-600 hover:bg-gray-100"
                } ${hoverStates["customers"] ? "shadow-md" : ""}`}
              >
                <Users
                  className={`h-5 w-5 ${isActive("/customers") ? "text-white" : "text-gray-500"} transition-transform duration-300 ${hoverStates["customers"] ? "scale-110" : ""}`}
                />
                <span className={`ml-3 ${isSidebarOpen ? "opacity-100" : "opacity-0 w-0"} transition-all duration-300`}>
                  Customers
                </span>
              </div>
            </div>
          </Link>

          <Link to="/delivery">
            <div
              className={`transform transition-transform duration-700 ${isLoaded ? "translate-x-0" : "-translate-x-10"} delay-300`}
              onMouseEnter={() => setHoverState("delivery", true)}
              onMouseLeave={() => setHoverState("delivery", false)}
            >
              <div
                className={`flex items-center px-4 py-2 rounded-lg transition-all duration-300 relative overflow-hidden cursor-pointer ${
                  isActive("/delivery") ? `text-white ${theme.primary}` : "text-gray-600 hover:bg-gray-100"
                } ${hoverStates["delivery"] ? "shadow-md" : ""}`}
              >
                <Truck
                  className={`h-5 w-5 ${isActive("/delivery") ? "text-white" : "text-gray-500"} transition-transform duration-300 ${hoverStates["delivery"] ? "translate-x-1" : ""}`}
                />
                <span className={`ml-3 ${isSidebarOpen ? "opacity-100" : "opacity-0 w-0"} transition-all duration-300`}>
                  Delivery
                </span>
              </div>
            </div>
          </Link>

          {/* Reports Navigation */}
          <div
            className={`text-xs font-semibold text-gray-400 uppercase tracking-wider mt-6 mb-2 ${isSidebarOpen ? "opacity-100" : "opacity-0"} transition-opacity duration-300`}
          >
            Reports
          </div>

          <Link to="/analytics">
            <div
              className={`transform transition-transform duration-700 ${isLoaded ? "translate-x-0" : "-translate-x-10"} delay-350`}
              onMouseEnter={() => setHoverState("analytics", true)}
              onMouseLeave={() => setHoverState("analytics", false)}
            >
              <div
                className={`flex items-center px-4 py-2 rounded-lg transition-all duration-300 relative overflow-hidden cursor-pointer ${
                  isActive("/analytics") ? `text-white ${theme.primary}` : "text-gray-600 hover:bg-gray-100"
                } ${hoverStates["analytics"] ? "shadow-md" : ""}`}
              >
                <BarChart3
                  className={`h-5 w-5 ${isActive("/analytics") ? "text-white" : "text-gray-500"} transition-transform duration-300 ${hoverStates["analytics"] ? "scale-110" : ""}`}
                />
                <span className={`ml-3 ${isSidebarOpen ? "opacity-100" : "opacity-0 w-0"} transition-all duration-300`}>
                  Analytics
                </span>
              </div>
            </div>
          </Link>

          <Link to="/socialMedia">
            <div
              className={`transform transition-transform duration-700 ${isLoaded ? "translate-x-0" : "-translate-x-10"} delay-400`}
              onMouseEnter={() => setHoverState("socialMedia", true)}
              onMouseLeave={() => setHoverState("socialMedia", false)}
            >
              <div
                className={`flex items-center px-4 py-2 rounded-lg transition-all duration-300 relative overflow-hidden cursor-pointer ${
                  isActive("/socialMedia") ? `text-white ${theme.primary}` : "text-gray-600 hover:bg-gray-100"
                } ${hoverStates["socialMedia"] ? "shadow-md" : ""}`}
              >
                <MessageSquare
                  className={`h-5 w-5 ${isActive("/socialMedia") ? "text-white" : "text-gray-500"} transition-transform duration-300 ${hoverStates["socialMedia"] ? "translate-y-[-2px]" : ""}`}
                />
                <span className={`ml-3 ${isSidebarOpen ? "opacity-100" : "opacity-0 w-0"} transition-all duration-300`}>
                  Social Media
                </span>
              </div>
            </div>
          </Link>

          <Link to="/inventory">
            <div
              className={`transform transition-transform duration-700 ${isLoaded ? "translate-x-0" : "-translate-x-10"} delay-450`}
              onMouseEnter={() => setHoverState("inventory", true)}
              onMouseLeave={() => setHoverState("inventory", false)}
            >
              <div
                className={`flex items-center px-4 py-2 rounded-lg transition-all duration-300 relative overflow-hidden cursor-pointer ${
                  isActive("/inventory") ? `text-white ${theme.primary}` : "text-gray-600 hover:bg-gray-100"
                } ${hoverStates["inventory"] ? "shadow-md" : ""}`}
              >
                <ClipboardList
                  className={`h-5 w-5 ${isActive("/inventory") ? "text-white" : "text-gray-500"} transition-transform duration-300 ${hoverStates["inventory"] ? "rotate-6" : ""}`}
                />
                <span className={`ml-3 ${isSidebarOpen ? "opacity-100" : "opacity-0 w-0"} transition-all duration-300`}>
                  Inventory
                </span>
              </div>
            </div>
          </Link>

          {/* Settings Navigation */}
          <div
            className={`text-xs font-semibold text-gray-400 uppercase tracking-wider mt-6 mb-2 ${isSidebarOpen ? "opacity-100" : "opacity-0"} transition-opacity duration-300`}
          >
            Settings
          </div>

          <Link to="/settings">
            <div
              className={`transform transition-transform duration-700 ${isLoaded ? "translate-x-0" : "-translate-x-10"} delay-500`}
              onMouseEnter={() => setHoverState("settings", true)}
              onMouseLeave={() => setHoverState("settings", false)}
            >
              <div
                className={`flex items-center px-4 py-2 rounded-lg transition-all duration-300 relative overflow-hidden cursor-pointer ${
                  isActive("/settings") ? `text-white ${theme.primary}` : "text-gray-600 hover:bg-gray-100"
                } ${hoverStates["settings"] ? "shadow-md" : ""}`}
              >
                <Settings
                  className={`h-5 w-5 ${isActive("/settings") ? "text-white" : "text-gray-500"} transition-transform duration-300 ${hoverStates["settings"] ? "rotate-45" : ""}`}
                />
                <span className={`ml-3 ${isSidebarOpen ? "opacity-100" : "opacity-0 w-0"} transition-all duration-300`}>
                  Settings
                </span>
              </div>
            </div>
          </Link>
        </div>
      </nav>
    </div>
  );
}
