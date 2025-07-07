import { useState, useEffect } from "react";
import { Filter, Plus, Search, SlidersHorizontal } from "lucide-react";
import Layout from "../UI/Layout";
import PageContainer from "../UI/PageContainer";
import NoImage from "../../../assets/NoImage.jpg";
import { Link } from "react-router-dom";
import { getAllTools } from "../Data/ToolsData.js";
export default function ProductsPage() {
  const [view, setView] = useState("grid");
  const [filterOpen, setFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  const [categoryFilter, setCategoryFilter] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [stockStatus, setStockStatus] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);
  // const [loading, setLoading] = useState(true);

  const fetchAllTools = async () => {
      const response = await getAllTools();
      if (response) {
        const products = response.map((product) => ({
          id: product.product_id,
          name: product.product_name,
          category: product.category_name,
          price: product.selling_price,
          stock: product.remaining_quantity,
          image: product.attachment_link,

        }));
        setProducts(products);
      }
    }

    useEffect(() => {
      fetchAllTools();
      }, []);

  // const products = [
  //   {
  //     id: 1,
  //     name: "Compact Tractor X200",
  //     category: "Tractors",
  //     price: 24500,
  //     stock: 15,
  //     image: Image,
  //   },
  //   {
  //     id: 2,
  //     name: "Harvester Pro 5000",
  //     category: "Harvesters",
  //     price: 175000,
  //     stock: 8,
  //     image: Image,
  //   },
  //   {
  //     id: 3,
  //     name: "Irrigation System",
  //     category: "Irrigation",
  //     price: 8750,
  //     stock: 32,
  //     image: Image,
  //   },
  //   {
  //     id: 4,
  //     name: "Drone Surveyor X1",
  //     category: "Drones",
  //     price: 3200,
  //     stock: 24,
  //     image: Image,
  //   },
  //   {
  //     id: 5,
  //     name: "Soil Analyzer Kit",
  //     category: "Tools",
  //     price: 1200,
  //     stock: 45,
  //     image: Image,
  //   },
  //   {
  //     id: 6,
  //     name: "Utility Tractor 4WD",
  //     category: "Tractors",
  //     price: 45000,
  //     stock: 10,
  //     image: Image,
  //   },
  //   {
  //     id: 7,
  //     name: "Sprinkler System Pro",
  //     category: "Irrigation",
  //     price: 5600,
  //     stock: 18,
  //     image: Image,
  //   },
  //   {
  //     id: 8,
  //     name: "Crop Monitoring Drone",
  //     category: "Drones",
  //     price: 4500,
  //     stock: 12,
  //     image: Image,
  //   },
  //   {
  //     id: 9,
  //     name: "Advanced Seeder",
  //     category: "Tools",
  //     price: 3500,
  //     stock: 20,
  //     image: Image,
  //   },
  //   {
  //     id: 10,
  //     name: "Tractor Loader",
  //     category: "Tractors",
  //     price: 60000,
  //     stock: 5,
  //     image: Image,
  //   },
  // ];

  // Filter products based on selected filters
  const filteredProducts = products.filter((product) => {
    // Filter by search query
    if (
      searchQuery &&
      !product.name.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }

    // Filter by category
    if (categoryFilter && product.category !== categoryFilter) {
      return false;
    }

    // Filter by price range
    if (minPrice && product.price < Number.parseInt(minPrice)) {
      return false;
    }
    if (maxPrice && product.price > Number.parseInt(maxPrice)) {
      return false;
    }

    // Filter by stock status
    if (stockStatus === "in-stock" && product.stock <= 20) {
      return false;
    }
    if (
      stockStatus === "low-stock" &&
      (product.stock < 5 || product.stock > 20)
    ) {
      return false;
    }
    if (stockStatus === "critical-stock" && product.stock >= 5) {
      return false;
    }

    return true;
  });

  // Calculate pagination values
  const totalProducts = filteredProducts.length;
  const totalPages = Math.ceil(totalProducts / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Handle page changes
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Generate page numbers for pagination
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <Layout adminName="Ali Othman">
      <PageContainer
        title="Products"
        description="Manage your agricultural equipment inventory"
      >
        {/* Actions Bar */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1); // Reset to first page when searching
              }}
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
              onClick={() => setView(view === "grid" ? "list" : "grid")}
              className="px-4 py-2 flex items-center gap-2 text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-300"
            >
              <SlidersHorizontal className="h-4 w-4" />
              <span>{view === "grid" ? "List View" : "Grid View"}</span>
            </button>
            <Link to="/tools/add">
              {" "}
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
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  className="w-full border border-gray-200 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                >
                  <option value="">All Categories</option>
                  <option value="Tractors">Tractors</option>
                  <option value="Harvesters">Harvesters</option>
                  <option value="Irrigation">Irrigation</option>
                  <option value="Drones">Drones</option>
                  <option value="Tools">Tools</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price Range
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="w-full border border-gray-200 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <span>-</span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="w-full border border-gray-200 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Stock Status
                </label>
                <select
                  className="w-full border border-gray-200 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={stockStatus}
                  onChange={(e) => setStockStatus(e.target.value)}
                >
                  <option value="">All</option>
                  <option value="in-stock">In Stock (&gt;20)</option>
                  <option value="low-stock">Low Stock (5-20)</option>
                  <option value="critical-stock">Critical Stock (&lt;5)</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Products Grid/List */}
        {view === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {currentProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 group cursor-pointer"
              >
                <div className="relative h-48 bg-gray-100 overflow-hidden">
                  <img
                    src={product.image == null ? NoImage : product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {product.featured && (
                    <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-md">
                      Featured
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-gray-900 truncate">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-2">
                    {product.category}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold">
                      ${product.price.toLocaleString()}
                    </span>
                    <span
                      className={`text-sm ${
                        product.stock < 10 ? "text-amber-600" : "text-gray-500"
                      }`}
                    >
                      {product.stock} in stock
                    </span>
                  </div>
                  <div className="mt-4 grid grid-cols-2">
                    <Link to={`/tools/${product.id}/edit`}><button
                      className="w-20 py-1.5 text-sm bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 text-white rounded-lg transition-all duration-300"
                    >
                      Edit
                    </button></Link>
                    <Link to={`/tools/${product.id}/view`}><button
                      className="w-20 ml-[-20px] py-1.5 text-sm border border-gray-200 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors duration-300"

                    >
                      View
                    </button></Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
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
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentProducts.map((product) => (
                  <tr
                    key={product.id}
                    className="hover:bg-gray-50 transition-colors duration-300"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-12 w-12 flex-shrink-0 rounded-md overflow-hidden">
                          <img
                            src={product.image == null ? NoImage : product.image}
                            alt={product.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {product.name}
                          </div>
                          {product.featured && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Featured
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {product.category}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        ${product.price.toLocaleString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div
                        className={`text-sm ${
                          product.stock < 10
                            ? "text-amber-600 font-medium"
                            : "text-gray-900"
                        }`}
                      >
                        {product.stock}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-green-600 hover:text-green-900 mr-3">
                        Edit
                      </button>
                      <Link to={`/tools/${product.id}/view`}><button className="text-gray-600 hover:text-gray-900">
                        View
                      </button></Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        <div className="mt-6 flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Showing{" "}
            <span className="font-medium">{indexOfFirstProduct + 1}</span> to{" "}
            <span className="font-medium">
              {Math.min(indexOfLastProduct, totalProducts)}
            </span>{" "}
            of <span className="font-medium">{totalProducts}</span> products
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className={`px-3 py-1 border border-gray-200 rounded-md ${
                currentPage === 1
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-gray-600 hover:bg-gray-50"
              } transition-colors duration-300`}
            >
              Previous
            </button>
            {pageNumbers.map((number) => (
              <button
                key={number}
                onClick={() => handlePageChange(number)}
                className={`px-3 py-1 rounded-md transition-colors duration-300 ${
                  currentPage === number
                    ? "bg-green-500 text-white hover:bg-green-600"
                    : "border border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}
              >
                {number}
              </button>
            ))}
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 border border-gray-200 rounded-md ${
                currentPage === totalPages
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-gray-600 hover:bg-gray-50"
              } transition-colors duration-300`}
            >
              Next
            </button>
          </div>
        </div>
        <div className="mt-5"></div>
      </PageContainer>
    </Layout>
  );
}
