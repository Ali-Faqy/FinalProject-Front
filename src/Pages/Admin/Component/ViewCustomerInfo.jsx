import Layout from "../UI/Layout"
import PageContainer from "../UI/PageContainer"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import {
  Printer,
  X,
  Check,
  Mail,
  Phone,
  MapPin,
  Calendar,
  CreditCard,
  ShoppingBag,
  DollarSign,
  Clock,
  ArrowLeft,
} from "lucide-react"
import { toast } from "react-toastify"
import NoImage from "../../../assets/NoImage.jpg"
import { useLocation } from "react-router-dom"
import { getAllOrderForCustomer } from "../Data/CustomerData.js"

export default function ViewCustomerInfo() {
  const location = useLocation()
  const data = location.state?.customer
  const [isDeleting, setIsDeleting] = useState(false)
  const [showStatusConfirm, setShowStatusConfirm] = useState(false)
  const [customer, setCustomer] = useState(data)
  const [orderHistory, setOrderHistory] = useState([])

  const fetchOrderHistory = async () => {
    try {
      const response = await getAllOrderForCustomer(customer.id)
      if (!response) throw new Error("No orders found")
      
      const data = response.map((item) => ({
        id: item.order_id,
        date: item.order_date,
        items: item.number_product,
        total: item.total_price,
        status: item.order_status,
      }))
      
      setOrderHistory(data)
    } catch (err) {
      console.error("Error fetching orders:", err)
      toast.error("Failed to load order history.", { containerId: "other" })
    }
  }

  useEffect(() => {
    fetchOrderHistory()
  }, [])

  const handleStatusChange = async () => {
    setIsDeleting(true)
    const newStatus = customer.status === "Active" ? "Inactive" : "Active"

    try {
      const response = await fetch(`http://localhost:8000/users/set-status/${customer.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      })

      if (response.ok) {
        setCustomer((prevCustomer) => ({
          ...prevCustomer,
          status: newStatus,
        }))
        toast.success(`Customer ${newStatus.toLowerCase()} successfully!`, { containerId: "other" })
      } else {
        const errorData = await response.json()
        throw new Error(errorData.detail || "Failed to update customer status")
      }
    } catch (error) {
      console.error("Error updating customer status:", error)
      toast.error(error.message || "An error occurred while updating the status.", { containerId: "other" })
    } finally {
      setIsDeleting(false)
      setShowStatusConfirm(false)
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-emerald-100 text-emerald-800"
      case "Inactive":
        return "bg-slate-100 text-slate-800"
      default:
        return "bg-slate-100 text-slate-800"
    }
  }

  const getOrderStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-emerald-100 text-emerald-800"
      case "Processing":
        return "bg-sky-100 text-sky-800"
      case "Cancelled":
        return "bg-rose-100 text-rose-800"
      default:
        return "bg-slate-100 text-slate-800"
    }
  }

  if (!customer) {
    return <div>Loading or customer not found...</div>
  }

  return (
    <Layout adminName={localStorage.getItem("userName") || "Admin"}>
      <PageContainer
        title={customer.name}
        description="Customer details and order history"
        backButton={{
          href: "/customers",
          label: "Back to Customers",
        }}
      >
        <Link to="/customers">
          <button className="flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            <span>Back to Customers</span>
          </button>
        </Link>

        {/* Actions Bar */}
        <div className="flex justify-end gap-3 mb-6">
          <button
            onClick={() => window.print()}
            className="px-4 py-2 flex items-center gap-2 text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors duration-300 shadow-sm"
          >
            <Printer className="h-4 w-4" />
            <span>Print</span>
          </button>
          <button
            onClick={() => setShowStatusConfirm(true)}
            className={`px-4 py-2 flex items-center gap-2 text-white rounded-lg transition-colors duration-300 shadow-sm ${
              customer.status === "Active" ? "bg-amber-500 hover:bg-amber-600" : "bg-emerald-500 hover:bg-emerald-600"
            }`}
          >
            {customer.status === "Active" ? (
              <>
                <X className="h-4 w-4" />
                <span>Deactivate</span>
              </>
            ) : (
              <>
                <Check className="h-4 w-4" />
                <span>Activate</span>
              </>
            )}
          </button>
        </div>

        {/* Customer Profile */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Customer Info Card */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 col-span-1 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="flex flex-col items-center text-center mb-6">
              <div className="relative mb-4">
                <div className="h-24 w-24 rounded-full overflow-hidden border-4 border-white shadow-lg bg-gradient-to-br from-violet-50 to-slate-100">
                  <img
                    src={customer.avatar || NoImage}
                    alt={customer.name}
                    width={120}
                    height={120}
                    className="h-full w-full object-cover"
                  />
                </div>
                <span
                  className={`absolute bottom-0 right-0 h-5 w-5 rounded-full border-2 border-white ${
                    customer.status === "Active" ? "bg-emerald-500" : "bg-slate-400"
                  }`}
                ></span>
              </div>
              <h2 className="text-xl font-semibold text-slate-800">{customer.name}</h2>
              <span
                className={`mt-2 px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                  customer.status,
                )}`}
              >
                {customer.status}
              </span>
            </div>

            <div className="flex flex-col space-y-6">
              <div className="flex flex-row items-start">
                <div className="bg-violet-100 rounded-full p-2">
                  <Mail className="h-4 w-4 text-violet-600" />
                </div>
                <div className="m-0">
                  <p className="text-xs font-medium text-slate-500 m-0 text-start pl-2">Email</p>
                  <p className="text-slate-800 mt-2 text-start">{customer.email}</p>
                </div>
              </div>
              <div className="flex flex-row items-start">
                <div className="bg-violet-100 rounded-full p-2">
                  <Phone className="h-4 w-4 text-emerald-600" />
                </div>
                <div className="m-0">
                  <p className="text-xs font-medium text-slate-500 m-0 text-start pl-2">Phone</p>
                  <p className="text-slate-800 mt-2 text-start">{customer.phone}</p>
                </div>
              </div>
              <div className="flex flex-row items-start">
                <div className="bg-violet-100 rounded-full p-2">
                  <MapPin className="h-4 w-4 text-amber-600" />
                </div>
                <div className="m-0">
                  <p className="text-xs font-medium text-slate-500 m-0 text-start pl-2">Address</p>
                  <p className="text-slate-800 mt-2 text-start">{customer.location}</p>
                </div>
              </div>
              <div className="flex flex-row items-start">
                <div className="bg-violet-100 rounded-full p-2">
                  <Calendar className="h-4 w-4 text-sky-600" />
                </div>
                <div className="m-0">
                  <p className="text-xs font-medium text-slate-500 m-0 text-start pl-2">Customer Since</p>
                  <p className="text-slate-800 mt-2 text-start">{customer.joinDate}</p>
                </div>
              </div>
              <div className="flex flex-row items-start">
                <div className="bg-violet-100 rounded-full p-2">
                  <CreditCard className="h-4 w-4 text-rose-600" />
                </div>
                <div className="m-0">
                  <p className="text-xs font-medium text-slate-500 m-0 text-start pl-2">Payment Method</p>
                  <p className="text-slate-800 mt-2 text-start">{customer.paymentMethod}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Customer Stats and Notes */}
          <div className="col-span-1 lg:col-span-2 space-y-6">
            {/* Stats */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
              <h3 className="text-lg font-medium text-slate-800 mb-4">Customer Statistics</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-violet-50 to-slate-50 rounded-lg p-5 border border-slate-100 shadow-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-violet-100 p-2 rounded-full">
                      <ShoppingBag className="h-4 w-4 text-violet-600" />
                    </div>
                    <p className="text-sm font-medium text-slate-500 m-0">Total Orders</p>
                  </div>
                  <p className="text-2xl font-semibold text-slate-800">{customer.orders}</p>
                </div>
                <div className="bg-gradient-to-br from-emerald-50 to-slate-50 rounded-lg p-5 border border-slate-100 shadow-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-emerald-100 p-2 rounded-full">
                      <DollarSign className="h-4 w-4 text-emerald-600" />
                    </div>
                    <p className="text-sm font-medium text-slate-500 m-0">Total Spent</p>
                  </div>
                  <p className="text-2xl font-semibold text-slate-800">${customer.spent.toLocaleString()}</p>
                </div>
                <div className="bg-gradient-to-br from-amber-50 to-slate-50 rounded-lg p-5 border border-slate-100 shadow-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-amber-100 p-2 rounded-full">
                      <Clock className="h-4 w-4 text-amber-600" />
                    </div>
                    <p className="text-sm font-medium text-slate-500 m-0">Last Order</p>
                  </div>
                  <p className="text-2xl font-semibold text-slate-800">{customer.lastOrder}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Order History */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
          <div className="p-6 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white">
            <h3 className="text-lg font-medium text-slate-800">Order History</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Items
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {orderHistory.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50 transition-colors duration-300">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-slate-900">ORD-{order.id}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-slate-500">{order.date}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-slate-900">{order.items}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-slate-900">${order.total.toLocaleString()}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getOrderStatusColor(
                          order.status,
                        )}`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link to={`/orders/${order.id}/view`} className="text-violet-600 hover:text-violet-900 font-medium">
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Status Confirmation Modal */}
        {showStatusConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
            <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-xl border border-slate-200">
              <h3 className="text-lg font-medium text-slate-900 mb-4">
                {customer.status === "Active" ? "Deactivate" : "Activate"} Customer
              </h3>
              <p className="text-slate-600 mb-6">
                {customer.status === "Active"
                  ? "Are you sure you want to deactivate this customer? They will no longer be able to place orders."
                  : "Are you sure you want to activate this customer? They will be able to place orders again."}
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowStatusConfirm(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors duration-300 shadow-sm"
                  disabled={isDeleting}
                >
                  Cancel
                </button>
                <button
                  onClick={handleStatusChange}
                  className={`px-4 py-2 text-white rounded-lg transition-colors duration-300 flex items-center gap-2 shadow-sm ${
                    customer.status === "Active"
                      ? "bg-amber-500 hover:bg-amber-600"
                      : "bg-emerald-500 hover:bg-emerald-600"
                  }`}
                  disabled={isDeleting}
                >
                  {isDeleting ? (
                    <>
                      <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>{customer.status === "Active" ? "Deactivating..." : "Activating..."}</span>
                    </>
                  ) : (
                    <>
                      {customer.status === "Active" ? <X className="h-4 w-4" /> : <Check className="h-4 w-4" />}
                      <span>{customer.status === "Active" ? "Deactivate" : "Activate"}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </PageContainer>
    </Layout>
  )
}