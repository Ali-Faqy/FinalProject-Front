import { useState, useEffect } from "react"
import { Download, Filter } from "lucide-react"
import {
  getProductsAnalytics,
  getCategoryPerformance,
  getSalesByCategory,
  getTopPerformanceProduct,
} from "../Data/AnalyticsData.js"

export function ProductsAnalytics() {
  const [dateRange, setDateRange] = useState("30days")
  const [filterOpen, setFilterOpen] = useState(false)
  const [productsData, setProductsData] = useState(null)
  const [topPerformanceProducts, setTopPerformanceProducts] = useState([])
  const [categoryPerformanceData, setCategoryPerformanceData] = useState([])
  const [salesByCategoryData, setSalesByCategoryData] = useState(null)

  const fetchTopProductsPerformance = async () => {
    try {
      const data = await getTopPerformanceProduct()
      setTopPerformanceProducts(data)
    } catch (error) {
      console.error("Error fetching product analytics:", error)
    }
  }

  const fetchCategoryPerformance = async () => {
    try {
      const data = await getCategoryPerformance()
      setCategoryPerformanceData(data)
    } catch (error) {
      console.error("Error fetching category performance:", error)
    }
  }

  const fetchSalesByCategory = async () => {
    try {
      const data = await getSalesByCategory()
      setSalesByCategoryData(data)
    } catch (error) {
      console.error("Error fetching sales by category:", error)
    }
  }

  // Format currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value)
  }

  // Get growth indicator class
  const getGrowthClass = (growth) => {
    return growth >= 0 ? "text-green-600" : "text-red-600"
  }

  // Get growth indicator symbol
  const getGrowthSymbol = (growth) => {
    return growth >= 0 ? "↑" : "↓"
  }

  // Fetch sales analytics
  const fetchProductsAnalytics = async () => {
    try {
      const data = await getProductsAnalytics()
      setProductsData(data)
    } catch (error) {
      console.error("Error fetching product analytics:", error)
    }
  }

  useEffect(() => {
    fetchProductsAnalytics()
    fetchTopProductsPerformance()
    fetchCategoryPerformance()
    fetchSalesByCategory()
  }, [])

  // Handle product sales
  const handleProductSales = () => {
    if (!productsData) return 0
    if (dateRange === "30days") {
      return productsData.current_month_sales.toFixed(0)
    }
    if (dateRange === "90days") {
      return productsData.last_three_months_sales.toFixed(0)
    }
    if (dateRange === "year") {
      return productsData.current_year_sales.toFixed(0)
    }
    return 0
  }

  // Handle units sold
  const handleUnitSold = () => {
    if (!productsData) return 0
    if (dateRange === "30days") {
      return productsData.current_month_products_sold.toFixed(0)
    }
    if (dateRange === "90days") {
      return productsData.last_three_months_products_sold.toFixed(0)
    }
    if (dateRange === "year") {
      return productsData.current_year_products_sold.toFixed(0)
    }
    return 0
  }

  // Handle average price
  const handleAveragePrice = () => {
    if (!productsData) return 0
    if (dateRange === "30days") {
      return productsData.current_month_avg_price.toFixed(2)
    }
    if (dateRange === "90days") {
      return productsData.last_three_months_avg_price.toFixed(0)
    }
    if (dateRange === "year") {
      return productsData.current_year_avg_price.toFixed(0)
    }
    return 0
  }

  // Handle profit margin
  const handleProfitMargin = () => {
    if (!productsData) return 0
    if (dateRange === "30days") {
      return Math.abs(productsData.current_month_profit_margin * 100).toFixed(0)
    }
    if (dateRange === "90days") {
      return Math.abs(productsData.last_three_months_profit_margin * 100).toFixed(0)
    }
    if (dateRange === "year") {
      return Math.abs(productsData.current_year_profit_margin * 100).toFixed(0)
    }
    return 0
  }

  // Handle product sales percentage change
  const handleProductSalesPercentage = () => {
    if (!productsData) return 0
    if (dateRange === "30days") {
      if (productsData.current_month_sales && productsData.previous_month_sales) {
        return (
          ((productsData.current_month_sales - productsData.previous_month_sales) / productsData.previous_month_sales) *
          100
        ).toFixed(1)
      }
      return 0
    }
    if (dateRange === "90days") {
      if (productsData.last_three_months_sales && productsData.previous_three_months_sales) {
        return (
          ((productsData.last_three_months_sales - productsData.previous_three_months_sales) /
            productsData.previous_three_months_sales) *
          100
        ).toFixed(1)
      }
      return 0
    }
    if (dateRange === "year") {
      if (productsData.current_year_sales && productsData.previous_year_sales) {
        return (
          ((productsData.current_year_sales - productsData.previous_year_sales) / productsData.previous_year_sales) *
          100
        ).toFixed(1)
      }
      return 0
    }
    return 0
  }

  // Handle units sold percentage change
  const handleUnitSoldPercentage = () => {
    if (!productsData) return 0
    if (dateRange === "30days") {
      if (productsData.current_month_products_sold && productsData.previous_month_products_sold) {
        return (
          ((productsData.current_month_products_sold - productsData.previous_month_products_sold) /
            productsData.previous_month_products_sold) *
          100
        ).toFixed(1)
      }
      return 0
    }
    if (dateRange === "90days") {
      if (productsData.last_three_months_products_sold && productsData.previous_three_months_products_sold) {
        return (
          ((productsData.last_three_months_products_sold - productsData.previous_three_months_products_sold) /
            productsData.previous_three_months_products_sold) *
          100
        ).toFixed(1)
      }
      return 0
    }
    if (dateRange === "year") {
      if (productsData.current_year_products_sold && productsData.previous_year_products_sold) {
        return (
          ((productsData.current_year_products_sold - productsData.previous_year_products_sold) /
            productsData.previous_year_products_sold) *
          100
        ).toFixed(1)
      }
      return 0
    }
    return 0
  }

  const handleAveragePricePercentage = () => {
    if (!productsData) return 0
    if (dateRange === "30days") {
      if (productsData.current_month_avg_price && productsData.previous_month_avg_price) {
        return (
          ((productsData.current_month_avg_price - productsData.previous_month_avg_price) /
            productsData.previous_month_avg_price) *
          100
        ).toFixed(1)
      }
      return 0
    }
    if (dateRange === "90days") {
      if (productsData.last_three_months_avg_price && productsData.previous_three_months_avg_price) {
        return (
          ((productsData.last_three_months_avg_price - productsData.previous_three_months_avg_price) /
            productsData.previous_three_months_avg_price) *
          100
        ).toFixed(1)
      }
      return 0
    }
    if (dateRange === "year") {
      if (productsData.current_year_avg_price && productsData.previous_year_avg_price) {
        return (
          ((productsData.current_year_avg_price - productsData.previous_year_avg_price) /
            productsData.previous_year_avg_price) *
          100
        ).toFixed(1)
      }
      return 0
    }
    return 0
  }

  const handleProfitMarginPercentage = () => {
    if (!productsData) return 0
    if (dateRange === "30days") {
      if (productsData.current_month_profit_margin && productsData.previous_month_profit_margin) {
        return (
          ((productsData.current_month_profit_margin - productsData.previous_month_profit_margin) /
            productsData.previous_month_profit_margin) *
          100
        ).toFixed(1)
      }
      return 0
    }
    if (dateRange === "90days") {
      if (productsData.last_three_months_profit_margin && productsData.previous_three_months_profit_margin) {
        return (
          ((productsData.last_three_months_profit_margin - productsData.previous_three_months_profit_margin) /
            productsData.previous_three_months_profit_margin) *
          100
        ).toFixed(1)
      }
      return 0
    }
    if (dateRange === "year") {
      if (productsData.current_year_profit_margin && productsData.previous_year_profit_margin) {
        return (
          ((productsData.current_year_profit_margin - productsData.previous_year_profit_margin) /
            productsData.previous_year_profit_margin) *
          100
        ).toFixed(1)
      }
      return 0
    }
    return 0
  }

  // Get category colors
  const getCategoryColor = (category) => {
    const colorMap = {
      Machines: "bg-green-500",
      Tools: "bg-blue-500",
      Equipment: "bg-yellow-500",
      Parts: "bg-purple-500",
    }
    return colorMap[category] || "bg-gray-500"
  }

  // Prepare category chart data
  const prepareCategoryChartData = () => {
    if (!salesByCategoryData) return []

    if (dateRange === "year" && salesByCategoryData.yearly) {
      const { Machines, Tools, year } = salesByCategoryData.yearly
      return [
        { category: "Machines", sales: Machines || 0, color: "bg-green-500" },
        { category: "Tools", sales: Tools || 0, color: "bg-blue-500" },
      ]
    }

    // For monthly and quarterly, we'll show placeholder data since the API doesn't provide detailed breakdown
    return [
      { category: "Machines", sales: 45000, color: "bg-green-500" },
      { category: "Tools", sales: 35000, color: "bg-blue-500" },
    ]
  }

  const categoryChartData = prepareCategoryChartData()
  const maxCategorySales = Math.max(...categoryChartData.map((item) => item.sales))

  // Get current products data based on date range
  const getCurrentProductsData = () => {
    if (!topPerformanceProducts) return []

    if (dateRange === "30days") {
      return topPerformanceProducts.monthly || []
    }
    if (dateRange === "90days") {
      return topPerformanceProducts.quarterly || []
    }
    if (dateRange === "year") {
      return topPerformanceProducts.yearly || []
    }
    return []
  }

  const currentProductsData = getCurrentProductsData()

  if (!productsData || !topPerformanceProducts || !categoryPerformanceData) {
    return <div>Loading Products analytics...</div>
  }

  return (
    <>
      {/* Actions Bar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div className="flex items-center space-x-2">
          <button
            className={`px-4 py-2 rounded-lg transition-colors duration-300 ${
              dateRange === "30days"
                ? "bg-green-500 text-white"
                : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
            }`}
            onClick={() => setDateRange("30days")}
          >
            Last 30 Days
          </button>
          <button
            className={`px-4 py-2 rounded-lg transition-colors duration-300 ${
              dateRange === "90days"
                ? "bg-green-500 text-white"
                : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
            }`}
            onClick={() => setDateRange("90days")}
          >
            Last 90 Days
          </button>
          <button
            className={`px-4 py-2 rounded-lg transition-colors duration-300 ${
              dateRange === "year"
                ? "bg-green-500 text-white"
                : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
            }`}
            onClick={() => setDateRange("year")}
          >
            This Year
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilterOpen(!filterOpen)}
            className="px-4 py-2 flex items-center gap-2 text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-300"
          >
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </button>
          <button className="px-4 py-2 flex items-center gap-2 text-white bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 rounded-lg transition-all duration-300 hover:shadow-lg">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Filter Panel */}
      {filterOpen && (
        <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6 animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Product Category</label>
              <select className="w-full border border-gray-200 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500">
                <option value="">All Categories</option>
                <option value="machines">Machines</option>
                <option value="tools">Tools</option>
                <option value="equipment">Equipment</option>
                <option value="parts">Parts</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price Range</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  className="w-full border border-gray-200 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <span>-</span>
                <input
                  type="number"
                  placeholder="Max"
                  className="w-full border border-gray-200 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>
            <div className="flex items-end">
              <button className="w-full px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 text-white rounded-lg transition-all duration-300">
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 transition-all duration-300 hover:shadow-md">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Total Product Sales</h3>
          <div className="flex items-baseline">
            <span className="text-2xl font-bold text-gray-900">{formatCurrency(handleProductSales())}</span>
            <span className={`ml-2 text-sm ${getGrowthClass(handleProductSalesPercentage())}`}>
              {getGrowthSymbol(handleProductSalesPercentage())}
              {Math.abs(handleProductSalesPercentage())}%
            </span>
          </div>
          <div className="text-xs text-gray-500 mt-1">Compared to previous period</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 transition-all duration-300 hover:shadow-md">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Units Sold</h3>
          <div className="flex items-baseline">
            <span className="text-2xl font-bold text-gray-900">{handleUnitSold()}</span>
            <span className={`ml-2 text-sm ${getGrowthClass(handleUnitSoldPercentage())}`}>
              {getGrowthSymbol(handleUnitSoldPercentage())}
              {Math.abs(handleUnitSoldPercentage())}%
            </span>
          </div>
          <div className="text-xs text-gray-500 mt-1">Compared to previous period</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 transition-all duration-300 hover:shadow-md">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Average Price</h3>
          <div className="flex items-baseline">
            <span className="text-2xl font-bold text-gray-900">{formatCurrency(handleAveragePrice())}</span>
            <span className={`ml-2 text-sm ${getGrowthClass(handleAveragePricePercentage())}`}>
              {getGrowthSymbol(handleAveragePricePercentage())}
              {Math.abs(handleAveragePricePercentage())}%
            </span>
          </div>
          <div className="text-xs text-gray-500 mt-1">Compared to previous period</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 transition-all duration-300 hover:shadow-md">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Profit Margin</h3>
          <div className="flex items-baseline">
            <span className="text-2xl font-bold text-gray-900">{handleProfitMargin()}%</span>
            <span className={`ml-2 text-sm ${getGrowthClass(handleProfitMarginPercentage())}`}>
              {getGrowthSymbol(handleProfitMarginPercentage())}
              {Math.abs(handleProfitMarginPercentage())}%
            </span>
          </div>
          <div className="text-xs text-gray-500 mt-1">Compared to previous period</div>
        </div>
      </div>

      {/* Sales by Category Chart - Dynamic Data */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 mb-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-800">Sales by Category</h3>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1 text-sm bg-green-100 text-green-600 rounded-lg transition-colors duration-300 hover:bg-opacity-80">
              {dateRange === "30days" ? "Monthly" : dateRange === "90days" ? "Quarterly" : "Yearly"}
            </button>
            {salesByCategoryData && (
              <span className="text-sm text-gray-500">
                {dateRange === "year" && salesByCategoryData.yearly
                  ? `Year ${salesByCategoryData.yearly.year}`
                  : dateRange === "90days" && salesByCategoryData.quarterly
                    ? salesByCategoryData.quarterly.quarter
                    : dateRange === "30days" && salesByCategoryData.monthly
                      ? salesByCategoryData.monthly.month
                      : "Current Period"}
              </span>
            )}
          </div>
        </div>
        <div className="h-80 w-full">
          {categoryChartData.length > 0 ? (
            <div className="flex items-end justify-center h-64 w-full space-x-8">
              {categoryChartData.map((category, index) => (
                <div key={category.category} className="flex flex-col items-center">
                  <div className="flex flex-col items-center">
                    <div className="flex h-60 items-end">
                      <div
                        className={`w-16 ${category.color} rounded-t-lg transition-all duration-300 hover:opacity-80`}
                        style={{ height: `${(category.sales / maxCategorySales) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <span className="text-sm mt-2 text-gray-700 font-medium">{category.category}</span>
                  <span className="text-xs text-gray-500">{formatCurrency(category.sales)}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-64">
              <p className="text-gray-500">Loading category data...</p>
            </div>
          )}
        </div>
        <div className="flex justify-center mt-4">
          <div className="flex items-center space-x-6">
            {categoryChartData.map((category) => (
              <div key={category.category} className="flex items-center">
                <div className={`w-3 h-3 ${category.color} rounded-sm mr-2`}></div>
                <span className="text-sm text-gray-600">{category.category}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Products Table - Now with Real API Data */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">Top Performing Products</h3>
          <p className="text-sm text-gray-500 mt-1">Products with the highest sales volume and growth</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sales
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Units Sold
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Growth
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentProductsData.length > 0 ? (
                currentProductsData.map((product, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors duration-300">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{product.product_name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{formatCurrency(product.sales)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{product.units_sold}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`text-sm font-medium ${getGrowthClass(product.units_sold_growth_percentage)}`}>
                        {getGrowthSymbol(product.units_sold_growth_percentage)}{" "}
                        {Math.abs(product.units_sold_growth_percentage).toFixed(1)}%
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-6 py-8 text-center">
                    <div className="text-gray-500">
                      <p className="text-sm">No data available for the selected period</p>
                      <p className="text-xs mt-1">
                        {dateRange === "30days"
                          ? "Try selecting a different time period to view data"
                          : dateRange === "90days"
                            ? "Quarterly data is currently not available"
                            : "Switch to yearly view to see available data"}
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
