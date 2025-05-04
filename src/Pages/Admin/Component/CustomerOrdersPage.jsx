import { useState, useEffect, } from "react";
import { Link  } from "react-router-dom";
import { Calendar, Download, Filter, Search, Users } from "lucide-react";
import Layout from "../UI/Layout.jsx";
import PageContainer from "../UI/PageContainer.jsx";
export default function CustomerOrdersPage() {
  const [filterOpen, setFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [paymentFilter, setPaymentFilter] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isExporting, setIsExporting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 6;

  // Updated orders data with multiple products per order
  const orders = [
    {
      id: "ORD-45782",
      customer: "John Smith",
      date: "2023-04-15",
      total: 24500,
      status: "Shipped",
      items: 2,
      payment: "Paid",
      products: [
        {
          name: "Compact Tractor X200",
          price: 22000,
          quantity: 1,
          id: "prod-1",
          discount: 10,
        },
        {
          name: "Tractor Attachment Kit",
          price: 2500,
          quantity: 1,
          id: "prod-2",
        },
      ],
    },
    {
      id: "ORD-45781",
      customer: "Sarah Johnson",
      date: "2023-04-14",
      total: 175000,
      status: "Processing",
      items: 3,
      payment: "Paid",
      products: [
        {
          name: "Harvester Pro 5000",
          price: 165000,
          quantity: 1,
          id: "prod-3",
        },
        {
          name: "Harvester Maintenance Kit",
          price: 5000,
          quantity: 1,
          id: "prod-4",
          discount: 5,
        },
        {
          name: "Operator Training Session",
          price: 5000,
          quantity: 1,
          id: "prod-5",
        },
      ],
    },
    {
      id: "ORD-45780",
      customer: "Michael Brown",
      date: "2023-04-12",
      total: 8750,
      status: "Delivered",
      items: 2,
      payment: "Paid",
      products: [
        { name: "Irrigation System", price: 7500, quantity: 1, id: "prod-6" },
        {
          name: "Installation Service",
          price: 1250,
          quantity: 1,
          id: "prod-7",
          discount: 20,
        },
      ],
    },
    {
      id: "ORD-45779",
      customer: "Emily Davis",
      date: "2023-04-10",
      total: 3200,
      status: "Processing",
      items: 3,
      payment: "Pending",
      products: [
        { name: "Drone Surveyor X1", price: 2500, quantity: 1, id: "prod-8" },
        { name: "Extra Battery Pack", price: 450, quantity: 1, id: "prod-9" },
        {
          name: "Carrying Case",
          price: 250,
          quantity: 1,
          id: "prod-10",
          discount: 15,
        },
      ],
    },
    {
      id: "ORD-45778",
      customer: "Robert Wilson",
      date: "2023-04-08",
      total: 1200,
      status: "Delivered",
      items: 2,
      payment: "Paid",
      products: [
        { name: "Soil Analyzer Kit", price: 800, quantity: 1, id: "prod-11" },
        {
          name: "Soil Sample Collection Tools",
          price: 400,
          quantity: 1,
          id: "prod-12",
        },
      ],
    },
    {
      id: "ORD-45777",
      customer: "Jennifer Taylor",
      date: "2023-04-05",
      total: 45000,
      status: "Shipped",
      items: 4,
      payment: "Paid",
      products: [
        {
          name: "Utility Tractor 4WD",
          price: 40000,
          quantity: 1,
          id: "prod-13",
        },
        {
          name: "Front Loader Attachment",
          price: 3000,
          quantity: 1,
          id: "prod-14",
        },
        {
          name: "Rear Blade Attachment",
          price: 1200,
          quantity: 1,
          id: "prod-15",
        },
        { name: "Extended Warranty", price: 800, quantity: 1, id: "prod-16" },
      ],
    },
    {
      id: "ORD-45776",
      customer: "David Miller",
      date: "2023-04-03",
      total: 5600,
      status: "Cancelled",
      items: 2,
      payment: "Refunded",
      products: [
        {
          name: "Sprinkler System Pro",
          price: 4800,
          quantity: 1,
          id: "prod-17",
        },
        { name: "Water Timer", price: 800, quantity: 1, id: "prod-18" },
      ],
    },
    {
      id: "ORD-45775",
      customer: "Lisa Anderson",
      date: "2023-04-01",
      total: 4500,
      status: "Delivered",
      items: 3,
      payment: "Paid",
      products: [
        {
          name: "Crop Monitoring Drone",
          price: 3500,
          quantity: 1,
          id: "prod-19",
        },
        { name: "Software License", price: 500, quantity: 1, id: "prod-20" },
        { name: "Training Session", price: 500, quantity: 1, id: "prod-21" },
      ],
    },
  ];

  // Format products for display in the table
  const formatProducts = (products) => {
    if (products.length === 1) {
      return products[0].name;
    }

    const mainProduct = products[0].name;
    return `${mainProduct} + ${products.length - 1} more`;
  };

  // Apply filters whenever search term or filters change
  useEffect(() => {
    let result = [...orders];

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (order) =>
          order.id.toLowerCase().includes(term) ||
          order.customer.toLowerCase().includes(term) ||
          order.products.some((product) =>
            product.name.toLowerCase().includes(term)
          )
      );
    }

    // Apply status filter
    if (statusFilter) {
      result = result.filter((order) => order.status === statusFilter);
    }

    // Apply payment filter
    if (paymentFilter) {
      result = result.filter((order) => order.payment === paymentFilter);
    }

    // Apply date range filter
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      result = result.filter((order) => {
        const orderDate = new Date(order.date);
        return orderDate >= start && orderDate <= end;
      });
    }

    setFilteredOrders(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchTerm, statusFilter, paymentFilter, startDate, endDate]);

  // Initialize filtered orders with all orders
  useEffect(() => {
    setFilteredOrders(orders);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "Shipped":
        return "bg-blue-100 text-blue-800";
      case "Processing":
        return "bg-yellow-100 text-yellow-800";
      case "Delivered":
        return "bg-green-100 text-green-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPaymentColor = (payment) => {
    switch (payment) {
      case "Paid":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Refunded":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };


  const handleOrderTypeChange = (type) => {
    if (type === "purchase") {
      // router.push("/orders/purchase")
    }
  };


  const handleResetFilters = () => {
    setStatusFilter("");
    setPaymentFilter("");
    setStartDate("");
    setEndDate("");
    setSearchTerm("");
  };

  const handleExport = () => {
    setIsExporting(true);

    // Simulate export process
    setTimeout(() => {
      // Create CSV content
      const headers = [
        "Order ID",
        "Customer",
        "Date",
        "Items",
        "Total",
        "Status",
        "Payment",
        "Products",
      ];
      const csvContent = [
        headers.join(","),
        ...filteredOrders.map((order) => {
          // Format products for CSV
          const productsText = order.products
            .map((p) => `${p.name} (${p.quantity})`)
            .join("; ");

          return [
            order.id,
            order.customer,
            order.date,
            order.items,
            `$${order.total}`,
            order.status,
            order.payment,
            `"${productsText}"`,
          ].join(",");
        }),
      ].join("\n");

      // Create download link
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute(
        "download",
        `customer_orders_${new Date().toISOString().split("T")[0]}.csv`
      );
      document.body.appendChild(link);

      // Trigger download
      link.click();

      // Clean up
      document.body.removeChild(link);
      setIsExporting(false);
    }, 1000);
  };

  // Pagination logic
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(
    indexOfFirstOrder,
    indexOfLastOrder
  );
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  return (
    <Layout adminName="Ali Othman">
      <PageContainer
        title="Customers"
        description="Manage your customer relationships"
      >
        <div className="bg-gray-50 min-h-screen">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

            {/* Order Type Selector */}
            <div className="flex mb-6">
              <div className="bg-white rounded-lg border border-gray-200 p-1 inline-flex">
                <button
                  className="px-4 py-2 rounded-md bg-green-500 text-white font-medium"
                  onClick={() => handleOrderTypeChange("customer")}
                >
                  <div className="flex items-center gap-2">
                    <Users size={16} />
                    <span>Customer Orders</span>
                  </div>
                </button>
                <button
                  className="px-4 py-2 rounded-md text-gray-600 hover:bg-gray-100 font-medium transition-colors"
                  onClick={() => handleOrderTypeChange("purchase")}
                >
                  <div className="flex items-center gap-2">
                    <Download size={16} />
                    <span>Purchase Orders</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Actions Bar */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search orders..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                />
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setFilterOpen(!filterOpen)}
                  className="px-4 py-2 flex items-center gap-2 text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-300"
                >
                  <Filter className="h-4 w-4" />
                  <span>Filter</span>
                </button>
                <button
                  className="px-4 py-2 flex items-center gap-2 text-white bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 rounded-lg transition-all duration-300 hover:shadow-lg transform hover:scale-[1.02]"
                  onClick={handleExport}
                  disabled={isExporting}
                >
                  <Download className="h-4 w-4" />
                  <span>{isExporting ? "Exporting..." : "Export"}</span>
                </button>
              </div>
            </div>

            {/* Filter Panel */}
            {filterOpen && (
              <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6 animate-fadeIn">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Status
                    </label>
                    <select
                      className="w-full border border-gray-200 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                    >
                      <option value="">All Statuses</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Processing">Processing</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Payment Status
                    </label>
                    <select
                      className="w-full border border-gray-200 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                      value={paymentFilter}
                      onChange={(e) => setPaymentFilter(e.target.value)}
                    >
                      <option value="">All Payments</option>
                      <option value="Paid">Paid</option>
                      <option value="Pending">Pending</option>
                      <option value="Refunded">Refunded</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date Range
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="w-full border border-gray-200 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                      <span>-</span>
                      <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="w-full border border-gray-200 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                  </div>
                  <div className="flex items-end ml-20">
                    <button
                      className="px-4 py-2 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-all duration-300"
                      onClick={handleResetFilters}
                    >
                      Reset
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Orders Table */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Order ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Customer
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Products
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Items
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Payment
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {currentOrders.length > 0 ? (
                      currentOrders.map((order) => (
                        <tr
                          key={order.id}
                          className="hover:bg-gray-50 transition-colors duration-300"
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {order.id}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {order.customer}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">
                              {order.date}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {formatProducts(order.products)}
                              {order.products.length > 1 && (
                                <div
                                  className="text-xs text-gray-500 mt-1 cursor-pointer hover:text-green-600"
                                >
                                  View all items
                                </div>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {order.items}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              ${order.total.toLocaleString()}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                                order.status
                              )}`}
                            >
                              {order.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getPaymentColor(
                                order.payment
                              )}`}
                            >
                              {order.payment}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <Link
                              to={`/orders/${order.id}/view`}
                              className="text-green-600 hover:text-green-900 mr-3"
                            >
                              View
                            </Link>
                            <Link
                              to={`/orders/${order.id}/track`}
                              className="text-gray-600 hover:text-gray-900"
                            >
                              Track
                            </Link>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={9}
                          className="px-6 py-4 text-center text-gray-500"
                        >
                          No orders found matching your criteria
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pagination */}
            {filteredOrders.length > 0 ? (
              <div className="mt-6 flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  Showing{" "}
                  <span className="font-medium">{indexOfFirstOrder + 1}</span>{" "}
                  to{" "}
                  <span className="font-medium">
                    {Math.min(indexOfLastOrder, filteredOrders.length)}
                  </span>{" "}
                  of{" "}
                  <span className="font-medium">{filteredOrders.length}</span>{" "}
                  orders
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() =>
                      currentPage > 1 && setCurrentPage(currentPage - 1)
                    }
                    disabled={currentPage === 1}
                    className={`px-3 py-1 border border-gray-200 rounded-md text-gray-600 ${
                      currentPage === 1
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    Previous
                  </button>
                  {Array.from({ length: totalPages }, (_, index) => (
                    <button
                      key={index + 1}
                      onClick={() => setCurrentPage(index + 1)}
                      className={`px-3 py-1 rounded-md ${
                        currentPage === index + 1
                          ? "bg-green-500 text-white"
                          : "border border-gray-200 text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                  <button
                    onClick={() =>
                      currentPage < totalPages &&
                      setCurrentPage(currentPage + 1)
                    }
                    disabled={currentPage === totalPages}
                    className={`px-3 py-1 border border-gray-200 rounded-md text-gray-600 ${
                      currentPage === totalPages
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    Next
                  </button>
                </div>
              </div>
            ) : (
              !isLoading && (
                <div className="text-center py-8 text-gray-500">
                  No orders found matching your criteria
                </div>
              )
            )}
          </div>
        </div>
      </PageContainer>
    </Layout>
  );
}
