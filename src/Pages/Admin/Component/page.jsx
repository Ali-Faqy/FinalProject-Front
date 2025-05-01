import { useRef, useEffect, useState } from "react";
import React from "react";
import { Link } from "react-router-dom";
import {
  CircleDollarSign,
  Package,
  ShoppingCart,
  Tractor,
  TrendingUp,
  TrendingDown,
  Users,
} from "lucide-react";
import Layout from "../UI/Layout";
import PageContainer from "../UI/PageContainer";
import { useTheme } from "../UI/theme-provider";
import Image from "/src/assets/image10.png";
import { getTotalRevenue, getTotalOrders, getTotalProductBuying } from "../Data/DashboardData.js";
export default function Dashboard() {
  const chartRef = useRef(null);
  const theme = useTheme();
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalRevenueChange, setTotalRevenueChange] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [totalOrdersChange, setTotalOrdersChange] = useState(0);
  const [totalProductsChange, setTotalProductsChange] = useState(0);
  const [totalCustomersChange, setTotalCustomersChange] = useState(0);


  //   const adminId = localStorage.getItem("userId");
  //     if (!adminId) {
  //         <Link to="/signIn"></Link>
  //     }

  const adminName = "Ali Othman";
  // Animate chart on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const chartBars = entry.target.querySelectorAll(".chart-bar");
            chartBars.forEach((bar, index) => {
              setTimeout(() => {
                bar.style.height = bar.dataset.height || "0%";
              }, index * 100);
            });
          }
        });
      },
      { threshold: 0.5 }
    );

    if (chartRef.current) {
      observer.observe(chartRef.current);
    }

    return () => {
      if (chartRef.current) {
        observer.unobserve(chartRef.current);
      }
    };
  }, []);

  const fetchRevenue = async () => {
    const response = await getTotalRevenue();
    if (response) {
      const current = parseInt(response[0].total_revenue);
      const previous = parseInt(response[1].total_revenue);
      setTotalRevenue(current);
      setTotalRevenueChange(
        ((current - previous) / previous) * 100
      );
    }
  };
    const fetchTotalOrders = async () => {
      const response = await getTotalOrders();
      console.log(response);
      if (response) {
        const current = parseInt(response[0].total_orders);
        const previous = parseInt(response[1].total_orders);
        setTotalOrders(current);
        setTotalOrdersChange(
          ((current - previous) / previous) * 100
        );
      }
  };
  const fetchTotalProductBuying = async () => {
    const response = await getTotalProductBuying();
    console.log(response);
    if (response) {
      const current = parseInt(response[0].total_products_bought);
      const previous = parseInt(response[1].total_products_bought);
      setTotalProducts(current);
      setTotalProductsChange(
        ((current - previous) / previous) * 100
      );
    }
};

  
  useEffect(() => {
    fetchRevenue();
    fetchTotalOrders();
    fetchTotalProductBuying();
  }, []);


  const orders = [
    {
      order_id: 45782,
      order_status: "Shipped",
      total_price: 24500,
      user_name: "Ali Othman",
    },
    {
      order_id: 45781,
      order_status: "Processing",
      total_price: 175000,
      user_name: "Amer Daglies",
    },
    {
      order_id: 45780,
      order_status: "Delivered",
      total_price: 8750,
      user_name: "Tasnim Ayed",
    },
  ];

  const topSellingProducts = [
    {
      id: 1,
      name: "Compact Tractor X200",
      category: "Tractors",
      price: 24500,
      stock: 15,
      sales: 124,
    },
    {
      id: 2,
      name: "Harvester Pro 5000",
      category: "Harvesters",
      price: 175000,
      stock: 8,
      sales: 42,
    },
    {
      id: 3,
      name: "Irrigation System",
      category: "Irrigation",
      price: 8750,
      stock: 32,
      sales: 87,
    },
    {
      id: 4,
      name: "Tractor X100",
      category: "Tractors",
      price: 15000,
      stock: 20,
      sales: 200,
    },
    {
      id: 5,
      name: "Seeder Pro 3000",
      category: "Seeders",
      price: 5000,
      stock: 50,
      sales: 300,
    },
    {
      id: 6,
      name: "Plow Master 400",
      category: "Plows",
      price: 12000,
      stock: 10,
      sales: 150,
    },
    {
      id: 7,
      name: "Fertilizer Spreader",
      category: "Fertilizers",
      price: 3000,
      stock: 25,
      sales: 180,
    },
    {
      id: 8,
      name: "Cultivator X500",
      category: "Cultivators",
      price: 8000,
      stock: 12,
      sales: 90,
    },
    {
      id: 9,
      name: "Irrigation Pump",
      category: "Irrigation",
      price: 2000,
      stock: 40,
      sales: 250,
    },
    {
      id: 10,
      name: "Harvesting Machine",
      category: "Harvesters",
      price: 50000,
      stock: 5,
      sales: 60,
    },
  ];

  return (
    <Layout adminName={adminName}>
      <PageContainer
        title="Dashboard"
        description="Welcome back, here's what's happening with your agricultural equipment store today."
      >
        {/* Stats Cards with animations */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <StatCard
            title="Total Revenue"
            value={`$${totalRevenue}`}
            change={`${totalRevenueChange}`}
            icon={<CircleDollarSign className="h-5 w-5" />}
            delay="100ms"
          />
          <StatCard
            title="Total Orders"
            value={totalOrders}
            change={`${totalOrdersChange}`}
            icon={<ShoppingCart className="h-5 w-5" />}
            delay="200ms"
          />
          <StatCard
            title="Total Products"
            value={totalProducts}
            change={`${totalProductsChange}`}
            icon={<Package className="h-5 w-5" />}
            delay="300ms"
          />
          <StatCard
            title="Total Customers"
            value={totalCustomers}
            change={`${totalCustomersChange}`}
            icon={<Users className="h-5 w-5" />}
            delay="400ms"
          />
        </div>

        {/* Chart and Recent Orders */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div
            className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 lg:col-span-2 opacity-100 animate-fadeInUp relative overflow-hidden group"
            style={{ animationDelay: "600ms" }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-400 opacity-0 group-hover:opacity-5 transition-opacity duration-500"></div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-800">
                Sales Overview
              </h3>
              <div className="flex items-center space-x-2">
                <button className="px-3 py-1 text-sm bg-green-100 text-green-600 rounded-lg transition-colors duration-300 hover:bg-opacity-80">
                  Monthly
                </button>
                <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-300">
                  Yearly
                </button>
              </div>
            </div>
            <div className="h-64 w-full" ref={chartRef}>
              {/* Animated chart using divs */}
              <div className="flex items-end justify-between h-48 w-full">
                <div className="flex flex-col items-center">
                  <div
                    className="w-12 bg-green-500 rounded-t-md h-0 chart-bar"
                    data-height="60%"
                    style={{ height: "0%", transition: "height 1s ease-out" }}
                  ></div>
                  <span className="text-xs mt-1 text-gray-500">Jan</span>
                </div>
                <div className="flex flex-col items-center">
                  <div
                    className="w-12 bg-green-500 rounded-t-md h-0 chart-bar"
                    data-height="40%"
                    style={{ height: "0%", transition: "height 1s ease-out" }}
                  ></div>
                  <span className="text-xs mt-1 text-gray-500">Feb</span>
                </div>
                <div className="flex flex-col items-center">
                  <div
                    className="w-12 bg-green-500 rounded-t-md h-0 chart-bar"
                    data-height="70%"
                    style={{ height: "0%", transition: "height 1s ease-out" }}
                  ></div>
                  <span className="text-xs mt-1 text-gray-500">Mar</span>
                </div>
                <div className="flex flex-col items-center">
                  <div
                    className="w-12 bg-green-500 rounded-t-md h-0 chart-bar"
                    data-height="50%"
                    style={{ height: "0%", transition: "height 1s ease-out" }}
                  ></div>
                  <span className="text-xs mt-1 text-gray-500">Apr</span>
                </div>
                <div className="flex flex-col items-center">
                  <div
                    className="w-12 bg-green-500 rounded-t-md h-0 chart-bar"
                    data-height="80%"
                    style={{ height: "0%", transition: "height 1s ease-out" }}
                  ></div>
                  <span className="text-xs mt-1 text-gray-500">May</span>
                </div>
                <div className="flex flex-col items-center">
                  <div
                    className="w-12 bg-green-500 rounded-t-md h-0 chart-bar"
                    data-height="90%"
                    style={{ height: "0%", transition: "height 1s ease-out" }}
                  ></div>
                  <span className="text-xs mt-1 text-gray-500">Jun</span>
                </div>
              </div>
            </div>
          </div>
          {/* Recent Orders */}
          <div
            className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 opacity-100 animate-fadeInUp relative overflow-hidden group"
            style={{ animationDelay: "700ms" }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-400 opacity-0 group-hover:opacity-5 transition-opacity duration-500"></div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-800">
                Recent Orders
              </h3>
              <Link
                href="/orders"
                className={`text-sm ${theme.accent} hover:underline transition-colors duration-300`}
              >
                View All
              </Link>
            </div>
            <div className="space-y-4">
              {orders.map((order) => (
                <Link
                  to={`/orders/${order.order_id}`}
                  key={order.order_id}
                  className="block"
                >
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-[1.01] hover:shadow-md cursor-pointer">
                    <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                      <Tractor className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="ml-3 flex-1">
                      <p className="text-sm font-medium text-gray-800">{order.user_name}</p>
                      <p className="text-xs text-gray-500">
                        `Order #{order.order_id} • ${order.total_price}`
                      </p>
                    </div>
                    {order.order_status === "Shipped" && (
                      <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded-lg">
                        {order.order_status}
                      </span>
                    )}
                    {order.order_status === "Processing" && (
                      <span className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-lg">
                        {order.order_status}
                      </span>
                    )}
                    {order.order_status === "Delivered" && (
                      <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded-lg">
                        {order.order_status}
                      </span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Products Table */}
        <div
          className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden opacity-100 animate-fadeInUp relative"
          style={{ animationDelay: "800ms" }}
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-emerald-400"></div>
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-800">
                Top Selling Products
              </h3>
              <Link to="/tools/add">
                <button
                  className={`px-4 py-2 ${theme.button} text-white rounded-lg transition-all duration-300 hover:shadow-lg transform hover:scale-105`}
                >
                  Add Product
                </button>
              </Link>
            </div>
          </div>
          <div className="overflow-x-auto overflow-y-scroll max-h-60">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sales
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {topSellingProducts.map((product) => (
                  <tr
                    key={product.id}
                    className="hover:bg-gray-50 transition-all duration-300 group cursor-pointer"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link
                        to={`/products/${product.id}`}
                        className="flex items-center"
                      >
                        <div className="h-10 w-10 flex-shrink-0 bg-gray-100 rounded-md flex items-center justify-center overflow-hidden group-hover:shadow-md transition-all duration-300">
                          <img
                            src={Image}
                            alt="Product"
                            width={40}
                            height={40}
                            className="rounded-md transition-transform duration-300 group-hover:scale-110"
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {product.name}
                          </div>
                        </div>
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {product.category}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        ${product.price}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {product.stock}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {product.sales}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </PageContainer>
    </Layout>
  );
}

function StatCard({ title, value, change, icon, delay }) {
  return (
    <div
      className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 transition-all duration-500 hover:shadow-lg transform hover:-translate-y-1 hover:rotate-1 opacity-100 animate-fadeInUp relative overflow-hidden group cursor-pointer"
      style={{ animationDelay: delay }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-400 opacity-0 group-hover:opacity-5 transition-opacity duration-500"></div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
        <div className="p-2 bg-green-100 rounded-lg transition-transform duration-300 group-hover:rotate-12">
          <div className="text-green-600">{icon}</div>
        </div>
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-bold text-gray-900 transition-all duration-500 group-hover:scale-110 origin-left">
          {value}
        </span>
        {parseFloat(change) >= 0 ? (
          <TrendingUp className="h-3 w-3 mr-1 text-green-500 " />
        ) : (
          <TrendingDown className="h-3 w-3 mr-1 text-red-500" />
        )}
        <span
          className={
            parseFloat(change) >= 0 ? "text-green-600" : "text-red-600"
          }
        >
          {Math.abs(parseFloat(change)).toFixed(0)}%
        </span>
      </div>
      <div className="text-xs text-gray-500 mt-1">Compared to last month</div>
    </div>
  );
}

function ProgressBar({
  label,
  value,
  color = "bg-gradient-to-r from-green-500 to-emerald-400",
}) {
  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-sm text-gray-600">{label}</span>
        <span className="text-sm font-medium">{value}%</span>
      </div>
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full ${color} rounded-full transition-all duration-1000`}
          style={{ width: `${value}%` }}
        ></div>
      </div>
    </div>
  );
}

