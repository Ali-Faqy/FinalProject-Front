import { useState, useEffect } from "react";
import { ArrowLeft, Plus, Save, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Select from 'react-select';
import Layout from "../UI/Layout.jsx";
import PageContainer from "../UI/PageContainer.jsx";
import { getAllSupplier, insertPurchaseOrder } from "../Data/PurchaseOrderData.js";
import { getAllProducts } from "../../ProductsPage/Code/Product_data.js";

export default function NewPurchaseOrderPage() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [suppliers, setSuppliers] = useState([]);
  const [products, setProducts] = useState([]);

  const fetchAllSuppliers = async () => {
    try {
      const data = await getAllSupplier();
      if (data) {
        setSuppliers(data);
      }
    } catch (error) {
      console.error("Error fetching suppliers:", error);
    }
  };

  const fetchAllProducts = async () => {
    try {
      const data = await getAllProducts();
      if (data) {
        setProducts(data);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchAllSuppliers();
    fetchAllProducts();
  }, []);

  // Initial order with specified values
  const [order, setOrder] = useState({
    payment_status: "Not Paid",
    supplier_id: null,
    note: "",
    products: [
    ],
  });

  const updateOrderField = (field, value) => {
    setOrder((prevOrder) => ({
      ...prevOrder,
      [field]: value,
    }));
  };

  const updateProductField = (productId, field, value) => {
    if (field === "product_id") {
      const selectedProduct = products.find((p) => p.product_id === value);
      setOrder((prevOrder) => ({
        ...prevOrder,
        products: prevOrder.products.map((product) =>
          product.product_id === productId
            ? {
                ...product,
                product_id: value,
                price: selectedProduct ? selectedProduct.selling_price : 0,
                total_price: selectedProduct ? selectedProduct.selling_price * product.quantity : 0,
              }
            : product
        ),
      }));
    } else {
      setOrder((prevOrder) => ({
        ...prevOrder,
        products: prevOrder.products.map((product) =>
          product.product_id === productId
            ? {
                ...product,
                [field]: field === "quantity" ? Number(value) : value,
                total_price: field === "quantity" ? product.price * Number(value) : product.quantity * (field === "price" ? Number(value) : product.price),
              }
            : product
        ),
      }));
    }
  };

  const addProduct = () => {
    setOrder((prevOrder) => ({
      ...prevOrder,
      products: [
        ...prevOrder.products,
        {
          product_id: null,
          price: 0,
          quantity: 1,
          total_price: 0,
        },
      ],
    }));
  };

  const removeProduct = (productId) => {
    if (order.products.length <= 1) {
      alert("Order must have at least one product");
      return;
    }

    setOrder((prevOrder) => ({
      ...prevOrder,
      products: prevOrder.products.filter((product) => product.product_id !== productId),
    }));
  };

  // Calculate total based on current products
  const calculateTotal = () => {
    return order.products.reduce((sum, product) => sum + product.total_price, 0);
  };

  const handleSubmit = async () => {
    if (!order.supplier_id) {
      alert("Please select a supplier");
      return;
    }

    if (
      !order.products.every(
        (product) =>
          product.product_id &&
          product.price > 0 &&
          product.quantity > 0 &&
          product.total_price > 0
      )
    ) {
      alert("Please select valid products with complete details");
      return;
    }

    setIsSubmitting(true);
    await insertPurchaseOrder(order)
    setIsSubmitting(false);
    setOrder({
      payment_status: "Not Paid",
      supplier_id: null,
      note: "",
      products: [
      ],
    });


  };

  // Format options for react-select
  const productOptions = products.map((product) => ({
    value: product.product_id,
    label: `${product.product_name} (${product.remaining_quantity} available)`,
  }));

  if (!suppliers || !products) {
    return (
      <Layout adminName="Ali Othman">
        <PageContainer
          title="Loading..."
          description="Please wait while we load the data."
        >
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-gray-500">Loading suppliers and products...</div>
          </div>
        </PageContainer>
      </Layout>
    );
  }

  return (
    <Layout adminName="Ali Othman">
      <PageContainer
        title="Purchase Orders"
        description="Manage your supplier purchase orders"
      >
        <div className="bg-gray-50 min-h-screen">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex justify-between items-center mb-6">
              <div className="flex flex-col items-start gap-2">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => navigate("/admin/orders/purchase")}
                    className="flex items-center text-slate-600 hover:text-slate-900 transition-colors font-medium"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Purchase Orders
                  </button>
                </div>
                <h1 className="text-2xl font-bold text-gray-900 m-0">
                  Create New Purchase Order
                </h1>
              </div>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="h-4 w-4" />
                {isSubmitting ? "Creating..." : "Create Order"}
              </button>
            </div>

            {/* Order Information Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              {/* Order Information Card */}
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Order Information
                  </h3>
                  <p className="text-sm text-gray-500">
                    Basic details about this purchase order
                  </p>
                </div>
                <div className="p-4">
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm font-medium text-gray-500 mb-1">
                        Payment Status
                      </div>
                      <select
                        value={order.payment_status}
                        onChange={(e) =>
                          updateOrderField("payment_status", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      >
                        <option value="Paid">Paid</option>
                        <option value="Partially Paid">Partially Paid</option>
                        <option value="Not Paid">Not Paid</option>
                      </select>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-500 mb-1">
                        Supplier ID *
                      </div>
                      <select
                        value={order.supplier_id}
                        onChange={(e) =>
                          updateOrderField("supplier_id", Number(e.target.value))
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        required
                      >
                        <option value="">Select a supplier</option>
                        {suppliers.map((supplier) => (
                          <option
                            key={supplier.supplier_id}
                            value={supplier.supplier_id}
                          >
                            {supplier.supplier_name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              {/* Order Summary Card */}
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Order Summary
                  </h3>
                  <p className="text-sm text-gray-500">
                    Financial summary of this order
                  </p>
                </div>
                <div className="p-4">
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm font-medium text-gray-500 mb-1">
                        Total Items
                      </div>
                      <div className="font-medium">{order.products.length}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-500 mb-1">
                        Total Quantity
                      </div>
                      <div className="font-medium">
                        {order.products.reduce(
                          (sum, product) => sum + product.quantity,
                          0
                        )}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-500 mb-1">
                        Subtotal
                      </div>
                      <div className="font-medium">
                        $
                        {order.products
                          .reduce(
                            (sum, product) => sum + product.total_price,
                            0
                          )
                          .toLocaleString()}
                      </div>
                    </div>
                    <div className="border-t border-gray-200 pt-4">
                      <div className="text-sm font-medium text-gray-500 mb-1">
                        Total Amount
                      </div>
                      <div className="text-xl font-bold text-green-600">
                        ${calculateTotal().toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Items Card */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden mb-6">
              <div className="p-4 border-b border-gray-200 flex flex-row items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Order Items
                  </h3>
                  <p className="text-sm text-gray-500">
                    Products included in this purchase order
                  </p>
                </div>
                <button
                  onClick={addProduct}
                  className="px-3 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Add Product
                </button>
              </div>
              <div className="p-4 overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-500">
                        Product Name *
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500">
                        Price *
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500">
                        Quantity
                      </th>
                      <th className="text-right py-3 px-4 font-medium text-gray-500">
                        Total
                      </th>
                      <th className="py-3 px-4"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.products.map((product) => (
                      <tr key={product.product_id} className="border-b border-gray-200">
                        <td className="py-3 px-4 w-1/3">
                          <Select
                            options={productOptions}
                            value={productOptions.find(
                              (option) => option.value === product.product_id
                            )}
                            onChange={(selectedOption) =>
                              updateProductField(
                                product.product_id,
                                "product_id",
                                selectedOption ? selectedOption.value : null
                              )
                            }
                            placeholder="Search for a product..."
                            isClearable
                            isSearchable
                            className="text-sm"
                            styles={{
                              control: (base) => ({
                                ...base,
                                borderColor: '#d1d5db',
                                '&:hover': { borderColor: '#10b981' },
                                boxShadow: 'none',
                              }),
                              option: (base, state) => ({
                                ...base,
                                backgroundColor: state.isSelected
                                  ? '#10b981'
                                  : state.isFocused
                                  ? '#e6fffa'
                                  : 'white',
                                color: state.isSelected ? 'white' : '#374151',
                              }),
                            }}
                          />
                        </td>
                        <td className="py-3 px-4">
                          <input
                            type="number"
                            value={product.price}
                            onChange={(e) =>
                              updateProductField(
                                product.product_id,
                                "price",
                                e.target.value
                              )
                            }
                            className="w-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            required
                          />
                        </td>
                        <td className="py-3 px-4">
                          <input
                            type="number"
                            value={product.quantity}
                            onChange={(e) =>
                              updateProductField(
                                product.product_id,
                                "quantity",
                                e.target.value
                              )
                            }
                            className="w-20 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            min="1"
                            required
                          />
                        </td>
                        <td className="py-3 px-4 text-right">
                          ${product.total_price.toLocaleString()}
                        </td>
                        <td className="py-3 px-4">
                          <button
                            onClick={() => removeProduct(product.product_id)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-full"
                          >
                            <Trash className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Notes Card */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Notes</h3>
                <p className="text-sm text-gray-500">
                  Additional information about this order
                </p>
              </div>
              <div className="p-4">
                <textarea
                  className="w-full min-h-[100px] p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  value={order.note}
                  onChange={(e) => updateOrderField("note", e.target.value)}
                  placeholder="Enter any additional notes or instructions for this order"
                />
              </div>
            </div>
          </div>
        </div>
      </PageContainer>
    </Layout>
  );
}