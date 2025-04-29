import Layout from "../UI/Layout";
import PageContainer from "../UI/PageContainer";
import { Download, Filter, Search } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function CustomerPage() {
  const [filterOpen, setFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    status: "",
    location: "",
    minSpent: "",
  });
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const customers = [
    { id: 1, name: "John Smith", email: "john.smith@example.com", phone: "(555) 123-4567", location: "New York, USA", orders: 12, spent: 45600, lastOrder: "2023-04-15", status: "Active", avatar: "/placeholder.svg?height=40&width=40" },
    { id: 2, name: "Sarah Johnson", email: "sarah.johnson@example.com", phone: "(555) 234-5678", location: "Chicago, USA", orders: 8, spent: 175000, lastOrder: "2023-04-14", status: "Active", avatar: "/placeholder.svg?height=40&width=40" },
    { id: 3, name: "Michael Brown", email: "michael.brown@example.com", phone: "(555) 345-6789", location: "Los Angeles, USA", orders: 5, spent: 12500, lastOrder: "2023-04-12", status: "Active", avatar: "/placeholder.svg?height=40&width=40" },
    { id: 4, name: "Emily Davis", email: "emily.davis@example.com", phone: "(555) 456-7890", location: "Houston, USA", orders: 3, spent: 8200, lastOrder: "2023-04-10", status: "Inactive", avatar: "/placeholder.svg?height=40&width=40" },
    { id: 5, name: "Robert Wilson", email: "robert.wilson@example.com", phone: "(555) 567-8901", location: "Phoenix, USA", orders: 7, spent: 32000, lastOrder: "2023-04-08", status: "Active", avatar: "/placeholder.svg?height=40&width=40" },
    { id: 6, name: "Jennifer Taylor", email: "jennifer.taylor@example.com", phone: "(555) 678-9012", location: "Philadelphia, USA", orders: 4, spent: 45000, lastOrder: "2023-04-05", status: "Active", avatar: "/placeholder.svg?height=40&width=40" },
    { id: 7, name: "David Miller", email: "david.miller@example.com", phone: "(555) 789-0123", location: "San Antonio, USA", orders: 2, spent: 5600, lastOrder: "2023-04-03", status: "Inactive", avatar: "/placeholder.svg?height=40&width=40" },
    { id: 8, name: "Lisa Anderson", email: "lisa.anderson@example.com", phone: "(555) 890-1234", location: "San Diego, USA", orders: 6, spent: 18500, lastOrder: "2023-04-01", status: "Active", avatar: "/placeholder.svg?height=40&width=40" },
  ];

  // Reset page when search or filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filters]);

  // Filter logic
  useEffect(() => {
    const filtered = customers.filter((customer) => {
      if (searchTerm && !customer.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
      if (filters.status && customer.status !== filters.status) return false;
      if (filters.location && !customer.location.toLowerCase().includes(filters.location.toLowerCase())) return false;
      if (filters.minSpent && customer.spent < parseFloat(filters.minSpent)) return false;
      return true;
    });

    setFilteredCustomers(filtered);
  }, [searchTerm, filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const customersPerPage = 6;
  const indexOfLastCustomer = currentPage * customersPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
  const currentCustomers = filteredCustomers.slice(indexOfFirstCustomer, indexOfLastCustomer);
  const totalPages = Math.ceil(filteredCustomers.length / customersPerPage);

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Inactive":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Layout adminName="Ali Othman">
      <PageContainer title="Customers" description="Manage your customer relationships">
        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search customers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setFilterOpen(!filterOpen)}
              className="px-4 py-2 flex items-center gap-2 text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              <Filter className="h-4 w-4" />
              <span>Filter</span>
            </button>
            <button className="px-4 py-2 flex items-center gap-2 text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
              <Download className="h-4 w-4" />
              <span>Export</span>
            </button>
          </div>
        </div>

        {filterOpen && (
          <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  name="status"
                  value={filters.status}
                  onChange={handleFilterChange}
                  className="w-full border border-gray-200 rounded-md p-2"
                >
                  <option value="">All Statuses</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input
                  type="text"
                  name="location"
                  value={filters.location}
                  onChange={handleFilterChange}
                  className="w-full border border-gray-200 rounded-md p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Spent</label>
                <input
                  type="number"
                  name="minSpent"
                  value={filters.minSpent}
                  onChange={handleFilterChange}
                  className="w-full border border-gray-200 rounded-md p-2"
                />
              </div>
            </div>
          </div>
        )}

        {/* Customer Table */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  {["Customer", "Contact", "Location", "Orders", "Spent", "Last Order", "Status", "Actions"].map((col) => (
                    <th key={col} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentCustomers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img src={customer.avatar} alt={customer.name} className="h-10 w-10 rounded-full object-cover" />
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{customer.email}</div>
                      <div className="text-sm text-gray-500">{customer.phone}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">{customer.location}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{customer.orders}</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">${customer.spent.toLocaleString()}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{customer.lastOrder}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 inline-flex text-xs font-semibold rounded-full ${getStatusColor(customer.status)}`}>
                        {customer.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link to={`/customers/${customer.id}`}>
                        <button className="text-sky-600 hover:text-gray-900">View</button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <div className="mt-6 flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Showing <span className="font-medium">{indexOfFirstCustomer + 1}</span> to{" "}
            <span className="font-medium">{Math.min(indexOfLastCustomer, filteredCustomers.length)}</span> of{" "}
            <span className="font-medium">{filteredCustomers.length}</span> customers
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-3 py-1 border border-gray-200 rounded-md text-gray-600 ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-50"}`}
            >
              Previous
            </button>
            {[...Array(Math.min(5, totalPages))].map((_, index) => (
              <button
                key={index + 1}
                onClick={() => setCurrentPage(index + 1)}
                className={`px-3 py-1 rounded-md ${currentPage === index + 1 ? "bg-green-500 text-white" : "border border-gray-200 text-gray-600 hover:bg-gray-50"}`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 border border-gray-200 rounded-md text-gray-600 ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-50"}`}
            >
              Next
            </button>
          </div>
        </div>
      </PageContainer>
    </Layout>
  );
}
