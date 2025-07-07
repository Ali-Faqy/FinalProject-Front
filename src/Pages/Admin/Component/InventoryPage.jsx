import { useState, useEffect } from "react";
import { Filter, Search, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import Layout from "../UI/Layout";
import PageContainer from "../UI/PageContainer";
import { Link } from "react-router-dom";
import { getProductInfo, getInventoryAnalytics } from "../Data/InventoryPage.js";

export default function InventoryPage() {
  const [filterOpen, setFilterOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [inventory, setInventory] = useState([]);
  const [analytics, setAnalytics] = useState({});
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  const fetchInventoryProduct = async () => {
    try {
      const data = await getProductInfo();
      if (data && Array.isArray(data)) {
        setInventory(data);
      } else {
        console.error("Empty or invalid inventory data");
        setInventory([]);
      }
    } catch (error) {
      console.error("Error fetching inventory product:", error);
      setInventory([]);
    }
  };

  const fetchInventoryAnalytics = async () => {
    try {
      const data = await getInventoryAnalytics();
      if (data && typeof data === "object") {
        setAnalytics(data);
      } else {
        console.error("Empty or invalid analytics data");
        setAnalytics({});
      }
    } catch (error) {
      console.error("Error fetching inventory analytics:", error);
      setAnalytics({});
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await Promise.all([fetchInventoryProduct(), fetchInventoryAnalytics()]);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "in stock":
        return "bg-green-100 text-green-800";
      case "low stock":
        return "bg-yellow-100 text-yellow-800";
      case "out of stock":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Apply all filters
  const filteredInventory = inventory.filter((item) => {
    // Normalize status for comparison
    const itemStatus = item.availability_status?.toLowerCase();

    // Tab filter
    if (activeTab !== "all") {
      if (activeTab === "in-stock" && itemStatus !== "in stock") return false;
      if (activeTab === "low-stock" && itemStatus !== "low stock") return false;
      if (activeTab === "out-of-stock" && itemStatus !== "out of stock") return false;
    }

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      if (
        !item.product_name?.toLowerCase().includes(query) &&
        !item.category_name?.toLowerCase().includes(query) &&
        !item.product_id?.toString().toLowerCase().includes(query)
      ) {
        return false;
      }
    }

    // Category filter
    if (categoryFilter && item.category_name !== categoryFilter) return false;

    // Status filter from dropdown
    if (statusFilter) {
      if (statusFilter === "in-stock" && itemStatus !== "in stock") return false;
      if (statusFilter === "low-stock" && itemStatus !== "low stock") return false;
      if (statusFilter === "out-of-stock" && itemStatus !== "out of stock") return false;
    }

    return true;
  });

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredInventory.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredInventory.length / itemsPerPage);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, activeTab, categoryFilter, statusFilter, itemsPerPage]);

  // Handle page changes
  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // Generate page numbers
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  // Get unique categories for filter dropdown
  const categories = [...new Set(inventory.map((item) => item.category_name))];

  // Improved loading state
  if (isLoading) {
    return (
      <Layout adminName="Ali Othman">
        <PageContainer title="Inventory" description="Loading inventory data...">
          <div className="p-6">
            <p className="text-center text-muted-foreground">
              Loading page data, please wait...
            </p>
          </div>
        </PageContainer>
      </Layout>
    );
  }

  // Handle empty data
  if (inventory.length === 0) {
    return (
      <Layout adminName="Ali Othman">
        <PageContainer title="Inventory" description="Manage your product inventory">
          <div className="p-6">
            <p className="text-center text-muted-foreground">
              No inventory data available. Please add products.
            </p>
            <Link to="/tools/add">
              <button className="mt-4 px-4 py-2 flex items-center gap-2 text-white bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 rounded-lg transition-all duration-300">
                <Plus className="h-4 w-4" />
                <span>Add Product</span>
              </button>
            </Link>
          </div>
        </PageContainer>
      </Layout>
    );
  }

  return (
    <Layout adminName="Ali Othman">
      <PageContainer title="Inventory" description="Manage your product inventory">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 transition-all duration-300 hover:shadow-md">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Total Products</h3>
            <div className="flex items-baseline">
              <span className="text-2xl font-bold text-gray-900">{analytics.total_products || 0}</span>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 transition-all duration-300 hover:shadow-md">
            <h3 className="text-sm font-medium text-gray-500 mb-2">In Stock</h3>
            <div className="flex items-baseline">
              <span className="text-2xl font-bold text-gray-900">{analytics.in_stock || 0}</span>
            </div>
            <div className="text-xs text-gray-500 mt-1">Across all warehouses</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 transition-all duration-300 hover:shadow-md">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Low Stock Items</h3>
            <div className="flex items-baseline">
              <span className="text-2xl font-bold text-gray-900">{analytics.low_stock_count || 0}</span>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 transition-all duration-300 hover:shadow-md">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Inventory Value</h3>
            <div className="flex items-baseline">
              <span className="text-2xl font-bold text-gray-900">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                  notation: "compact",
                  maximumFractionDigits: 1,
                }).format(analytics.inventory_value || 0)}
              </span>
            </div>
            <div className="text-xs text-gray-500 mt-1">Total value of inventory</div>
          </div>
        </div>

        {/* Actions Bar */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search inventory..."
              className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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
            <Link to="/tools/add">
              <button className="px-4 py-2 flex items-center gap-2 text-white bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 rounded-lg transition-all duration-300 hover:shadow-lg transform hover:scale-[1.02]">
                <Plus className="h-4 w-4" />
                <span>Add Product</span>
              </button>
            </Link>
          </div>
        </div>

        {/* Filter Panel */}
        {filterOpen && (
          <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6 animate-fadeIn">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  className="w-full border border-gray-200 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="">All Statuses</option>
                  <option value="in-stock">In Stock</option>
                  <option value="low-stock">Low Stock</option>
                  <option value="out-of-stock">Out of Stock</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  className="w-full border border-gray-200 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                >
                  <option value="">All Categories</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Items per page</label>
                <select
                  className="w-full border border-gray-200 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={itemsPerPage}
                  onChange={(e) => setItemsPerPage(Number(e.target.value))}
                >
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="50">50</option>
                </select>
              </div>
              <div className="flex items-end">
                <button
                  onClick={() => {
                    setStatusFilter("");
                    setCategoryFilter("");
                    setSearchQuery("");
                    setCurrentPage(1);
                  }}
                  className="px-4 py-2 text-gray-600 bg-gray-100 border border-gray-200 rounded-lg hover:bg-gray-200 transition-colors duration-300"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            className={`px-4 py-2 font-medium text-sm ${
              activeTab === "all" ? "text-green-600 border-b-2 border-green-500" : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("all")}
          >
            All Products
          </button>
          <button
            className={`px-4 py-2 font-medium text-sm ${
              activeTab === "in-stock" ? "text-green-600 border-b-2 border-green-500" : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("in-stock")}
          >
            In Stock
          </button>
          <button
            className={`px-4 py-2 font-medium text-sm ${
              activeTab === "low-stock" ? "text-green-600 border-b-2 border-green-500" : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("low-stock")}
          >
            Low Stock
          </button>
          <button
            className={`px-4 py-2 font-medium text-sm ${
              activeTab === "out-of-stock" ? "text-green-600 border-b-2 border-green-500" : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("out-of-stock")}
          >
            Out of Stock
          </button>
        </div>

        {/* Inventory Table */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Original Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Selling Price
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
                {currentItems.length > 0 ? (
                  currentItems.map((item) => (
                    <tr key={item.product_id} className="hover:bg-gray-50 transition-colors duration-300">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{item.product_id}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{item.product_name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{item.category_name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{item.remaining_quantity}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          ${item.original_price?.toLocaleString() || "0"}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          ${item.selling_price?.toLocaleString() || "0"}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                            item.availability_status
                          )}`}
                        >
                          {item.availability_status || "Unknown"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link to={`/tools/${item.product_id}/edit`}>
                          <button className="text-green-600 hover:text-green-900 mr-3">Edit</button>
                        </Link>
                        <Link to={`/tools/${item.product_id}/view`}>
                          <button className="text-gray-600 hover:text-gray-900">View</button>
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="px-6 py-10 text-center text-gray-500">
                      No products found matching your criteria
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <div className="mt-6 mb-5 flex flex-col sm:flex-row items-center justify-between">
          <div className="text-sm text-gray-500 mb-4 sm:mb-0">
            Showing <span className="font-medium">{filteredInventory.length > 0 ? indexOfFirstItem + 1 : 0}</span> to{" "}
            <span className="font-medium">{Math.min(indexOfLastItem, filteredInventory.length)}</span> of{" "}
            <span className="font-medium">{filteredInventory.length}</span> products
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-3 py-1 border border-gray-200 rounded-md text-gray-600 hover:bg-gray-50 transition-colors duration-300 ${
                currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            {pageNumbers.map((number) => (
              <button
                key={number}
                onClick={() => paginate(number)}
                className={`px-3 py-1 ${
                  currentPage === number
                    ? "bg-green-500 text-white"
                    : "border border-gray-200 text-gray-600 hover:bg-gray-50"
                } rounded-md transition-colors duration-300`}
              >
                {number}
              </button>
            ))}
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages || totalPages === 0}
              className={`px-3 py-1 border border-gray-200 rounded-md text-gray-600 hover:bg-gray-50 transition-colors duration-300 ${
                currentPage === totalPages || totalPages === 0 ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </PageContainer>
    </Layout>
  );
}