import { useParams, Link } from "react-router-dom";
import Image from "../../../assets/image1.png";
import { ArrowLeft, Download, Printer, Truck } from "lucide-react";
import Layout from "../UI/Layout.jsx";
import PageContainer from "../UI/PageContainer.jsx";

export default function ViewOrderCustomer() {
  const params = useParams();
  const orderId = params.id;
  console.log("Order ID:", orderId);

  const order = {
    id: orderId,
    customer: {
      name: "John Smith",
      email: "john.smith@example.com",
      phone: "(555) 123-4567",
      address: "123 Main St, New York, NY 10001",
    },
    date: "2023-04-15",
    total: 24500,
    status: "Shipped",
    paymentStatus: "Paid",
    paymentMethod: "Credit Card",
    items: [
      {
        id: 1,
        name: "Compact Tractor X200",
        price: 22000,
        quantity: 1,
        image: "/placeholder.svg?height=80&width=80",
        discount: 10,
      },
      {
        id: 2,
        name: "Tractor Attachment Kit",
        price: 2500,
        quantity: 1,
        image: "/placeholder.svg?height=80&width=80",
        discount: 5,
      },
    ],
    shipping: {
      method: "Standard Delivery",
      cost: 0,
      estimatedDelivery: "2023-04-20",
      trackingNumber: "TRK123456789",
      carrier: "AgriTech Logistics",
    },
    timeline: [
      {
        date: "2023-04-15",
        status: "Order Placed",
        description: "Order #ORD-45782 was placed",
      },
      {
        date: "2023-04-15",
        status: "Payment Confirmed",
        description: "Payment of $24,500 was confirmed",
      },
      {
        date: "2023-04-16",
        status: "Processing",
        description: "Order is being prepared for shipping",
      },
      {
        date: "2023-04-17",
        status: "Shipped",
        description: "Order has been shipped via AgriTech Logistics",
      },
      {
        date: "2023-04-20",
        status: "Estimated Delivery",
        description: "Expected delivery date",
      },
    ],
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Shipped":
        return "bg-blue-100 text-blue-800";
      case "Processing":
        return "bg-yellow-100 text-yellow-800";
      case "Delivered":
        return "bg-green-100 text-green-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPaymentStatusColor = (status) => {
    switch (status) {
      case "Paid":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Refunded":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handlePrintInvoice = () => {
    // Create a print-friendly version
    const printContent = document
      .getElementById("order-details")
      .cloneNode(true);

    // Create a new window for printing
    const printWindow = window.open("", "_blank");

    // Add print-specific styles
    printWindow.document.write(`
      <html>
        <head>
          <title>Invoice #${order.id}</title>
          <style>
            body { font-family: Arial, sans-serif; }
            table { width: 100%; border-collapse: collapse; }
            th, td { padding: 8px; text-align: left; border-bottom: 1px solid #ddd; }
            .invoice-header { display: flex; justify-content: space-between; margin-bottom: 20px; }
            .invoice-title { font-size: 24px; font-weight: bold; }
            @media print {
              button { display: none; }
            }
          </style>
        </head>
        <body>
          <div class="invoice-header">
            <div class="invoice-title">Invoice #${order.id}</div>
            <div>Date: ${order.date}</div>
          </div>
          ${printContent.outerHTML}
        </body>
      </html>
    `);

    // Trigger print and close the window after printing
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.onafterprint = () => printWindow.close();
  };

  return (
    <Layout adminName="Ali Othman">
      <PageContainer title="" description="">
        <Link to="/orders"><button className="flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" />
          <span>Back to Orders</span>
        </button></Link>

        {/* Order Header */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden p-6 gap-2">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 m-0 mr-20">
                Order #{order.id}
              </h1>
              <p className="text-gray-600 m-0 pt-5">Placed on {order.date}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link to={`/orders/${order.id}/track`}><button className="px-4 py-2 flex items-center gap-2 text-white bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 rounded-lg transition-all duration-300 hover:shadow-lg">
                <Truck className="h-4 w-4" />
                <span>Track Order</span>
              </button></Link>
              <button
                className="px-4 py-2 flex items-center gap-2 text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-300"
                onClick={handlePrintInvoice}
              >
                <Printer className="h-4 w-4" />
                <span>Print Invoice</span>
              </button>
              <button
                className="px-4 py-2 flex items-center gap-2 text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-300"
                onClick={() => alert("Downloading invoice...")}
              >
                <Download className="h-4 w-4" />
                <span>Download</span>
              </button>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 mt-6">
            <div className="px-4 py-2 bg-gray-50 rounded-lg h-20">
              <p className="text-sm text-gray-500 m-0">Status</p>
              <span
                className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                  order.status
                )}`}
              >
                {order.status}
              </span>
            </div>
            <div className="px-4 py-2 bg-gray-50 rounded-lg h-20">
              <p className="text-sm text-gray-500 m-0">Payment</p>
              <span
                className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getPaymentStatusColor(
                  order.paymentStatus
                )}`}
              >
                {order.paymentStatus}
              </span>
            </div>
            <div className="px-4 py-2 bg-gray-50 rounded-lg h-20">
              <p className="text-sm text-gray-500 m-0">Total</p>
              <p className="font-medium text-black m-0 pt-1">${order.total.toLocaleString()}</p>
            </div>
            <div className="px-4 py-2 bg-gray-50 rounded-lg h-20">
              <p className="text-sm text-gray-500 m-0">Payment Method</p>
              <p className="font-medium text-black m-0 pt-1">{order.paymentMethod}</p>
            </div>
          </div>
        </div>

        {/* Order Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Order Items */}
          <div className="md:col-span-2 bg-white rounded-xl border border-gray-200 overflow-hidden p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Order Items
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Quantity
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {order.items.map((item) => (
                    <tr
                      key={item.id}
                      className="hover:bg-gray-50 transition-colors duration-300 cursor-pointer"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden">
                            <img
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              width={40}
                              height={40}
                              className="h-full w-full object-contain"
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {item.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          ${item.price.toLocaleString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {item.quantity}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          ${(item.price * item.quantity).toLocaleString()}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-gray-50">
                  <tr>
                    <td
                      colSpan={3}
                      className="px-6 py-3 text-right text-sm font-medium text-gray-500"
                    >
                      Subtotal
                    </td>
                    <td className="px-6 py-3 text-sm font-medium text-gray-900">
                      ${order.total.toLocaleString()}
                    </td>
                  </tr>
                  <tr>
                    <td
                      colSpan={3}
                      className="px-6 py-3 text-right text-sm font-medium text-gray-500"
                    >
                      Shipping
                    </td>
                    <td className="px-6 py-3 text-sm font-medium text-gray-900">
                      ${order.shipping.cost.toLocaleString()}
                    </td>
                  </tr>
                  <tr>
                    <td
                      colSpan={3}
                      className="px-6 py-3 text-right text-sm font-medium text-gray-900"
                    >
                      Total
                    </td>
                    <td className="px-6 py-3 text-sm font-bold text-gray-900">
                      ${(order.total + order.shipping.cost).toLocaleString()}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* Customer Info */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Customer Information
            </h2>
            <div className="space-y-4">
              <div className="flex flex-col items-start gap-1">
                <p className="text-sm text-gray-500 m-0">Name</p>
                <p className="font-medium text-black m-0">{order.customer.name}</p>
              </div>
              <div className="flex flex-col items-start gap-1">
                <p className="text-sm text-gray-500 m-0">Email</p>
                <p className="font-medium text-black m-0">{order.customer.email}</p>
              </div>
              <div className="flex flex-col items-start gap-1">
                <p className="text-sm text-gray-500 m-0">Phone</p>
                <p className="font-medium text-black m-0">{order.customer.phone}</p>
              </div>
              <div className="flex flex-col items-start gap-1">
                <p className="text-sm text-gray-500 m-0">Shipping Address</p>
                <p className="font-medium text-black m-0">{order.customer.address}</p>
              </div>
              <div className="pt-4 border-t border-gray-200 flex flex-col items-start gap-1">
                <p className="text-sm text-gray-500 m-0">Shipping Method</p>
                <p className="font-medium text-black m-0">{order.shipping.method}</p>
              </div>
              <div className="flex flex-col items-start gap-1">
                <p className="text-sm text-gray-500 m-0">Estimated Delivery</p>
                <p className="font-medium text-black m-0">
                  {order.shipping.estimatedDelivery}
                </p>
              </div>
              <div className="flex flex-col items-start gap-1">
                <p className="text-sm text-gray-500 m-0">Tracking Number</p>
                <p className="font-medium text-black m-0">{order.shipping.trackingNumber}</p>
              </div>
              <div className="flex flex-col items-start gap-1">
                <p className="text-sm text-gray-500 m-0">Carrier</p>
                <p className="font-medium text-black m-0">{order.shipping.carrier}</p>
              </div>
            </div>
          </div>
        </div>
      </PageContainer>
    </Layout>
  );
}
