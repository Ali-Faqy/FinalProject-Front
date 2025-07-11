import { useState, useEffect } from "react";
import { Filter, Search } from "lucide-react";
import Layout from "../UI/Layout.jsx";
import PageContainer from "../UI/PageContainer.jsx";
import { Link } from "react-router-dom";
import { getAllDeliveryOrders } from "../Data/DeliveryData.js";

export default function DeliveryPage() {
  const [filterOpen, setFilterOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [driverFilter, setDriverFilter] = useState("");
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [deliveries, setDeliveries] = useState([]);

  const fetchDeliveries = async () => {
    try {
      const data = await getAllDeliveryOrders();
      if (data) {
        setDeliveries(data);
      } else {
        console.error("No Deliveries found.");
      }
    } catch (error) {
      console.error("Error fetching deliveries:", error);
    }
  };

  useEffect(() => {
    fetchDeliveries();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "Order Placed":
        return "bg-blue-100 text-blue-800";
      case "Processing":
        return "bg-yellow-100 text-yellow-800";
      case "Shipped":
        return "bg-orange-100 text-orange-800";
      case "In Transit":
        return "bg-purple-100 text-purple-800";
      case "Out for Delivery":
        return "bg-teal-100 text-teal-800";
      case "Delivered":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredDeliveries = deliveries.filter((delivery) => {
    if (
      activeTab === "upcoming" &&
      delivery.order_status !== "Out for Delivery"
    ) {
      return false;
    } else if (
      activeTab === "completed" &&
      delivery.order_status !== "Delivered"
    ) {
      return false;
    }

    // Search term filter
    if (
      searchTerm &&
      !delivery.delivery_id.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !delivery.order_id.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !delivery.customer_name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) &&
      !delivery.products_name.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }

    // Status filter
    if (statusFilter && delivery.order_status !== statusFilter) {
      return false;
    }

    // Driver filter
    if (driverFilter && delivery.driver_name !== driverFilter) {
      return false;
    }

    // Date range filter
    if (
      dateRange.start &&
      new Date(delivery.order_date) < new Date(dateRange.start)
    ) {
      return false;
    }
    if (
      dateRange.end &&
      new Date(delivery.order_date) > new Date(dateRange.end)
    ) {
      return false;
    }

    return true;
  });

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredDeliveries.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredDeliveries.length / itemsPerPage);

  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <Layout adminName={localStorage.getItem("userName") || "Admin"}>
      <PageContainer
        title="Delivery Management"
        description="Track and manage equipment deliveries"
      >
        {/* Actions Bar */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search deliveries..."
              className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setFilterOpen(!filterOpen)}
              className="px-4 py-2 flex items-center gap-2 text-white bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 rounded-lg transition-all duration-300 hover:shadow-lg transform hover:scale-[1.02]"
            >
              <Filter className="h-4 w-4" />
              <span>Filter</span>
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
                  <option value="Out for Delivery">Out for Delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Driver
                </label>
                <select
                  className="w-full border border-gray-200 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={driverFilter}
                  onChange={(e) => setDriverFilter(e.target.value)}
                >
                  <option value="">All Drivers</option>
                  {[...new Set(deliveries.map((d) => d.driver_name))].map(
                    (driver) => (
                      <option key={driver} value={driver}>
                        {driver}
                      </option>
                    )
                  )}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date Range
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="date"
                    className="w-full border border-gray-200 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={dateRange.start}
                    onChange={(e) =>
                      setDateRange({ ...dateRange, start: e.target.value })
                    }
                  />
                  <span>-</span>
                  <input
                    type="date"
                    className="w-full border border-gray-200 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={dateRange.end}
                    onChange={(e) =>
                      setDateRange({ ...dateRange, end: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            className={`px-4 py-2 font-medium text-sm ${
              activeTab === "all"
                ? "text-green-600 border-b-2 border-green-500"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("all")}
          >
            All Deliveries
          </button>
          <button
            className={`px-4 py-2 font-medium text-sm ${
              activeTab === "upcoming"
                ? "text-green-600 border-b-2 border-green-500"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("upcoming")}
          >
            Upcoming
          </button>
          <button
            className={`px-4 py-2 font-medium text-sm ${
              activeTab === "completed"
                ? "text-green-600 border-b-2 border-green-500"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("completed")}
          >
            Completed
          </button>
        </div>

        {/* Deliveries Table */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Delivery ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Driver
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentItems.map((delivery) => (
                  <tr
                    key={delivery.order_id}
                    className="hover:bg-gray-50 transition-colors duration-300"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {delivery.delivery_id}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {delivery.order_id}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {delivery.customer_name}
                      </div>
                      <div className="text-xs text-gray-500 truncate max-w-xs">
                        {delivery.going_location}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {delivery.products_name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {delivery.order_date}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {delivery.driver_name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                          delivery.order_status
                        )}`}
                      >
                        {delivery.order_status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link to={`/delivery/${delivery.order_id}`}>
                        <button className="text-green-600 hover:text-green-900 mr-3">
                          Details
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-gray-500">
            Showing <span className="font-medium">{indexOfFirstItem + 1}</span>{" "}
            to{" "}
            <span className="font-medium">
              {Math.min(indexOfLastItem, filteredDeliveries.length)}
            </span>{" "}
            of <span className="font-medium">{filteredDeliveries.length}</span>{" "}
            deliveries
          </div>

          <div className="flex items-center space-x-1">
            <select
              className="mr-4 px-2 py-1 border border-gray-200 rounded-md text-sm"
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
            >
              <option value="5">5 per page</option>
              <option value="10">10 per page</option>
              <option value="20">20 per page</option>
            </select>

            <button
              className="px-3 py-1 border border-gray-200 rounded-md text-gray-600 hover:bg-gray-50 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>

            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              // Show pages around current page
              let pageNum = currentPage;
              if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }

              if (pageNum > 0 && pageNum <= totalPages) {
                return (
                  <button
                    key={pageNum}
                    className={`px-3 py-1 rounded-md transition-colors duration-300 ${
                      currentPage === pageNum
                        ? "bg-green-500 text-white"
                        : "border border-gray-200 text-gray-600 hover:bg-gray-50"
                    }`}
                    onClick={() => paginate(pageNum)}
                  >
                    {pageNum}
                  </button>
                );
              }
              return null;
            })}

            <button
              className="px-3 py-1 border border-gray-200 rounded-md text-gray-600 hover:bg-gray-50 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </PageContainer>
    </Layout>
  );
}
