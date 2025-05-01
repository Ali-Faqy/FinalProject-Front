import Layout from "../UI/Layout";
import PageContainer from "../UI/PageContainer";
import { Download, Filter, Search } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllCustomer } from "../Data/CustomerData.js";

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
  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCustomers = async () => {
    try {
      const response = await getAllCustomer();
      if (!response) throw new Error("No customers found");
      
      const data = response.map((item) => ({
        id: item.id,
        name: item.name,
        email: item.email,
        phone: item.phone,
        location: item.location,
        orders: item.orders,
        spent: item.spent,
        lastOrder: item.lastOrder,
        status: item.status == 0 ? "Inactive" : "Active",
        avatar: item.avatar,
      }));
      
      setCustomers(data);
      setError(null);
    } catch (err) {
      console.error("Error fetching customers:", err);
      setError("Failed to load customers. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filters]);

  // Updated useEffect with customers dependency
  useEffect(() => {
    const filtered = customers.filter((customer) => {
      const matchesSearch = searchTerm 
        ? customer.name.toLowerCase().includes(searchTerm.toLowerCase())
        : true;
      
      const matchesStatus = filters.status
        ? customer.status === filters.status
        : true;
      
      const matchesLocation = filters.location
        ? customer.location.toLowerCase().includes(filters.location.toLowerCase())
        : true;
      
      const matchesMinSpent = filters.minSpent
        ? customer.spent >= parseFloat(filters.minSpent)
        : true;

      return matchesSearch && matchesStatus && matchesLocation && matchesMinSpent;
    });

    setFilteredCustomers(filtered);
  }, [searchTerm, filters, customers]); // Added customers to dependencies

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

  if (isLoading) {
    return (
      <Layout adminName="Ali Othman">
        <PageContainer title="Customers" description="Loading...">
          <div className="text-center py-8">Loading customers...</div>
        </PageContainer>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout adminName="Ali Othman">
        <PageContainer title="Customers" description="Error">
          <div className="text-center py-8 text-red-500">{error}</div>
        </PageContainer>
      </Layout>
    );
  }

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
        {filteredCustomers.length > 0 ? (
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
              {Array.from({ length: totalPages }, (_, index) => (
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
        ) : (
          !isLoading && <div className="text-center py-8 text-gray-500">No customers found matching your criteria</div>
        )}
      </PageContainer>
    </Layout>
  );
}
