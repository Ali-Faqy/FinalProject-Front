import { href, useNavigate } from "react-router-dom"
import { User, Truck, CreditCard, Shield, Zap, DollarSign, CheckCircle } from "lucide-react"
import { InsertOrder, InsertOnlineOrder } from "../Data/CheckOut_data"
import { useState } from "react"

function PaymentForm({ formData, onContinue, cart }) {
  const navigate = useNavigate()
  const userId = localStorage.getItem("userId")
  const [isProcessing, setIsProcessing] = useState(false)
  const [selectedPayment, setSelectedPayment] = useState("")

const handleCheckout = async () => {
    setIsProcessing(true)
    setSelectedPayment("stripe")
    try {
      const response = await fetch("http://localhost:8000/payment/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cart }),
      })

      const data = await response.json()
      console.log("Checkout session:", data)
      console.log("Redirecting to:", data.url)
      window.location.href = data.url
    } catch (err) {
      console.error("Checkout failed:", err)
      setIsProcessing(false)
    }
  }

  const handleOnDelivered = async () => {
    setIsProcessing(true)
    setSelectedPayment("cod")

    const mappedCart = cart.map((item) => ({
      product_id: item.id,
      quantity: item.quantity,
    }))

    const subtotal = cart.reduce((acc, item) => {
      const discountedPrice = item.discount > 0 ? item.price * (1 - item.discount / 100) : item.price
      return acc + discountedPrice * item.quantity
    }, 0)

    const shippingEstimate = 20
    const taxEstimate = subtotal * 0.1
    const total_price = subtotal + shippingEstimate + taxEstimate

    const order = {
      user_id: userId,
      total_price: total_price,
      tracking_number: formData.contact.phone.toString(),
      going_location: `${formData.shipping.streetAddress}, ${formData.shipping.city}, ${formData.shipping.state}, ${formData.shipping.country}`,
      number_product: cart.length,
      receiver_name: formData.shipping.fullName,
    }

    const data = await InsertOrder(order, mappedCart)
    if (data) {
      navigate("/checkout/success")
    } else {
      navigate("/checkout/failed")
    }
    setIsProcessing(false)
  }

  return (
    <div className="p-8">
      {/* Enhanced step indicator */}
      <div className="flex flex-row justify-between items-center w-full mb-12">
        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center h-12 w-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full shadow-lg">
            <User className="h-6 w-6 text-white" />
          </div>
          <span className="text-sm font-semibold text-green-600 mt-2">Contact</span>
        </div>

        <div className="flex-1 h-0.5 bg-gradient-to-r from-green-500 to-purple-500 mx-4"></div>

        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center h-12 w-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full shadow-lg">
            <Truck className="h-6 w-6 text-white" />
          </div>
          <span className="text-sm font-semibold text-green-600 mt-2">Shipping</span>
        </div>

        <div className="flex-1 h-0.5 bg-gradient-to-r from-green-500 to-purple-500 mx-4"></div>

        <div className="flex flex-col items-center relative">
          <div className="flex items-center justify-center h-12 w-12 bg-gradient-to-r from-purple-600 to-teal-600 rounded-full shadow-lg relative">
            <CreditCard className="h-6 w-6 text-white" />
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-teal-600 rounded-full animate-pulse opacity-30"></div>
          </div>
          <span className="text-sm font-semibold text-purple-600 mt-2">Payment</span>
          <div className="absolute -bottom-2 w-16 h-1 bg-gradient-to-r from-purple-500 to-teal-500 rounded-full"></div>
        </div>
      </div>

      {/* Enhanced form header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-teal-600 bg-clip-text text-transparent mb-2">
          Payment Method
        </h2>
        <p className="text-gray-600">Choose how you'd like to pay for your order</p>
      </div>

      {/* Enhanced payment options */}
      <div className="space-y-6 mb-12">
        {/* Online Payment Option */}
        <div
          className={`relative group cursor-pointer transition-all duration-300 ${selectedPayment === "stripe" ? "scale-105" : ""}`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur-lg opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
          <div className="relative bg-white/90 backdrop-blur-sm border-2 border-gray-200 rounded-2xl p-6 hover:border-blue-500 transition-all duration-300 shadow-lg hover:shadow-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-3 rounded-xl">
                  <CreditCard className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">Online Payment</h3>
                  <p className="text-gray-600">Visa, MasterCard, PayPal</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Shield className="h-4 w-4 text-green-500" />
                    <span className="text-sm text-green-600 font-medium">Secure & Instant</span>
                  </div>
                </div>
              </div>
              <button
                onClick={handleCheckout}
                disabled={isProcessing}
                className="group/btn relative px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10 flex items-center gap-2">
                  {isProcessing && selectedPayment === "stripe" ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <Zap className="h-4 w-4" />
                      Pay Now
                    </>
                  )}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Cash on Delivery Option */}
        <div
          className={`relative group cursor-pointer transition-all duration-300 ${selectedPayment === "cod" ? "scale-105" : ""}`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl blur-lg opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
          <div className="relative bg-white/90 backdrop-blur-sm border-2 border-gray-200 rounded-2xl p-6 hover:border-green-500 transition-all duration-300 shadow-lg hover:shadow-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-gradient-to-r from-green-500 to-teal-500 p-3 rounded-xl">
                  <DollarSign className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">Cash on Delivery</h3>
                  <p className="text-gray-600">Pay when you receive your order</p>
                  <div className="flex items-center gap-2 mt-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm text-green-600 font-medium">No upfront payment</span>
                  </div>
                </div>
              </div>
              <button
                onClick={handleOnDelivered}
                disabled={isProcessing}
                className="group/btn relative px-6 py-3 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-green-700 to-teal-700 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10 flex items-center gap-2">
                  {isProcessing && selectedPayment === "cod" ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <DollarSign className="h-4 w-4" />
                      Order Now
                    </>
                  )}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced navigation */}
      <div className="flex flex-row justify-between">
        <button
          className="group relative px-8 py-4 border-2 border-gray-300 rounded-xl font-semibold text-gray-700 hover:border-purple-500 hover:text-purple-600 transition-all duration-300 transform hover:scale-105 bg-white/80 backdrop-blur-sm"
          onClick={() => onContinue("shipping")}
          disabled={isProcessing}
        >
          <span className="relative z-10">← Back to Shipping</span>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-50 to-teal-50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </button>

        {/* Security badge */}
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Shield className="h-4 w-4 text-green-500" />
          <span>Your payment information is secure</span>
        </div>
      </div>
    </div>
  )
}

export default PaymentForm
