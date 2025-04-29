import { useState } from "react"
import { Calendar, Filter, Search, Plus } from "lucide-react"
import Layout from "../UI/Layout";
import PageContainer from "../UI/PageContainer";
import { Link } from "react-router-dom";

export default function InventoryPage() {
  const [filterOpen, setFilterOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("all")

  const inventory = [
    {
      id: "1",
      name: "Compact Tractor X200",
      category: "Tractors",
      stock: 24,
      price: 24500,
      status: "In Stock",
      images : [""],
    },
    {
      id: "2",
      name: "Harvester Pro 5000",
      category: "Harvesters",
      stock: 8,
      price: 175000,
      status: "In Stock",
        images : [""],
    },
    {
      id: "3",
      name: "Irrigation System",
      category: "Irrigation",
      stock: 15,
      price: 8750,
      status: "In Stock",
        images : [""],
    },
    {
      id: "4",
      name: "Drone Surveyor X1",
      category: "Drones",
      stock: 3,
      price: 3200,
      status: "Low Stock",
        images : [""],
    },
    {
      id: "5",
      name: "Soil Analyzer Kit",
      category: "Tools",
      stock: 42,
      price: 1200,
      status: "In Stock",
        images : [""],
    },
    {
      id: "6",
      name: "Utility Tractor 4WD",
      category: "Tractors",
      stock: 0,
      price: 45000,
      status: "Out of Stock",
        images : [""],
    },
    {
      id: "7",
      name: "Sprinkler System Pro",
      category: "Irrigation",
      stock: 7,
      price: 5600,
      status: "In Stock",
        images : [""],
    },
    {
      id: "8",
      name: "Crop Monitoring Drone",
      category: "Drones",
      stock: 2,
      price: 4500,
      status: "Low Stock",
        images : [""],
    },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case "In Stock":
        return "bg-green-100 text-green-800"
      case "Low Stock":
        return "bg-yellow-100 text-yellow-800"
      case "Out of Stock":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredInventory = inventory.filter((item) => {
    if (activeTab === "in-stock") {
      return item.status === "In Stock"
    } else if (activeTab === "low-stock") {
      return item.status === "Low Stock"
    } else if (activeTab === "out-of-stock") {
      return item.status === "Out of Stock"
    }
    return true
  })

  return (
    <Layout adminName="Ali Othman">
      <PageContainer title="Inventory" description="Manage your product inventory">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 transition-all duration-300 hover:shadow-md">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Total Products</h3>
            <div className="flex items-baseline">
              <span className="text-2xl font-bold text-gray-900">324</span>
              <span className="ml-2 text-sm text-green-600">+8%</span>
            </div>
            <div className="text-xs text-gray-500 mt-1">Compared to last month</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 transition-all duration-300 hover:shadow-md">
            <h3 className="text-sm font-medium text-gray-500 mb-2">In Stock</h3>
            <div className="flex items-baseline">
              <span className="text-2xl font-bold text-gray-900">285</span>
              <span className="ml-2 text-sm text-green-600">+5%</span>
            </div>
            <div className="text-xs text-gray-500 mt-1">Across all warehouse</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 transition-all duration-300 hover:shadow-md">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Low Stock Items</h3>
            <div className="flex items-baseline">
              <span className="text-2xl font-bold text-gray-900">18</span>
              <span className="ml-2 text-sm text-red-600">+5</span>
            </div>
            <div className="text-xs text-gray-500 mt-1">Require attention</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 transition-all duration-300 hover:shadow-md">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Inventory Value</h3>
            <div className="flex items-baseline">
              <span className="text-2xl font-bold text-gray-900">$4.2M</span>
              <span className="ml-2 text-sm text-green-600">+12%</span>
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
            <Link to="/tools/add"><button
              className="px-4 py-2 flex items-center gap-2 text-white bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 rounded-lg transition-all duration-300 hover:shadow-lg transform hover:scale-[1.02]"
            >
              <Plus className="h-4 w-4" />
              <span>Add Product</span>
            </button></Link>
          </div>
        </div>

        {/* Filter Panel */}
        {filterOpen && (
          <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6 animate-fadeIn">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select className="w-full border border-gray-200 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500">
                  <option value="">All Statuses</option>
                  <option value="in-stock">In Stock</option>
                  <option value="low-stock">Low Stock</option>
                  <option value="out-of-stock">Out of Stock</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select className="w-full border border-gray-200 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500">
                  <option value="">All Categories</option>
                  <option value="tractors">Tractors</option>
                  <option value="harvesters">Harvesters</option>
                  <option value="irrigation">Irrigation</option>
                  <option value="drones">Drones</option>
                  <option value="tools">Tools</option>
                </select>
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
              activeTab === "in-stock"
                ? "text-green-600 border-b-2 border-green-500"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("in-stock")}
          >
            In Stock
          </button>
          <button
            className={`px-4 py-2 font-medium text-sm ${
              activeTab === "low-stock"
                ? "text-green-600 border-b-2 border-green-500"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("low-stock")}
          >
            Low Stock
          </button>
          <button
            className={`px-4 py-2 font-medium text-sm ${
              activeTab === "out-of-stock"
                ? "text-green-600 border-b-2 border-green-500"
                : "text-gray-500 hover:text-gray-700"
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
                    Price
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
                {filteredInventory.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors duration-300">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{item.id}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{item.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{item.category}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{item.stock}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">${item.price.toLocaleString()}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                          item.status,
                        )}`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        className="text-green-600 hover:text-green-900 mr-3"
                      >
                        Edit
                      </button>
                      <button
                        className="text-gray-600 hover:text-gray-900"
                      >
                        View
                      </button>
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
            Showing <span className="font-medium">1</span> to{" "}
            <span className="font-medium">{filteredInventory.length}</span> of{" "}
            <span className="font-medium">{filteredInventory.length}</span> products
          </div>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1 border border-gray-200 rounded-md text-gray-600 hover:bg-gray-50 transition-colors duration-300">
              Previous
            </button>
            <button className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors duration-300">
              1
            </button>
            <button className="px-3 py-1 border border-gray-200 rounded-md text-gray-600 hover:bg-gray-50 transition-colors duration-300">
              Next
            </button>
          </div>
        </div>
      </PageContainer>
    </Layout>
  )
}
