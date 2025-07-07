import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../UI/Layout.jsx";
import PageContainer from "../UI/PageContainer.jsx";
import { ArrowLeft } from "lucide-react";
import { getPurchaseOrderById, editPaymentStatus } from "../Data/PurchaseOrderData.js";

export default function PurchaseOrderViewPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrder = async () => {
    try {
      setIsLoading(true);
      const data = await getPurchaseOrderById(id);
      if (data) {
        setOrder({
          id: id,
          date: data.order_date,
          paymentStatus: data.payment_status || "Not Paid",
          supplier: data.supplier_info.name,
          contactPerson: data.supplier_info.contactPerson || "N/A",
          contactEmail: data.supplier_info.email,
          contactPhone: data.supplier_info.phone,
          expectedDelivery: data.expectedDelivery || "",
          products: data.order_items.map((item, index) => ({
            id: `product-${index}`,
            name: item.product_name,
            price: item.price,
            quantity: item.quantity,
          })),
          notes: data.note || "",
        });
      }
    } catch (error) {
      console.error("Error fetching order by id:", error);
      setError("Failed to load order details.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [id]);

  const getPaymentColor = (status) => {
    switch (status) {
      case "Paid":
        return "bg-emerald-100 text-emerald-800 border border-emerald-200";
      case "Partially Paid":
        return "bg-amber-100 text-amber-800 border border-amber-200";
      case "Not Paid":
        return "bg-rose-100 text-rose-800 border border-rose-200";
      default:
        return "bg-slate-100 text-slate-800 border border-slate-200";
    }
  };

  const handleSave = async () => {
    await editPaymentStatus(order.id, order.paymentStatus);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    fetchOrder();
  };

  const updateOrderField = (field, value) => {
    if (field === "paymentStatus") {
      setOrder((prev) => ({ ...prev, [field]: value }));
    }
  };

  const calculateTotal = () =>
    order?.products.reduce((sum, p) => sum + p.price * p.quantity, 0) || 0;

  if (isLoading) {
    return (
      <Layout adminName="Ali Othman">
        <PageContainer title="Purchase Orders" description="Manage your supplier purchase orders">
          <div className="p-6 max-w-7xl mx-auto bg-gradient-to-b from-slate-50 to-white min-h-screen">
            <p>Loading...</p>
          </div>
        </PageContainer>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout adminName="Ali Othman">
        <PageContainer title="Purchase Orders" description="Manage your supplier purchase orders">
          <div className="p-6 max-w-7xl mx-auto bg-gradient-to-b from-slate-50 to-white min-h-screen">
            <p className="text-red-600">{error}</p>
            <button
              onClick={() => navigate("/admin/orders/purchase")}
              className="flex items-center text-slate-600 hover:text-slate-900 transition-colors font-medium"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Purchase Orders
            </button>
          </div>
        </PageContainer>
      </Layout>
    );
  }

  if (!order) {
    return (
      <Layout adminName="Ali Othman">
        <PageContainer title="Purchase Orders" description="Manage your supplier purchase orders">
          <div className="p-6 max-w-7xl mx-auto bg-gradient-to-b from-slate-50 to-white min-h-screen">
            <p>Order not found.</p>
            <button
              onClick={() => navigate("/admin/orders/purchase")}
              className="flex items-center text-slate-600 hover:text-slate-900 transition-colors font-medium"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Purchase Orders
            </button>
          </div>
        </PageContainer>
      </Layout>
    );
  }

  return (
    <Layout adminName="Ali Othman">
      <PageContainer title="Purchase Orders" description="Manage your supplier purchase orders">
        <div className="p-6 max-w-7xl mx-auto bg-gradient-to-b from-slate-50 to-white min-h-screen space-y-8">
          {/* Header with actions */}
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate("/admin/orders/purchase")}
                className="flex items-center text-slate-600 hover:text-slate-900 transition-colors font-medium"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Purchase Orders
              </button>
            </div>
            <div className="flex items-center space-x-3">
              {isEditing ? (
                <>
                  <button
                    onClick={handleCancel}
                    className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors font-medium text-sm shadow-sm"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors font-medium text-sm shadow-sm"
                  >
                    Save Changes
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-lg transition-colors font-medium text-sm shadow-sm flex items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1.5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                  Edit Payment Status
                </button>
              )}
            </div>
          </div>

          {/* Order ID and Status Banner */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-slate-100">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-2xl font-bold text-slate-800 m-0">Purchase Order #{order.id}</h1>
                <p className="text-slate-500 mt-1 text-start">
                  Created on{" "}
                  {new Date(order.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                </p>
              </div>
              <div className="flex items-center">
                <div className="mr-3 text-right">
                  <p className="text-sm text-slate-500 m-0">Payment Status</p>
                  {isEditing ? (
                    <select
                      value={order.paymentStatus}
                      onChange={(e) => updateOrderField("paymentStatus", e.target.value)}
                      className="mt-1 border border-slate-300 rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-sky-theory
                      focus:border-sky-500 outline-none"
                    >
                      <option>Paid</option>
                      <option>Partially Paid</option>
                      <option>Not Paid</option>
                    </select>
                  ) : (
                    <span
                      className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-medium ${getPaymentColor(order.paymentStatus)}`}
                    >
                      {order.paymentStatus}
                    </span>
                  )}
                </div>
                <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Info Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            {/* Order Info */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-slate-100">
              <div className="bg-gradient-to-r from-sky-50 to-sky-100 px-6 py-4 border-b border-slate-100">
                <h2 className="font-semibold text-slate-800 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2 text-sky-600"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 2a1 1 0 011 1v1h8V3a1 1 0 112 0v1h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2h1V3a1 1 0 011-1zm2 5a1 1 0 011-1h4a1 1 0 110 2H8a1 1 0 01-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Order Details
                </h2>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 text-sm">Order Date</span>
                  <span className="text-slate-800 font-medium">{order.date}</span>
                </div>
                <div className="border-t border-slate-100 pt-4 flex justify-between items-center">
                  <span className="text-slate-500 text-sm">Total Items</span>
                  <span className="text-slate-800 font-medium">{order.products.length}</span>
                </div>
                <div className="border-t border-slate-100 pt-4 flex justify-between items-center">
                  <span className="text-slate-500 text-sm">Total Quantity</span>
                  <span className="text-slate-800 font-medium">
                    {order.products.reduce((sum, p) => sum + p.quantity, 0)}
                  </span>
                </div>
              </div>
            </div>

            {/* Supplier Info */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-slate-100">
              <div className="bg-gradient-to-r from-purple-50 to-purple-100 px-6 py-4 border-b border-slate-100">
                <h2 className="font-semibold text-slate-800 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2 text-purple-600"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                  </svg>
                  Supplier Information
                </h2>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 text-sm">Supplier Name</span>
                  <span className="text-slate-800 font-medium">{order.supplier}</span>
                </div>
                <div className="border-t border-slate-100 pt-4 flex justify-between items-center">
                  <span className="text-slate-500 text-sm">Contact Person</span>
                  <span className="text-slate-800 font-medium">{order.contactPerson}</span>
                </div>
                <div className="border-t border-slate-100 pt-4 flex justify-between items-center">
                  <span className="text-slate-500 text-sm">Email</span>
                  <span className="text-slate-800 font-medium">{order.contactEmail}</span>
                </div>
                <div className="border-t border-slate-100 pt-4 flex justify-between items-center">
                  <span className="text-slate-500 text-sm">Phone</span>
                  <span className="text-slate-800 font-medium">{order.contactPhone}</span>
                </div>
              </div>
            </div>

            {/* Financial Summary */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-slate-100">
              <div className="bg-gradient-to-r from-emerald-50 to-emerald-100 px-6 py-4 border-b border-slate-100">
                <h2 className="font-semibold text-slate-800 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2 text-emerald-600"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Financial Summary
                </h2>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 text-sm">Subtotal</span>
                  <span className="text-slate-800 font-medium">
                    ${calculateTotal().toLocaleString()}
                  </span>
                </div>
                <div className="border-t border-slate-100 pt-4 flex justify-between items-center">
                  <span className="text-slate-500 text-sm">Tax</span>
                  <span className="text-slate-800 font-medium">$0.00</span>
                </div>
                <div className="border-t border-slate-100 pt-4 flex justify-between items-center">
                  <span className="text-slate-700 font-semibold">Total Amount</span>
                  <span className="text-emerald-600 font-bold text-xl">${calculateTotal().toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-slate-100">
            <div className="bg-gradient-to-r from-amber-50 to-amber-100 px-6 py-4 border-b border-slate-100">
              <h2 className="font-semibold text-slate-800 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2 text-amber-600"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                </svg>
                Order Items
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50">
                    <th className="text-left p-4 font-medium text-slate-600">Product</th>
                    <th className="text-left p-4 font-medium text-slate-600">Price</th>
                    <th className="text-left p-4 font-medium text-slate-600">Qty</th>
                    <th className="text-right p-4 font-medium text-slate-600">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {order.products.map((product, index) => (
                    <tr
                      key={product.id}
                      className={`${index !== order.products.length - 1 ? "border-b border-slate-100" : ""}`}
                    >
                      <td className="p-4">
                        <div className="font-medium text-slate-800">{product.name}</div>
                      </td>
                      <td className="p-4">
                        <div className="text-slate-700">${product.price.toLocaleString()}</div>
                      </td>
                      <td className="p-4">
                        <div className="text-slate-700">{product.quantity}</div>
                      </td>
                      <td className="p-4 text-right">
                        <div className="font-medium text-slate-800">
                          ${(product.price * product.quantity).toLocaleString()}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-slate-50 border-t border-slate-200">
                    <td colSpan={4} className="p-4 text-right font-medium text-slate-700">
                      Total:
                    </td>
                    <td className="p-4 text-right font-bold text-emerald-600">${calculateTotal().toLocaleString()}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* Notes */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-slate-100">
            <div className="bg-gradient-to-r from-slate-50 to-slate-100 px-6 py-4 border-b border-slate-100">
              <h2 className="font-semibold text-slate-800 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2 text-slate-600"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z"
                    clipRule="evenodd"
                  />
                </svg>
                Notes
              </h2>
            </div>
            <div className="p-6">
              <div className="bg-slate-50 p-4 rounded-lg text-slate-700 border border-slate-100">
                {order.notes || "No notes available."}
              </div>
            </div>
          </div>
        </div>
      </PageContainer>
    </Layout>
  );
}