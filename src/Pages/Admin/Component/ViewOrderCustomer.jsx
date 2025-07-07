import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ArrowLeft, Download, Printer, Truck } from "lucide-react";
import Layout from "../UI/Layout.jsx";
import PageContainer from "../UI/PageContainer.jsx";
import NoImage from "../.../../../../assets/NoImage.jpg";
import {
  getCustomerInfo,
  getOrderInfo,
  getProductsInOrder,
} from "../Data/CustomerData.js";
export default function ViewOrderCustomer() {
  const params = useParams();
  const navigate = useNavigate();
  const orderId = params.id;
  const [customerInfo, setCustomerInfo] = useState({});
  const [orderInfo, setOrderInfo] = useState({});
  const [orderProduct, setOrderProduct] = useState([]);
  const fetchCustomerInfo = async () => {
    try {
      const data = await getCustomerInfo(orderId);
      if (data) {
        const customer = {
          name: data.user_name,
          email: data.user_email,
        };
        setCustomerInfo(customer);
      }
    } catch (error) {
      console.error("Error fetching customer info:", error);
    }
  };
  const fetchOrderInfo = async () => {
    try {
      const data = await getOrderInfo(orderId);
      if (data) {
        const order = {
          id: data.order_id,
          reciverName: data.receiver_name,
          trackingNumber: data.tracking_number,
          shippingMethod: data.payment_method,
          estimatedDelivery: data.estimated_delivery,
          orderDate: new Date(data.order_date).toISOString().split("T")[0],
          total: data.total_price,
          status: data.order_status,
          paymentStatus: data.payment == true ? "Pending" : "Paid",
          paymentMethod: data.payment_method,
        };
        setOrderInfo(order);
      }
    } catch (error) {
      console.error("Error fetching order info:", error);
    }
  };

  const fetchProductsInOrder = async () => {
    try {
      const response = await getProductsInOrder(orderId);

      if (response) {
        const products = response.map((item) => ({
          id: item.product_id,
          name: item.product_name,
          price: item.selling_price,
          quantity: item.quantity,
          image: item.attachments[0] == null ? NoImage : item.attachments[0],
          discount: item.offer_percentage || 0,
        }));
        setOrderProduct(products);
      }
    } catch (error) {
      console.error("Error fetching products in order:", error);
    }
  };

  useEffect(() => {
    fetchCustomerInfo();
    fetchOrderInfo();
    fetchProductsInOrder();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "Order Placed":
        return "bg-blue-100 text-blue-800";
      case "Processing":
        return "bg-yellow-100 text-yellow-800";
      case "Shipped":
        return "bg-orange-100 text-orange-800";
      case "In Transit":
        return "bg-purple-100 text-purple-800";
      case "Out for Delivery":
        return "bg-teal-100 text-teal-800";

      case "Delivered":
        return "bg-green-100 text-green-800";
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
          <title>Invoice #${orderId}</title>
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
            <div class="invoice-title">Invoice #${orderId}</div>
            <div>Date: ${orderInfo.date}</div>
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
        <button
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          <span>Back to Orders</span>
        </button>

        {/* Order Header */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden p-6 gap-2">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 m-0 mr-20">
                Order #{orderId}
              </h1>
              <p className="text-gray-600 m-0 pt-5">
                Placed on {orderInfo.orderDate}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link to={`/admin/orders/customers/${orderId}/track`}>
                <button className="px-4 py-2 flex items-center gap-2 text-white bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 rounded-lg transition-all duration-300 hover:shadow-lg">
                  <Truck className="h-4 w-4" />
                  <span>Track Order</span>
                </button>
              </Link>
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
                  orderInfo.status
                )}`}
              >
                {orderInfo.status}
              </span>
            </div>
            <div className="px-4 py-2 bg-gray-50 rounded-lg h-20">
              <p className="text-sm text-gray-500 m-0">Payment</p>
              <span
                className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getPaymentStatusColor(
                  orderInfo.paymentStatus
                )}`}
              >
                {orderInfo.paymentStatus}
              </span>
            </div>
            <div className="px-4 py-2 bg-gray-50 rounded-lg h-20">
              <p className="text-sm text-gray-500 m-0">Total</p>
              <p className="font-medium text-black m-0 pt-1">
                ${orderInfo.total ? orderInfo.total.toLocaleString() : "0.00"}
              </p>
            </div>
            <div className="px-4 py-2 bg-gray-50 rounded-lg h-20">
              <p className="text-sm text-gray-500 m-0">Payment Method</p>
              <p className="font-medium text-black m-0 pt-1">
                {orderInfo.paymentMethod}
              </p>
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
                      Original Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Discount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Quantity
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Item Total
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {orderProduct.map((item) => {
                    const discountAmount = item.price * (item.discount / 100);
                    const discountedPrice = item.price - discountAmount;
                    const itemTotal = discountedPrice * item.quantity;

                    return (
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
                          <div className="text-sm text-green-600 font-medium">
                            {item.discount}% (−$
                            {discountAmount.toLocaleString()})
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {item.quantity}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            ${itemTotal.toLocaleString()}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot className="bg-gray-50">
                  <tr>
                    <td
                      colSpan={4}
                      className="px-6 py-3 text-right text-sm font-medium text-gray-900"
                    >
                      Total
                    </td>
                    <td className="px-6 py-3 text-sm font-bold text-gray-900">
                      ${orderInfo.total}
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
                <p className="font-medium text-black m-0">
                  {customerInfo.name}
                </p>
              </div>
              <div className="flex flex-col items-start gap-1">
                <p className="text-sm text-gray-500 m-0">Email</p>
                <p className="font-medium text-black m-0">
                  {customerInfo.email}
                </p>
              </div>
              <h2 className="text-lg font-semibold text-gray-800 border-t border-gray-200">
                Order Information
              </h2>
              <div className="flex flex-col items-start gap-1">
                <p className="text-sm text-gray-500 m-0">Receiver Name</p>
                <p className="font-medium text-black m-0">
                  {orderInfo.reciverName}
                </p>
              </div>
              <div className="pt-1 flex flex-col items-start gap-1">
                <p className="text-sm text-gray-500 m-0">Shipping Method</p>
                <p className="font-medium text-black m-0">
                  {orderInfo.shippingMethod}
                </p>
              </div>
              <div className="flex flex-col items-start gap-1">
                <p className="text-sm text-gray-500 m-0">Estimated Delivery</p>
                <p className="font-medium text-black m-0">
                  {orderInfo.estimatedDelivery}
                </p>
              </div>
              <div className="flex flex-col items-start gap-1">
                <p className="text-sm text-gray-500 m-0">Tracking Number</p>
                <p className="font-medium text-black m-0">
                  {orderInfo.trackingNumber}
                </p>
              </div>
              <div className="flex flex-col items-start gap-1">
                <p className="text-sm text-gray-500 m-0">Carrier</p>
                <p className="font-medium text-black m-0">Moedati</p>
              </div>
            </div>
          </div>
        </div>
      </PageContainer>
    </Layout>
  );
}
