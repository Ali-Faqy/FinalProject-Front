import { useState, useEffect } from "react"
import Layout from "../UI/Layout.jsx"
import PageContainer from "../UI/PageContainer.jsx"
import { ProductsAnalytics } from "./ProductsAnalytics.jsx"
import { getSalesAnalytics, getSalesByRegion } from "../Data/AnalyticsData.js"
import { getMonthlySales } from "../Data/DashboardData.js"
import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

export default function AnalyticsPage() {
  const [activeTab, setActiveTab] = useState("sales")
  const [salesData, setSalesData] = useState(null)
  const [monthlySales, setMonthlySales] = useState([])
  const [regionData, setRegionData] = useState([])

  // Fetch general sales analytics
  const fetchSalesAnalytics = async () => {
    try {
      const data = await getSalesAnalytics()
      setSalesData(data)
    } catch (error) {
      console.error("Error fetching sales analytics:", error)
    }
  }

  const fetchMonthlySales = async () => {
    try {
      const data = await getMonthlySales()
      setMonthlySales(data)
    } catch (error) {
      console.error("Error fetching monthly sales:", error)
    }
  }

  const fetchSalesByRegion = async () => {
    try {
      const data = await getSalesByRegion()
      // Sort by percentage in descending order for better visualization
      const sortedData = data.sort((a, b) => b.percentage - a.percentage)
      setRegionData(sortedData)
    } catch (error) {
      console.error("Error fetching sales by region:", error)
    }
  }

  useEffect(() => {
    fetchSalesAnalytics()
    fetchMonthlySales()
    fetchSalesByRegion()
  }, [])

  // Prepare chart data dynamically based on monthlySales
  const chartData = {
    labels: monthlySales.map((item) => item.month),
    datasets: [
      {
        label: "Monthly Revenue ($)",
        data: monthlySales.map((item) => item.sales),
        borderColor: "rgb(34, 197, 94)",
        backgroundColor: "rgba(34, 197, 94, 0.2)",
        fill: true,
        tension: 0.4,
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Monthly Revenue",
        font: {
          size: 18,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Revenue ($)",
        },
      },
      x: {
        title: {
          display: true,
          text: "Month",
        },
      },
    },
  }

  // Generate colors for regions
  const getRegionColor = (index) => {
    const colors = [
      "bg-green-500",
      "bg-blue-500",
      "bg-yellow-500",
      "bg-purple-500",
      "bg-red-500",
      "bg-indigo-500",
      "bg-pink-500",
      "bg-orange-500",
      "bg-teal-500",
      "bg-cyan-500",
      "bg-lime-500",
      "bg-amber-500",
      "bg-emerald-500",
    ]
    return colors[index % colors.length]
  }

  // Generate pie chart segments
  const generatePieChartSegments = () => {
    if (regionData.length === 0) return []

    let cumulativePercentage = 0
    return regionData.map((region, index) => {
      const startAngle = (cumulativePercentage / 100) * 360
      const endAngle = ((cumulativePercentage + region.percentage) / 100) * 360
      cumulativePercentage += region.percentage

      return {
        ...region,
        startAngle,
        endAngle,
        color: getRegionColor(index),
      }
    })
  }

  const pieSegments = generatePieChartSegments()

  if (!salesData || monthlySales.length === 0) {
    return <div>Loading sales analytics...</div>
  }

  return (
    <Layout adminName={localStorage.getItem("userName") || "Admin"}>
      <PageContainer title="Analytics" description="Track and analyze your business performance">
        {/* Actions Bar */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="flex items-center space-x-2">
            <button
              className={`px-4 py-2 rounded-lg transition-colors duration-300 ${
                activeTab === "sales"
                  ? "bg-green-500 text-white"
                  : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
              }`}
              onClick={() => setActiveTab("sales")}
            >
              Sales
            </button>
            <button
              className={`px-4 py-2 rounded-lg transition-colors duration-300 ${
                activeTab === "products"
                  ? "bg-green-500 text-white"
                  : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
              }`}
              onClick={() => setActiveTab("products")}
            >
              Products
            </button>
          </div>
        </div>

        {/* Sales Analytics */}
        {activeTab === "sales" && (
          <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 transition-all duration-300 hover:shadow-md">
                <h3 className="text-sm font-medium text-gray-500 mb-2">Total Revenue</h3>
                <div className="flex items-baseline">
                  <span className="text-2xl font-bold text-gray-900">
                    ${salesData.current_month_revenue.toFixed(2)}
                  </span>
                  {salesData.previous_month_revenue && salesData.previous_month_revenue !== 0 ? (
                    ((salesData.current_month_revenue - salesData.previous_month_revenue) /
                      salesData.previous_month_revenue) *
                      100 >
                    0 ? (
                      <span className="ml-2 text-sm text-green-600">
                        {(
                          ((salesData.current_month_revenue - salesData.previous_month_revenue) /
                            salesData.previous_month_revenue) *
                          100
                        ).toFixed(2)}
                        %
                      </span>
                    ) : (
                      <span className="ml-2 text-sm text-red-600">
                        {(
                          ((salesData.current_month_revenue - salesData.previous_month_revenue) /
                            salesData.previous_month_revenue) *
                          100
                        ).toFixed(2)}
                        %
                      </span>
                    )
                  ) : (
                    <span className="ml-2 text-sm text-gray-500">N/A</span>
                  )}
                </div>
                <div className="text-xs text-gray-500 mt-1">Compared to last month</div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 transition-all duration-300 hover:shadow-md">
                <h3 className="text-sm font-medium text-gray-500 mb-2">Average Order Value</h3>
                <div className="flex items-baseline">
                  <span className="text-2xl font-bold text-gray-900">
                    ${salesData.current_month_avg_order_value.toFixed(2)}
                  </span>
                  {salesData.previous_month_avg_order_value && salesData.previous_month_avg_order_value !== 0 ? (
                    ((salesData.current_month_avg_order_value - salesData.previous_month_avg_order_value) /
                      salesData.previous_month_avg_order_value) *
                      100 >
                    0 ? (
                      <span className="ml-2 text-sm text-green-600">
                        {(
                          ((salesData.current_month_avg_order_value - salesData.previous_month_avg_order_value) /
                            salesData.previous_month_avg_order_value) *
                          100
                        ).toFixed(2)}
                        %
                      </span>
                    ) : (
                      <span className="ml-2 text-sm text-red-600">
                        {(
                          ((salesData.current_month_avg_order_value - salesData.previous_month_avg_order_value) /
                            salesData.previous_month_avg_order_value) *
                          100
                        ).toFixed(2)}
                        %
                      </span>
                    )
                  ) : (
                    <span className="ml-2 text-sm text-gray-500">N/A</span>
                  )}
                </div>
                <div className="text-xs text-gray-500 mt-1">Compared to last month</div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 transition-all duration-300 hover:shadow-md">
                <h3 className="text-sm font-medium text-gray-500 mb-2">Conversion Rate</h3>
                <div className="flex items-baseline">
                  <span className="text-2xl font-bold text-gray-900">
                    {(salesData.current_month_conversion_rate * 100).toFixed(2)}%
                  </span>
                  {salesData.previous_month_conversion_rate && salesData.previous_month_conversion_rate !== 0 ? (
                    ((salesData.current_month_conversion_rate - salesData.previous_month_conversion_rate) /
                      salesData.previous_month_conversion_rate) *
                      100 >
                    0 ? (
                      <span className="ml-2 text-sm text-green-600">
                        {(
                          ((salesData.current_month_conversion_rate - salesData.previous_month_conversion_rate) /
                            salesData.previous_month_conversion_rate) *
                          100
                        ).toFixed(2)}
                        %
                      </span>
                    ) : (
                      <span className="ml-2 text-sm text-red-600">
                        {(
                          ((salesData.current_month_conversion_rate - salesData.previous_month_conversion_rate) /
                            salesData.previous_month_conversion_rate) *
                          100
                        ).toFixed(2)}
                        %
                      </span>
                    )
                  ) : (
                    <span className="ml-2 text-sm text-gray-500">N/A</span>
                  )}
                </div>
                <div className="text-xs text-gray-500 mt-1">Compared to last month</div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 transition-all duration-300 hover:shadow-md">
                <h3 className="text-sm font-medium text-gray-500 mb-2">Total Orders</h3>
                <div className="flex items-baseline">
                  <span className="text-2xl font-bold text-gray-900">{salesData.current_month_orders.toFixed(0)}</span>
                  {salesData.previous_month_orders && salesData.previous_month_orders !== 0 ? (
                    ((salesData.current_month_orders - salesData.previous_month_orders) /
                      salesData.previous_month_orders) *
                      100 >
                    0 ? (
                      <span className="ml-2 text-sm text-green-600">
                        {(
                          ((salesData.current_month_orders - salesData.previous_month_orders) /
                            salesData.previous_month_orders) *
                          100
                        ).toFixed(2)}
                        %
                      </span>
                    ) : (
                      <span className="ml-2 text-sm text-red-600">
                        {(
                          ((salesData.current_month_orders - salesData.previous_month_orders) /
                            salesData.previous_month_orders) *
                          100
                        ).toFixed(2)}
                        %
                      </span>
                    )
                  ) : (
                    <span className="ml-2 text-sm text-gray-500">N/A</span>
                  )}
                </div>
                <div className="text-xs text-gray-500 mt-1">Compared to last month</div>
              </div>
            </div>

            {/* Sales Chart - Dynamic Chart.js */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-800">Monthly Revenue</h3>
                <div className="flex items-center space-x-2">
                  <button className="px-3 py-1 text-sm bg-green-100 text-green-600 rounded-lg transition-colors duration-300 hover:bg-opacity-80">
                    Monthly
                  </button>
                  <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-300">
                    Yearly
                  </button>
                </div>
              </div>
              <div className="h-64 w-full">
                <Line data={chartData} options={chartOptions} />
              </div>
            </div>

            {/* Sales by Region - Dynamic Data */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Sales by Region</h3>
              {regionData.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    {regionData.map((region, index) => (
                      <div key={region.region}>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-gray-600 truncate max-w-32" title={region.region}>
                            {region.region}
                          </span>
                          <span className="text-sm font-medium">{region.percentage.toFixed(1)}%</span>
                        </div>
                        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${getRegionColor(index)} rounded-full transition-all duration-300`}
                            style={{ width: `${region.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="relative w-48 h-48">
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                        {pieSegments.map((segment, index) => {
                          const radius = 45
                          const circumference = 2 * Math.PI * radius
                          const strokeDasharray = `${(segment.percentage / 100) * circumference} ${circumference}`
                          const strokeDashoffset = -(
                            (pieSegments.slice(0, index).reduce((sum, s) => sum + s.percentage, 0) / 100) *
                            circumference
                          )

                          return (
                            <circle
                              key={segment.region}
                              cx="50"
                              cy="50"
                              r={radius}
                              fill="transparent"
                              stroke={segment.color.replace("bg-", "").replace("-500", "")}
                              strokeWidth="10"
                              strokeDasharray={strokeDasharray}
                              strokeDashoffset={strokeDashoffset}
                              className={`${segment.color.replace("bg-", "stroke-")}`}
                            />
                          )
                        })}
                      </svg>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-32">
                  <p className="text-gray-500">Loading region data...</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "products" && <ProductsAnalytics />}
      </PageContainer>
    </Layout>
  )
}
