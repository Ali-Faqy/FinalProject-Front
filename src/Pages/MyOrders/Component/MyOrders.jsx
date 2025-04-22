import React from "react";
import Navication from "../../HomePage/Component/Navication.jsx";

function MyOrders() {
  const orders = [
    {
      id: 1,
      date: "2025-04-15",
      total: 85.5,
      trackNumber: "TRK123456789",
      status: "Shipped",
      items: [
        {
          id: 101,
          name: "Tractor Tool",
          price: 50,
          quantity: 1,
          image: "src/assets/image8.png",
        },
        {
          id: 102,
          name: "Fertilizer 25kg",
          price: 35.5,
          quantity: 1,
          image: "src/assets/image8.png",
        },
      ],
    },
    {
      id: 2,
      date: "2025-03-30",
      total: 120,
      trackNumber: "TRK987654321",
      status: "Delivered",
      items: [
        {
          id: 103,
          name: "Sprayer Machine",
          price: 120,
          quantity: 1,
          image: "src/assets/image8.png",
        },
      ],
    },
  ];

  const getStatusBadge = (status) => {
    let color = "bg-yellow-100 text-yellow-800";
    if (status === "Delivered") color = "bg-green-100 text-green-800";
    if (status === "Shipped") color = "bg-blue-100 text-blue-800";
    return (
      <span
        className={`px-3 py-1 text-sm font-medium rounded-full ${color}`}
      >
        {status}
      </span>
    );
  };

  return (
    <>
      <Navication />
      <div className="mt-[100px] p-6 max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-10 text-center text-green-700 border-b pb-4">
          My Orders
        </h1>

        {orders.map((order) => (
          <div key={order.id} className="mb-10 border rounded-xl p-6 shadow-md bg-white">
            <div className="flex flex-col md:flex-row md:justify-between mb-4">
              <div>
                <p className="font-bold text-lg text-gray-800">Order #{order.id}</p>
                <p className="text-sm text-gray-500">Placed on: {order.date}</p>
                <p className="text-sm text-gray-500">Track #: {order.trackNumber}</p>
              </div>
              <div className="flex flex-col items-start md:items-end gap-1 mt-4 md:mt-0">
                {getStatusBadge(order.status)}
                <p className="text-sm text-gray-700 font-semibold">
                  Total: ${order.total}
                </p>
              </div>
            </div>

            <div className="divide-y">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center gap-4 py-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg border"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">{item.name}</p>
                    <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-700 font-semibold">
                      ${item.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default MyOrders;
