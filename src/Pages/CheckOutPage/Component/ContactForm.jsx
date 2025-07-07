import { Link } from "react-router-dom"
import { User, Truck, CreditCard, Mail, Phone, CheckCircle } from "lucide-react"
import { useState } from "react"
import { toast } from "react-toastify"

function ContactForm({ formData, updateFormData, onContinue }) {
  const [user_id] = useState(localStorage.getItem("userId"))
  const [contactData, setContactData] = useState({
    email: formData.email || "",
    phone: formData.phone || "",
  })
  const [emailError, setEmailError] = useState("")
  const [isValidEmail, setIsValidEmail] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setContactData((prev) => ({ ...prev, [name]: value }))
    if (name === "email") {
      setEmailError("")
      setIsValidEmail(validateEmail(value))
    }
  }

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleContinue = (e) => {
    e.preventDefault()
    if (!contactData.email || !contactData.phone) {
      toast.error("Please fill in all required fields.", { containerId: "other" })
      return
    }
    if (!validateEmail(contactData.email)) {
      toast.error("Please enter a valid email address.", { containerId: "other" })
      return
    }
    updateFormData(contactData)
    onContinue()
  }

  return (
    <div className="p-8">
      {/* Enhanced step indicator */}
      <div className="flex flex-row justify-between items-center w-full mb-12">
        <div className="flex flex-col items-center relative">
          <div className="flex items-center justify-center h-12 w-12 bg-gradient-to-r from-purple-600 to-teal-600 rounded-full shadow-lg relative">
            <User className="h-6 w-6 text-white" />
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-teal-600 rounded-full animate-pulse opacity-30"></div>
          </div>
          <span className="text-sm font-semibold text-purple-600 mt-2">Contact</span>
          <div className="absolute -bottom-2 w-16 h-1 bg-gradient-to-r from-purple-500 to-teal-500 rounded-full"></div>
        </div>

        <div className="flex-1 h-0.5 bg-gradient-to-r from-purple-200 to-gray-200 mx-4"></div>

        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center h-12 w-12 bg-gray-200 rounded-full">
            <Truck className="h-6 w-6 text-gray-400" />
          </div>
          <span className="text-sm text-gray-400 mt-2">Shipping</span>
        </div>

        <div className="flex-1 h-0.5 bg-gray-200 mx-4"></div>

        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center h-12 w-12 bg-gray-200 rounded-full">
            <CreditCard className="h-6 w-6 text-gray-400" />
          </div>
          <span className="text-sm text-gray-400 mt-2">Payment</span>
        </div>
      </div>

      {/* Enhanced form header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-teal-600 bg-clip-text text-transparent mb-2">
          Contact Information
        </h2>
        <p className="text-gray-600">We'll use this information to send you order updates</p>
      </div>

      {/* Enhanced form fields */}
      <div className="space-y-6">
        {/* Email field */}
        <div className="relative">
          <label className="block text-gray-700 font-semibold mb-2">
            <Mail className="h-4 w-4 inline mr-2" />
            Email Address <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="email"
              name="email"
              value={contactData.email}
              onChange={handleInputChange}
              placeholder="your.email@example.com"
              required
              autoComplete="on"
              className="w-full h-14 border-2 rounded-xl border-gray-300 focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-100 pl-4 pr-12 text-lg transition-all duration-300 bg-white/80 backdrop-blur-sm"
            />
            {isValidEmail && (
              <CheckCircle className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-green-500" />
            )}
          </div>
          {emailError && (
            <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
              <span className="w-1 h-1 bg-red-500 rounded-full"></span>
              {emailError}
            </p>
          )}
        </div>

        {/* Phone field */}
        <div className="relative">
          <label className="block text-gray-700 font-semibold mb-2">
            <Phone className="h-4 w-4 inline mr-2" />
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            name="phone"
            value={contactData.phone}
            onChange={handleInputChange}
            placeholder="+1 (555) 123-4567"
            required
            autoComplete="on"
            className="w-full h-14 border-2 rounded-xl border-gray-300 focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-100 pl-4 text-lg transition-all duration-300 bg-white/80 backdrop-blur-sm"
          />
        </div>
      </div>

      {/* Enhanced navigation buttons */}
      <div className="flex flex-row justify-between mt-12">
        <Link to={`/cart/${user_id}`}>
          <button className="group relative px-8 py-4 border-2 border-gray-300 rounded-xl font-semibold text-gray-700 hover:border-purple-500 hover:text-purple-600 transition-all duration-300 transform hover:scale-105 bg-white/80 backdrop-blur-sm">
            <span className="relative z-10">← Back to Cart</span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-50 to-teal-50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </Link>

        <button
          className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-teal-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 overflow-hidden"
          onClick={handleContinue}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-teal-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <span className="relative z-10">Continue to Shipping →</span>
          <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shimmer"></div>
        </button>
      </div>
    </div>
  )
}

export default ContactForm
