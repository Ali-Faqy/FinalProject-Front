import { useState, useEffect } from "react";
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Package,
  Truck,
  User,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import Layout from "../UI/Layout.jsx";
import PageContainer from "../UI/PageContainer.jsx";

export default function TrackDeliveryOrder() {
  const params = useParams();

  const [delivery, setDelivery] = useState(null);
  const [loading, setLoading] = useState(true);
  const [adminMode, setAdminMode] = useState(false);
  const [newStatus, setNewStatus] = useState("");

  useEffect(() => {
    // Simulate fetching delivery data
    setTimeout(() => {
      setDelivery({
        id: params.id,
        orderId: "ORD-45782",
        customer: "John Smith",
        customerPhone: "+1 (555) 123-4567",
        customerEmail: "john.smith@example.com",
        address: "123 Main St, New York, NY 10001",
        date: "2023-04-20",
        estimatedDelivery: "2023-04-20 14:00-16:00",
        status: "In Transit",
        statusHistory: [
          { status: "Order Placed", timestamp: "2023-04-15 09:23:45", note: "Order received and confirmed" },
          { status: "Processing", timestamp: "2023-04-16 11:30:22", note: "Order being prepared for shipment" },
          { status: "Shipped", timestamp: "2023-04-18 08:15:37", note: "Order has left our warehouse" },
          { status: "In Transit", timestamp: "2023-04-19 14:45:10", note: "Order is on the way to delivery address" },
        ],
        product: "Compact Tractor X200",
        driver: {
          name: "Michael Johnson",
          phone: "+1 (555) 987-6543",
          vehicleId: "TRK-78901",
          photo: "/placeholder.svg?height=100&width=100",
        },
        currentLocation: {
          lat: 40.7128,
          lng: -74.006,
          lastUpdated: "2023-04-19 16:30:45",
          address: "Interstate 95, 10 miles from destination",
        },
        notes: "Customer requested delivery to back entrance. Gate code: 1234",
      })
      setLoading(false)
    }, 1000)
  }, [params.id])

  const getStatusStep = (status) => {
    const statuses = [
      "Order Placed",
      "Processing",
      "Shipped",
      "In Transit",
      "Out for Delivery",
      "Delivered",
    ];
    return statuses.indexOf(status);
  };

  const updateDeliveryStatus = (newStatus) => {
    setDelivery((prev) => ({
      ...prev,
      status: newStatus,
      statusHistory: [
        ...prev.statusHistory,
        {
          status: newStatus,
          timestamp: new Date()
            .toISOString()
            .replace("T", " ")
            .substring(0, 19),
          note: `Status updated to ${newStatus}`,
        },
      ],
    }));
    setNewStatus("");
  };

  if (loading) {
    return (
      <Layout adminName={localStorage.getItem("userName") || "Admin"}>
        <PageContainer title="Tracking Delivery" description="Loading delivery information...">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
            <div className="h-24 bg-gray-200 rounded mb-6"></div>
            <div className="h-64 bg-gray-200 rounded mb-6"></div>
            <div className="h-40 bg-gray-200 rounded"></div>
          </div>
        </PageContainer>
      </Layout>
    );
  }
  
  return (
    <Layout adminName={localStorage.getItem("userName") || "Admin"}>
      <PageContainer
        title={`Tracking Delivery ${delivery.id}`}
        description={`Current status: ${delivery.status}`}
        backButton={
          <Link
            to="/delivery"
            className="flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Deliveries
          </Link>
        }
      >
        {/* Admin Mode Toggle */}
        <div className="flex justify-end mb-4">
          <div className="flex items-center">
            <span className="text-sm text-gray-600 mr-2">Admin Mode</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={adminMode}
                onChange={() => setAdminMode(!adminMode)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
            </label>
          </div>
        </div>
        {/* Delivery Status */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Delivery Progress</h2>
          <div className="relative">
            <div className="absolute left-0 top-4 w-full h-1 bg-gray-200 z-0"></div>
            <div
              className="absolute left-0 top-4 h-1 bg-green-500 z-10 transition-all duration-500"
              style={{
                width: `${(getStatusStep(delivery.status) / 5) * 100}%`,
              }}
            ></div>
            <div className="relative z-20 flex justify-between">
              {["Order Placed", "Processing", "Shipped", "In Transit", "Out for Delivery", "Delivered"].map(
                (status, index) => {
                  const isCompleted = getStatusStep(delivery.status) >= index
                  const isCurrent = delivery.status === status
                  return (
                    <div key={index} className="flex flex-col items-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          isCompleted
                            ? "bg-green-500 text-white"
                            : isCurrent
                              ? "bg-green-100 border-2 border-green-500 text-green-700"
                              : "bg-gray-100 text-gray-400"
                        }`}
                      >
                        {index + 1}
                      </div>
                      <span
                        className={`text-xs mt-2 text-center ${
                          isCompleted ? "text-green-600 font-medium" : isCurrent ? "text-green-700" : "text-gray-500"
                        }`}
                      >
                        {status}
                      </span>
                    </div>
                  )
                },
              )}
            </div>
          </div>
        </div>

          {/* Admin Controls */}
          {adminMode && (
            <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Admin Controls</h3>
              <div className="flex flex-wrap gap-3">
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Select new status</option>
                  {["Delivered"].map(
                    (status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ),
                  )}
                </select>
                <button
                  onClick={() => newStatus && updateDeliveryStatus(newStatus)}
                  disabled={!newStatus}
                  className="px-4 py-2 bg-green-600 text-white rounded-md text-sm hover:bg-green-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Update Status
                </button>
              </div>
            </div>
          )}
        {/* Status History */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mt-6">
          <h2 className="text-xl font-semibold mb-4">Status History</h2>
          <div className="space-y-4">
            {delivery.statusHistory.map((item, index) => (
              <div key={index} className="flex">
                <div className="mr-4 relative">
                  <div className="w-4 h-4 rounded-full bg-green-500"></div>
                  {index < delivery.statusHistory.length - 1 && (
                    <div className="absolute top-4 bottom-0 left-2 w-0.5 -ml-px bg-green-200 h-full"></div>
                  )}
                </div>
                <div className="pb-4">
                  <div className="flex items-center">
                    <p className="font-medium">{item.status}</p>
                    <span className="mx-2 text-gray-300">•</span>
                    <p className="text-sm text-gray-500">{item.timestamp}</p>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{item.note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </PageContainer>
    </Layout>
  );
  
}
