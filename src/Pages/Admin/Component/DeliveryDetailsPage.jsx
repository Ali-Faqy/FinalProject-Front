import { useState, useEffect } from "react"
import { ArrowLeft, Calendar, Clock, MapPin, Package, Printer, Truck, User } from "lucide-react"
import {Link, useParams} from "react-router-dom"
import Layout from "../UI/Layout.jsx"
import PageContainer from "../UI/PageContainer.jsx"
import { getDeliveryDetails } from "../Data/DeliveryData.js"
export default function DeliveryDetailsPage() {
  const params = useParams()
  const [deliveryDetails, setDeliveryDetails] = useState(null)
  
  const fetchDeliveryDetails = async () => {
      try {
        const data = await getDeliveryDetails(params.id);
        if (data) {
          setDeliveryDetails(data);
        } else {
          console.error("No Deliveries found.");
        }
      } catch (error) {
        console.error("Error fetching deliveries:", error);
      }
    };
  
    useEffect(() => {
      fetchDeliveryDetails();
    }, []);
  // useEffect(() => {
  //   // Simulate fetching delivery data
  //   setTimeout(() => {
  //     setDelivery({
  //       id: params.id,
  //       orderId: "ORD-45782",
  //       customer: {
  //         name: "John Smith",
  //         company: "Smith Farming Co.",
  //         phone: "+1 (555) 123-4567",
  //         email: "john.smith@example.com",
  //         address: "123 Main St, New York, NY 10001",
  //         notes: "Repeat customer, 5+ previous orders",
  //       },
  //       date: "2023-04-20",
  //       estimatedDelivery: "2023-04-20 14:00-16:00",
  //       status: "In Transit",
  //       statusHistory: [
  //         { status: "Order Placed", timestamp: "2023-04-15 09:23:45", note: "Order received and confirmed" },
  //         { status: "Processing", timestamp: "2023-04-16 11:30:22", note: "Order being prepared for shipment" },
  //         { status: "Shipped", timestamp: "2023-04-18 08:15:37", note: "Order has left our warehouse" },
  //         { status: "In Transit", timestamp: "2023-04-19 14:45:10", note: "Order is on the way to delivery address" },
  //       ],
  //       products: [
  //         {
  //           id: "PROD-1234",
  //           name: "Compact Tractor X200",
  //           price: 12500,
  //           quantity: 1,
  //           image: "/placeholder.svg?height=80&width=80",
  //         },
  //         {
  //           id: "PROD-5678",
  //           name: "Front Loader Attachment",
  //           price: 2300,
  //           quantity: 1,
  //           image: "/placeholder.svg?height=80&width=80",
  //         },
  //       ],
  //       shipping: {
  //         method: "Flatbed Truck",
  //         cost: 350,
  //         trackingNumber: "TRK-987654321",
  //         insurance: "Full Coverage",
  //         specialInstructions: "Requires forklift for unloading",
  //       },
  //       driver: {
  //         name: "Michael Johnson",
  //         phone: "+1 (555) 987-6543",
  //         vehicleId: "TRK-78901",
  //         photo: "/placeholder.svg?height=100&width=100",
  //       },
  //       currentLocation: {
  //         lat: 40.7128,
  //         lng: -74.006,
  //         lastUpdated: "2023-04-19 16:30:45",
  //         address: "Interstate 95, 10 miles from destination",
  //       },
  //       notes: "Customer requested delivery to back entrance. Gate code: 1234",
  //       documents: [
  //         { name: "Delivery Manifest", type: "PDF", size: "245 KB" },
  //         { name: "Equipment Manual", type: "PDF", size: "1.2 MB" },
  //         { name: "Warranty Information", type: "PDF", size: "180 KB" },
  //       ],
  //     })
  //     setLoading(false)
  //   }, 1000)
  // }, [params.id])

  const getStatusColor = (status) => {
    switch (status) {
      case "Order Placed":
        return "bg-blue-100 text-blue-800"
      case "Processing":
        return "bg-purple-100 text-purple-800"
      case "Shipped":
        return "bg-yellow-100 text-yellow-800"
      case "In Transit":
        return "bg-orange-100 text-orange-800"
      case "Out for Delivery":
        return "bg-indigo-100 text-indigo-800"
      case "Delivered":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  if (!deliveryDetails) {
    return (
      <Layout adminName={"Ali othman"}>
        <PageContainer title="Delivery Details" description="Loading delivery information...">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="h-64 bg-gray-200 rounded"></div>
              <div className="h-64 bg-gray-200 rounded"></div>
            </div>
            <div className="h-40 bg-gray-200 rounded mt-6"></div>
          </div>
        </PageContainer>
      </Layout>
    )
  }

  return (
    <Layout adminName={"Ali othman"}>
      <PageContainer
        title={`Delivery Details: ORD-${deliveryDetails.order_id}`}
        description="View complete information about this delivery"
        backButton={
          <Link
            href="/delivery"
            className="flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Deliveries
          </Link>
        }
      >
        {/* Header Actions */}
        <div className="flex flex-wrap gap-3 mb-6">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(deliveryDetails.order_status)}`}>
            {deliveryDetails.order_status}
          </span>
          <Link
            to={`/delivery/${deliveryDetails.order_id}/track`}
            className="px-4 py-1 bg-green-600 text-white rounded-full text-sm hover:bg-green-700 transition-colors"
          >
            Track Delivery
          </Link>
          <button className="px-4 py-1 bg-white border border-gray-200 rounded-full text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-1">
            <Printer className="h-3 w-3" />
            Print
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Order Information */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 md:col-span-1 h-[350px]">
            <h2 className="text-xl font-semibold mb-4">Order Information</h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <Package className="h-5 w-5 text-gray-500" />
                <div className="flex flex-col">
                  <p className="text-sm text-gray-500 m-0 mr-6">Order ID</p>
                  <p className="font-medium text-black m-0">ORD-{deliveryDetails.order_id}</p>
                </div>
              </div>
              <div className="flex items-start">
                <Calendar className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                <div className="flex flex-col">
                  <p className="text-sm text-gray-500 m-0 mr-6">Order Date</p>
                  <p className="font-medium text-black m-0 ml-1 pr-2">{deliveryDetails.order_date}</p>
                </div>
              </div>
              <div className="flex items-start">
                <Clock className="h-5 w-5 text-gray-500"/>
                <div className="flex flex-col">
                  <p className="text-sm text-gray-500 m-0 mr-[55px]">Estimated Delivery</p>
                  <p className="font-medium text-black m-0 ml-3">{deliveryDetails.estimated_delivery}</p>
                </div>
              </div>
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-gray-500" />
                <div className="flex flex-col">
                  <p className="text-sm text-gray-500 m-0 mr-[140px]">Delivery Address</p>
                  <p className="font-medium text-black m-0 ml-3">{deliveryDetails.going_location}</p>
                </div>
              </div>
              <div className="flex items-start">
                <User className="h-5 w-5 text-gray-500" />
                <div className="flex flex-col">
                  <p className="text-sm text-gray-500 m-0 mr-[140px]">Reciver Name</p>
                  <p className="font-medium text-black m-0 ml-3">{deliveryDetails.receiver_name}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Customer Information */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 md:col-span-1 h-[350px]">
            <h2 className="text-xl font-semibold mb-4">Customer Information</h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <User className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500 m-0 mr-9">Name</p>
                  <p className="font-medium text-black m-0 ml-3">{deliveryDetails.user_name}</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="h-5 w-5 flex items-center justify-center text-gray-500">📱</div>
                <div>
                  <p className="text-sm text-gray-500 m-0 mr-[100px]">Phone</p>
                  <p className="font-medium text-black m-0 ml-3">{deliveryDetails.tracking_number}</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="h-5 w-5 flex items-center justify-center text-gray-500">✉️</div>
                <div>
                  <p className="text-sm text-gray-500 m-0 mr-[160px]">Email</p>
                  <p className="font-medium text-black m-0 ml-3">{deliveryDetails.user_email}</p>
                </div>
              </div>
                <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
                  <p className="text-sm text-gray-700">Repeat customer, {deliveryDetails.number_of_orders_by_user}+ previous orders</p>
                </div>
            </div>
          </div>

          {/* Shipping Information */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 md:col-span-1 h-[350px]">
            <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <Truck className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500 m-0 mr-[50px]">Method</p>
                  <p className="font-medium text-black m-0 ml-3">{deliveryDetails.shipping_method}</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="h-5 w-5 flex items-center justify-center text-gray-500">💰</div>
                <div>
                  <p className="text-sm text-gray-500 m-0 ml-4">Shipping Cost</p>
                  <p className="font-medium text-black m-0 ml-3 pr-5">{formatCurrency(deliveryDetails.total_cost)}</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="h-5 w-5 flex items-center justify-center text-gray-500">🔢</div>
                <div>
                  <p className="text-sm text-gray-500 m-0">Tracking Number</p>
                  <p className="font-medium text-black m-0 ml-3">{deliveryDetails.tracking_number}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Products */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mt-6">
          <h2 className="text-xl font-semibold mb-4">Products</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {deliveryDetails.products.map((product) => (
                  <tr key={product.product_id} className="hover:bg-gray-50">
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          src={product.attachments[0] || "/placeholder.svg"}
                          alt={product.product_name}
                          className="h-10 w-10 rounded-md mr-3 object-cover"
                        />
                        <div>
                          <p className="font-medium text-gray-900">{product.product_name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{product.product_id}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{product.quantity}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {formatCurrency(product.price)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-gray-50">
                  <td colSpan={3} className="px-4 py-3 text-right text-sm font-medium text-gray-500">
                    Subtotal:
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">
                    {formatCurrency(
                      deliveryDetails.products.reduce(
                        (sum, product) => sum + product.price * product.quantity,
                        0,
                      ),
                    )}
                  </td>
                  <td colSpan={2}></td>
                </tr>
                <tr className="bg-gray-50">
                  <td colSpan={3} className="px-4 py-3 text-right text-sm font-medium text-gray-700">
                    Total:
                  </td>
                  <td className="px-4 py-3 text-sm font-bold text-gray-900">
                    {formatCurrency(
                      deliveryDetails.products.reduce(
                        (sum, product) => sum + product.price * product.quantity,
                        0,
                      )
                    )}
                  </td>
                  <td colSpan={2}></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Driver Information */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mt-6">
          <h2 className="text-xl font-semibold mb-4 m-0">Driver Information</h2>
          <div className="flex items-center">
            <img
              src={deliveryDetails.driver_avatar || "/placeholder.svg"}
              alt={deliveryDetails.driver_name}
              className="w-16 h-16 rounded-full mr-4 object-cover"
            />
            <div>
              <p className="font-medium text-lg m-0 text-black mr-[55px]">{deliveryDetails.driver_name}</p>
              <p className="text-gray-500 m-0 pr-8">Vehicle ID: {deliveryDetails.vehicle_id}</p>
              <p className="text-gray-500 m-0">Phone: {deliveryDetails.driver_phone}</p>
            </div>
          </div>
        </div>
      </PageContainer>
    </Layout>
  )
}
