import { useState } from "react"
import { Link } from "react-router-dom"
import { useParams, useLocation } from "react-router-dom"
import Navigation from "../../HomePage/Component/Navication.jsx"
import ShippingForm from "./ShippingForm.jsx"
import PaymentForm from "./PaymentForm.jsx"
import ContactForm from "./ContactForm.jsx"
import { ChevronRight, CreditCard, Sparkles, ShoppingBag, Shield, Star } from "lucide-react"
import CartSummary from "./CartSummary.jsx"

function CheckOutPage() {
  const { userId } = useParams()
  const location = useLocation()
  const [step, setStep] = useState("contact")
  const [formData, setFormData] = useState({
    contact: { email: "", phone: "" },
    shipping: { fullName: "", streetAddress: "", city: "", state: "", country: "" },
  })

  const updateFormData = (section, data) => {
    setFormData((prev) => ({
      ...prev,
      [section]: { ...prev[section], ...data },
    }))
  }

  const renderStepForm = () => {
    switch (step) {
      case "contact":
        return (
          <ContactForm
            formData={formData.contact}
            updateFormData={(data) => updateFormData("contact", data)}
            onContinue={() => setStep("shipping")}
          />
        )
      case "shipping":
        return (
          <ShippingForm
            formData={{ contact: formData.contact, shipping: formData.shipping }}
            updateFormData={(data) => updateFormData("shipping", data)}
            onContinue={(next) => setStep(next === "contact" ? "contact" : "payment")}
          />
        )
      case "payment":
        return (
          <PaymentForm
            formData={formData}
            updateFormData={updateFormData}
            onContinue={(next) => setStep(next === "shipping" ? "shipping" : "payment")}
            cart={location.state?.cart || []}
          />
        )
      default:
        return null
    }
  }

  const { cart, total } = location.state || { cart: [], total: 0 }

  return (
    <div className="min-h-screen w-screen overflow-x-hidden bg-gradient-to-br from-slate-50 via-purple-50 to-teal-50 relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-teal-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <Navigation />

      {/* Enhanced Header Section */}
      <div className="relative z-10 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Enhanced breadcrumb */}
          <div className="mb-8 flex items-center justify-center">
            <div className="flex items-center bg-white/90 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg border border-white/30 hover:shadow-xl transition-all duration-300">
              <Link
                to="/home"
                className="text-gray-600 hover:text-purple-600 transition-colors font-medium flex items-center gap-1 group"
              >
                <span className="group-hover:scale-110 transition-transform duration-200">🏠</span>
                Home
              </Link>
              <ChevronRight className="text-gray-400 mx-3 h-4 w-4 animate-pulse" />
              <Link
                to={`/cart/${userId}`}
                className="text-gray-600 hover:text-purple-600 transition-colors font-medium flex items-center gap-1 group"
              >
                <ShoppingBag className="h-4 w-4 group-hover:animate-bounce" />
                Cart
              </Link>
              <ChevronRight className="text-gray-400 mx-3 h-4 w-4 animate-pulse" />
              <Link to={`/checkout/${userId}`} className="text-purple-600 font-bold flex items-center gap-1">
                <CreditCard className="h-4 w-4 animate-bounce" />
                Checkout
              </Link>
            </div>
          </div>

          {/* Enhanced hero section */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-teal-500 rounded-full blur-lg opacity-40 group-hover:opacity-60 transition-opacity duration-300 animate-pulse"></div>
                <div className="relative bg-gradient-to-r from-purple-600 to-teal-600 p-4 rounded-full shadow-xl">
                  <CreditCard className="h-10 w-10 text-white animate-bounce" />
                </div>
                {/* Floating elements around the icon */}
                <div className="absolute -top-2 -right-2 animate-float">
                  <Shield className="h-5 w-5 text-green-500" />
                </div>
                <div className="absolute -bottom-2 -left-2 animate-float delay-1000">
                  <Star className="h-4 w-4 text-yellow-500" />
                </div>
              </div>

              <div>
                <h1 className="m-0 text-5xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 bg-clip-text text-transparent mb-2">
                  Secure Checkout
                </h1>
                <div className="flex items-center justify-center gap-2">
                  <Sparkles className="h-5 w-5 text-yellow-500 animate-pulse" />
                  <span className="text-xl text-gray-600 font-medium">Complete your order safely & securely</span>
                  <Sparkles className="h-5 w-5 text-yellow-500 animate-pulse delay-500" />
                </div>
              </div>
            </div>

            {/* Enhanced description with features */}
            <div className="max-w-4xl mx-auto">
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Review your order details and complete your purchase with confidence. Your payment information is
                protected with industry-standard encryption.
              </p>

              {/* Trust indicators */}
              <div className="flex items-center justify-center gap-8 flex-wrap">
                <div className="flex items-center gap-2 bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full shadow-md">
                  <Shield className="h-5 w-5 text-green-500" />
                  <span className="text-sm font-medium text-gray-700">SSL Secured</span>
                </div>
                <div className="flex items-center gap-2 bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full shadow-md">
                  <CreditCard className="h-5 w-5 text-blue-500" />
                  <span className="text-sm font-medium text-gray-700">Multiple Payment Options</span>
                </div>
                <div className="flex items-center gap-2 bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full shadow-md">
                  <Star className="h-5 w-5 text-yellow-500" />
                  <span className="text-sm font-medium text-gray-700">Trusted by Thousands</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start justify-center w-full min-h-[650px] px-4 pb-8 relative z-10">
        {/* Enhanced form container */}
        <div className="flex-1 max-w-4xl bg-white/80 backdrop-blur-sm rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
          <div className="relative">
            {/* Progress indicator background */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-200 to-teal-200"></div>
            <div
              className="absolute top-0 left-0 h-1 bg-gradient-to-r from-purple-500 to-teal-500 transition-all duration-500 ease-out"
              style={{
                width: step === "contact" ? "33.33%" : step === "shipping" ? "66.66%" : "100%",
              }}
            ></div>

            {renderStepForm()}
          </div>
        </div>

        {/* Enhanced cart summary */}
        <div className="w-full lg:w-96 bg-white/80 backdrop-blur-sm rounded-3xl border border-white/20 shadow-2xl overflow-hidden h-fit sticky top-4">
          <CartSummary cart={cart} total={total} />
        </div>
      </div>
    </div>
  )
}

export default CheckOutPage
