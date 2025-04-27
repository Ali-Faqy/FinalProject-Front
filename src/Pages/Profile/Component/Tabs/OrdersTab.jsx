import { useState, useEffect } from "react";
import { Card, CardContent } from "../../../UI/Card.jsx";
import { Buttons } from "../../../UI/Buttons.jsx";
import { Badge } from "../../../UI/Badge.jsx";
import { CheckCircle, Truck, Clock, Calendar, ArrowRight } from "lucide-react";

export default function OrdersTab() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // هنا مكان جلب البيانات من API
    const fetchOrders = async () => {
      // Mock Data مؤقتاً
      const data = [
        {
          id: "ORD-12345",
          date: "March 15, 2023",
          status: "Delivered",
          total: "$249.99",
          items: [
            { 
              name: "Premium Tractor", 
              quantity: 1, 
              price: "$199.99", 
              image: "https://via.placeholder.com/40" 
            },
            { 
              name: "Garden Shears", 
              quantity: 2, 
              price: "$25.00", 
              image: "https://via.placeholder.com/40" 
            },
          ],
          statusColor: "text-green-500 bg-green-500/10",
          icon: CheckCircle,
        },
        {
          id: "ORD-12344",
          date: "February 28, 2023",
          status: "Shipped",
          total: "$89.99",
          items: [
            { 
              name: "Irrigation System", 
              quantity: 1, 
              price: "$89.99", 
              image: "https://via.placeholder.com/40" 
            },
          ],
          statusColor: "text-blue-500 bg-blue-500/10",
          icon: Truck,
        },
        {
          id: "ORD-12343",
          date: "February 15, 2023",
          status: "Processing",
          total: "$159.99",
          items: [
            { 
              name: "Harvesting Tool", 
              quantity: 1, 
              price: "$89.99", 
              image: "https://via.placeholder.com/40" 
            },
            { 
              name: "Farming Gloves", 
              quantity: 2, 
              price: "$35.00", 
              image: "https://via.placeholder.com/40" 
            },
          ],
          statusColor: "text-yellow-500 bg-yellow-500/10",
          icon: Clock,
        },
      ];
      setOrders(data);
    };

    fetchOrders();
  }, []);

  return (
    <Card className="border-0 shadow-md bg-white overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Recent Orders</h2>
          <Buttons
            variant="outline"
            className="bg-teal-500 hover:bg-teal-600 text-white text-xs py-1 px-2"
            >
            View All
            <ArrowRight className="ml-2 h-4 w-4" />
          </Buttons>
        </div>

        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-xl p-4 border border-gray-200 hover:border-teal-400 transition-all duration-200"
            >
              <div className="flex flex-col gap-4">
                {/* عنوان الطلب */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold">{order.id}</h3>
                      <Badge className={`${order.statusColor} flex items-center`}>
                        <order.icon className="h-4 w-4 mr-1" />
                        {order.status}
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-500 flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      {order.date}
                    </div>
                  </div>
                  <div className="text-lg font-bold text-teal-700 mt-4 md:mt-0">
                    {order.total}
                  </div>
                </div>

                {/* الخط الأول */}
                <div className="border-t border-gray-200"></div>

                {/* تفاصيل المنتجات */}
                <div className="space-y-2">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-sm text-gray-700">
                      <div className="flex items-center gap-3">
                        {/* صورة المنتج */}
                        <img src={item.image} alt={item.name} className="h-8 w-8 rounded" />
                        <div>
                          <div className="font-medium">{item.name}</div>
                          <div className="text-xs text-gray-500">Quantity: {item.quantity}</div>
                        </div>
                      </div>
                      <div className="font-semibold">{item.price}</div>
                    </div>
                  ))}
                </div>

                {/* الخط الثاني */}
                <div className="border-t border-gray-200"></div>

                {/* الأزرار الصغيرة */}
                <div className="flex gap-2 flex-wrap justify-start pt-2">
                  <Buttons
                    variant="outline"
                    size="xs"
                    className="bg-teal-500 hover:bg-teal-600 text-white text-xs py-1 px-2"
                  >
                    View Details
                  </Buttons>
                  <Buttons
                    variant="outline"
                    size="xs"
                    className="bg-teal-500 hover:bg-teal-600 text-white text-xs py-1 px-2"
                  >
                    Reorder
                  </Buttons>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
