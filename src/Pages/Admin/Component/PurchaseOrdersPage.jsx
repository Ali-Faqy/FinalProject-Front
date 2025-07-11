import { useState, useEffect } from "react";
import { Download, Filter, Plus, Search, Users } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../UI/Layout";
import PageContainer from "../UI/PageContainer";
import { getAllPurchaseOrders } from "../Data/PurchaseOrderData.js";

export default function PurchaseOrdersPage() {
  const navigate = useNavigate();
  const currentType = "purchase";

  const [filterOpen, setFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All Statuses");
  const [supplierFilter, setSupplierFilter] = useState("All Suppliers");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isExporting, setIsExporting] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [purchaseOrders, setPurchaseOrders] = useState([]);
  const ordersPerPage = 6;

  const fetchAllOrders = async () => {
    try {
      const data = await getAllPurchaseOrders();
      if (data) {
        const transformedData = data.map((order) => ({
          id: order.order_id.toString(),
          supplier: order.supplier_name,
          date: order.order_date,
          products: order.product_names.map((name) => ({
            name,
            quantity: 1,
          })),
          items: order.number_of_products,
          total: order.total,
          paymentStatus: order.payment_status || "Not Paid",
        }));
        setPurchaseOrders(transformedData);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  const formatProducts = (products) => {
    if (products.length === 1) return products[0].name;
    return `${products[0].name} + ${products.length - 1} more`;
  };

  useEffect(() => {
    let result = [...purchaseOrders];
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (order) =>
          order.id.toLowerCase().includes(term) ||
          order.supplier.toLowerCase().includes(term) ||
          order.products.some((product) =>
            product.name.toLowerCase().includes(term)
          )
      );
    }
    if (statusFilter !== "All Statuses") {
      result = result.filter((order) => order.paymentStatus === statusFilter);
    }
    if (supplierFilter !== "All Suppliers") {
      result = result.filter((order) => order.supplier === supplierFilter);
    }
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      result = result.filter((order) => {
        const orderDate = new Date(order.date);
        return orderDate >= start && orderDate <= end;
      });
    }
    setFilteredOrders(result);
    setCurrentPage(1);
  }, [searchTerm, statusFilter, supplierFilter, startDate, endDate, purchaseOrders]);

  useEffect(() => {
    setFilteredOrders(purchaseOrders);
  }, [purchaseOrders]);

  const getPaymentColor = (payment) => {
    switch (payment) {
      case "Paid":
        return "bg-green-100 text-green-800";
      case "Partially Paid":
        return "bg-yellow-100 text-yellow-800";
      case "Not Paid":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleResetFilters = () => {
    setStatusFilter("All Statuses");
    setSupplierFilter("All Suppliers");
    setStartDate("");
    setEndDate("");
    setSearchTerm("");
  };

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      const headers = [
        "Order ID",
        "Supplier",
        "Date",
        "Items",
        "Total",
        "Payment Status",
        "Products",
      ];
      const csvContent = [
        headers.join(","),
        ...filteredOrders.map((order) => {
          const productsText = order.products
            .map((p) => `${p.name} (${p.quantity})`)
            .join("; ");
          return [
            order.id,
            order.supplier,
            order.date,
            order.items,
            `$${order.total}`,
            order.paymentStatus,
            `"${productsText}"`,
          ].join(",");
        }),
      ].join("\n");

      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute(
        "download",
        `purchase_orders_${new Date().toISOString().split("T")[0]}.csv`
      );
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setIsExporting(false);
    }, 1000);
  };

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(
    indexOfFirstOrder,
    indexOfLastOrder
  );
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);
  const uniqueSuppliers = Array.from(
    new Set(purchaseOrders.map((order) => order.supplier))
  );

  const handleOrderTypeChange = (type) => {
    if (type === "customer") {
      navigate("/admin/orders/customers");
    } else if (type === "purchase") {
      navigate("/admin/orders/purchase");
    }
  };

  return (
    <Layout adminName={localStorage.getItem("userName") || "Admin"}>
      <PageContainer
        title="Purchase Orders"
        description="Manage your supplier purchase orders"
      >
        <div className="bg-gray-50 min-h-screen">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Order Type Selector */}
            <div className="flex mb-6">
              <div className="bg-white rounded-lg border border-gray-200 p-1 inline-flex">
                <button
                  className={`px-4 py-2 rounded-md font-medium ${
                    currentType === "customer"
                      ? "bg-green-500 text-white"
                      : "text-gray-600 hover:bg-gray-100 transition-colors"
                  }`}
                  onClick={() => handleOrderTypeChange("customer")}
                >
                  <div className="flex items-center gap-2">
                    <Users size={16} />
                    <span>Customer Orders</span>
                  </div>
                </button>
                <button
                  className={`px-4 py-2 rounded-md font-medium ${
                    currentType === "purchase"
                      ? "bg-green-500 text-white"
                      : "text-gray-600 hover:bg-gray-100 transition-colors"
                  }`}
                  onClick={() => handleOrderTypeChange("purchase")}
                >
                  <div className="flex items-center gap-2">
                    <Download size={16} />
                    <span>Purchase Orders</span>
                  </div>
                </button>
              </div>
            </div>

            <div className="py-8">
              {/* Actions */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <div className="relative w-full md:max-w-sm">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Search purchase orders..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setFilterOpen(!filterOpen)}
                    className="flex items-center gap-1 border px-3 py-2 rounded-md text-sm hover:bg-gray-50"
                  >
                    <Filter className="h-4 w-4" />
                    Filter
                  </button>
                  <button
                    onClick={handleExport}
                    disabled={isExporting}
                    className="flex items-center gap-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                  >
                    <Download className="h-4 w-4" />
                    {isExporting ? "Exporting..." : "Export"}
                  </button>
                  <Link to={"/admin/orders/purchase/new"}>
                    <button className="flex items-center gap-1 px-4 py-2 bg-emerald-500 text-white rounded-md hover:bg-emerald-600">
                      <Plus className="h-4 w-4" />
                      New Order
                    </button>
                  </Link>
                </div>
              </div>

              {/* Filter Panel */}
              {filterOpen && (
                <div className="p-4 mb-6 bg-white border rounded-lg shadow-sm">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Status
                      </label>
                      <select
                        className="mt-1 w-full border rounded-md p-2"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                      >
                        <option>All Statuses</option>
                        <option>Paid</option>
                        <option>Not Paid</option>
                        <option>Partially Paid</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Supplier
                      </label>
                      <select
                        className="mt-1 w-full border rounded-md p-2"
                        value={supplierFilter}
                        onChange={(e) => setSupplierFilter(e.target.value)}
                      >
                        <option>All Suppliers</option>
                        {uniqueSuppliers.map((supplier) => (
                          <option key={supplier}>{supplier}</option>
                        ))}
                      </select>
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="w-full border rounded-md p-2"
                      />
                      <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="w-full border rounded-md p-2"
                      />
                    </div>
                    <div className="flex items-end">
                      <button
                        onClick={handleResetFilters}
                        className="ml-auto text-sm px-4 py-2 border rounded-md hover:bg-gray-50"
                      >
                        Reset
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Table */}
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Order ID
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Supplier
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
                                {order.supplier}
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
                                  <Link to={`/admin/orders/purchase/${order.id}/view`}><div className="text-xs text-gray-500 mt-1 cursor-pointer hover:text-green-600">
                                    View all items
                                  </div></Link>
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
                                className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getPaymentColor(
                                  order.paymentStatus
                                )}`}
                              >
                                {order.paymentStatus}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <Link
                                to={`/admin/orders/purchase/${order.id}/view`}
                                className="text-green-600 hover:text-green-900 mr-3"
                              >
                                View
                              </Link>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan={8}
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
              <div className="flex justify-between items-center mt-6">
                <span className="text-sm text-gray-600">
                  Page {currentPage} of {totalPages}
                </span>
                <div className="flex gap-2">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                    className="px-3 py-1 border rounded-md text-sm hover:bg-gray-100 disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                    className="px-3 py-1 border rounded-md text-sm hover:bg-gray-100 disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PageContainer>
    </Layout>
  );
}