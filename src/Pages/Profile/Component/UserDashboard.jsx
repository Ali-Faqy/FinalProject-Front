import { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "../../UI/Card.jsx";
import { Buttons } from "../../UI/Buttons.jsx";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../UI/Tabs.jsx";
import { Heart, Truck, MapPin, CreditCard, Home, Camera, Settings } from "lucide-react";
import Navication from "../../HomePage/Component/Navication.jsx";
import DashboardTab from "./Tabs/DashboardTab.jsx";
import OrdersTab from "./Tabs/OrdersTab.jsx";
import WishlistTab from "./Tabs/WishlistTab.jsx";
import AddressesTab from "./Tabs/AddressesTab.jsx";
import PaymentTab from "./Tabs/PaymentTab.jsx";
import { Link } from "react-router-dom";

export default function UserDashboard() {
  const userame = localStorage.getItem("userName");

  const [tabValue, setTabValue] = useState("dashboard");
  const [profileImage, setProfileImage] = useState(
    "https://static.vecteezy.com/system/resources/previews/024/766/959/non_2x/default-female-avatar-profile-icon-social-media-chatting-online-user-free-vector.jpg"
  );

  const refs = {
    dashboard: useRef(null),
    orders: useRef(null),
    wishlist: useRef(null),
    addresses: useRef(null),
    payment: useRef(null),
  };

  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  useEffect(() => {
    const targetRef = refs[tabValue];
    if (targetRef?.current) {
      targetRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [tabValue]);

  return (
    <>
      <Navication />

      <div className="p-8 max-w-6xl mx-auto mt-1 pl-0">
        <div className="flex items-center gap-8 mb-10 mt-8">
          <div className="relative">
            <img
              src={profileImage}
              alt="Profile"
              className="w-44 h-44 rounded-full object-cover shadow-lg"
            />
            <button
              onClick={handleButtonClick}
              className="absolute bottom-2 right-2 bg-green-600 text-white p-2 rounded-full shadow-md hover:bg-green-700 transition"
            >
              <Camera className="w-5 h-5" />
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              className="hidden"
              accept="image/*"
            />
          </div>

          <div className="flex flex-col gap-1 ml-4">
            <h1 className="text-lg font-bold text-gray-700">{userame}</h1>
            <p className="text-gray-500 text-sm">labantasnim@example.com</p>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-xs font-semibold text-green-600 bg-green-100 px-2 py-1 rounded-full">Verified</span>
              <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">Member since 2022</span>
            </div>
          </div>

          <div className="ml-auto">
          <Link to="/accountSettings">
  <Buttons className="border-teal-DEFAULT/20 text-teal-DEFAULT hover:bg-teal-DEFAULT/10 flex items-center">
    <Settings className="h-4 w-4" />
    <span className="ml-2">Account Settings</span>
  </Buttons>
</Link>

</div>



        </div>

        <Tabs value={tabValue} onValueChange={setTabValue}>
          <TabsList className="mb-8 gap-6 justify-start">
            <TabsTrigger
              value="dashboard"
              onClick={() => setTabValue("dashboard")}
              className={`text-base font-semibold ${
                tabValue === "dashboard"
                  ? "bg-green-100 text-green-700"
                  : "hover:bg-green-100 hover:text-green-700"
              }`}
            >
              <Home className="mr-2 h-4 w-4" /> Dashboard
            </TabsTrigger>

            <TabsTrigger
              value="orders"
              onClick={() => setTabValue("orders")}
              className={`text-base font-semibold ${
                tabValue === "orders"
                  ? "bg-blue-100 text-blue-700"
                  : "hover:bg-blue-100 hover:text-blue-700"
              }`}
            >
              <Truck className="mr-2 h-4 w-4" /> Orders
            </TabsTrigger>

            <TabsTrigger
              value="wishlist"
              onClick={() => setTabValue("wishlist")}
              className={`text-base font-semibold ${
                tabValue === "wishlist"
                  ? "bg-pink-100 text-pink-700"
                  : "hover:bg-pink-100 hover:text-pink-700"
              }`}
            >
              <Heart className="mr-2 h-4 w-4" /> Wishlist
            </TabsTrigger>

            <TabsTrigger
              value="addresses"
              onClick={() => setTabValue("addresses")}
              className={`text-base font-semibold ${
                tabValue === "addresses"
                  ? "bg-yellow-100 text-yellow-700"
                  : "hover:bg-yellow-100 hover:text-yellow-700"
              }`}
            >
              <MapPin className="mr-2 h-4 w-4" /> Addresses
            </TabsTrigger>

            <TabsTrigger
              value="payment"
              onClick={() => setTabValue("payment")}
              className={`text-base font-semibold ${
                tabValue === "payment"
                  ? "bg-purple-100 text-purple-700"
                  : "hover:bg-purple-100 hover:text-purple-700"
              }`}
            >
              <CreditCard className="mr-2 h-4 w-4" /> Payment
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <div ref={refs.dashboard}>
              <DashboardTab />
            </div>
          </TabsContent>

          <TabsContent value="orders">
            <div ref={refs.orders}>
              <OrdersTab />
            </div>
          </TabsContent>

          <TabsContent value="wishlist">
            <div ref={refs.wishlist}>
              <WishlistTab />
            </div>
          </TabsContent>

          <TabsContent value="addresses">
            <div ref={refs.addresses}>
              <AddressesTab />
            </div>
          </TabsContent>

          <TabsContent value="payment">
            <div ref={refs.payment}>
              <PaymentTab />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
