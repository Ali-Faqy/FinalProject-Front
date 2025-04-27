import { useState, useEffect } from "react";
import { 
  Package, Heart, MapPin, CreditCard, 
  KeyRound, Home, ShoppingCart, UserPlus 
} from "lucide-react";

export default function OrdersTab() {
  const [stats, setStats] = useState([]);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const statsData = [
        { title: "Total Orders", count: 12, description: "+2 this month", icon: Package, iconColor: "text-teal-500" },
        { title: "Wishlist Items", count: 8, description: "+3 new items", icon: Heart, iconColor: "text-pink-500" },
        { title: "Saved Addresses", count: 3, description: "2 shipping, 1 billing", icon: MapPin, iconColor: "text-yellow-500" },
        { title: "Payment Methods", count: 2, description: "Visa, Mastercard", icon: CreditCard, iconColor: "text-purple-500" },
      ];

      const activitiesData = [
        { title: "Password Changed", date: "April 2, 2023 at 10:30 AM", icon: KeyRound, iconColor: "text-green-500" },
        { title: "New Address Added", date: "March 28, 2023 at 3:45 PM", icon: Home, iconColor: "text-blue-500" },
        { title: "Order Placed", date: "March 15, 2023 at 2:15 PM", icon: ShoppingCart, iconColor: "text-teal-500" },
        { title: "Account Created", date: "January 10, 2022 at 9:00 AM", icon: UserPlus, iconColor: "text-orange-500" },
      ];

      setStats(statsData);
      setActivities(activitiesData);
    };

    fetchData();
  }, []);

  return (
    <div className="w-full">
      <div className="bg-white border-0 shadow-none px-0 py-0">
        <div className="px-0 py-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 ml-0">Dashboard</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="flex flex-col bg-white rounded-md p-3 border border-gray-200"
              >
                <div className="flex items-center mb-2">
                  <stat.icon className={`h-6 w-6 mr-2 ${stat.iconColor}`} />
                  <h3 className="text-base font-semibold text-gray-800">{stat.title}</h3>
                </div>
                <div className="text-xl font-bold text-gray-800">{stat.count}</div>
                <div className="text-xs text-gray-500">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white border-0 shadow-none px-0 py-0 mt-6">
        <div className="px-0 py-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 ml-0">Recent Activity</h2>

          <div className="space-y-4">
            {activities.map((activity, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 border-b border-gray-200 pb-3 last:border-0 last:pb-0"
              >
                <div className="p-1.5 rounded-full bg-gray-100">
                  <activity.icon className={`h-5 w-5 ${activity.iconColor}`} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 text-sm">{activity.title}</h4>
                  <p className="text-xs text-gray-500">{activity.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
