import { User, Truck, CreditCard, MapPin, Building, Globe } from "lucide-react"
import { useState } from "react"
import { toast } from "react-toastify"

function ShippingForm({ formData, updateFormData, onContinue }) {
  const [shippingData, setShippingData] = useState({
    fullName: formData.shipping.fullName || "",
    streetAddress: formData.shipping.streetAddress || "",
    city: formData.shipping.city || "",
    state: formData.shipping.state || "",
    country: formData.shipping.country || "",
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setShippingData((prev) => ({ ...prev, [name]: value }))
  }

  const handleContinue = (e) => {
    e.preventDefault()
    if (
      !shippingData.fullName ||
      !shippingData.streetAddress ||
      !shippingData.city ||
      !shippingData.state ||
      !shippingData.country
    ) {
      toast.error("Please fill in all required fields.", { containerId: "other" })
      return
    }
    updateFormData(shippingData)
    onContinue()
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

        <div className="flex flex-col items-center relative">
          <div className="flex items-center justify-center h-12 w-12 bg-gradient-to-r from-purple-600 to-teal-600 rounded-full shadow-lg relative">
            <Truck className="h-6 w-6 text-white" />
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-teal-600 rounded-full animate-pulse opacity-30"></div>
          </div>
          <span className="text-sm font-semibold text-purple-600 mt-2">Shipping</span>
          <div className="absolute -bottom-2 w-16 h-1 bg-gradient-to-r from-purple-500 to-teal-500 rounded-full"></div>
        </div>

        <div className="flex-1 h-0.5 bg-gradient-to-r from-purple-200 to-gray-200 mx-4"></div>

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
          Shipping Information
        </h2>
        <p className="text-gray-600">Where should we deliver your order?</p>
      </div>

      {/* Enhanced form fields */}
      <div className="space-y-6">
        {/* Full Name */}
        <div className="relative">
          <label className="block text-gray-700 font-semibold mb-2">
            <User className="h-4 w-4 inline mr-2" />
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="fullName"
            value={shippingData.fullName}
            onChange={handleInputChange}
            placeholder="John Doe"
            required
            autoComplete="on"
            className="w-full h-14 border-2 rounded-xl border-gray-300 focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-100 pl-4 text-lg transition-all duration-300 bg-white/80 backdrop-blur-sm"
          />
        </div>

        {/* Street Address */}
        <div className="relative">
          <label className="block text-gray-700 font-semibold mb-2">
            <MapPin className="h-4 w-4 inline mr-2" />
            Street Address <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="streetAddress"
            value={shippingData.streetAddress}
            onChange={handleInputChange}
            placeholder="123 Main Street, Apt 4B"
            required
            autoComplete="on"
            className="w-full h-14 border-2 rounded-xl border-gray-300 focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-100 pl-4 text-lg transition-all duration-300 bg-white/80 backdrop-blur-sm"
          />
        </div>

        {/* City and State */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative">
            <label className="block text-gray-700 font-semibold mb-2">
              <Building className="h-4 w-4 inline mr-2" />
              City <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="city"
              value={shippingData.city}
              onChange={handleInputChange}
              placeholder="New York"
              required
              autoComplete="on"
              className="w-full h-14 border-2 rounded-xl border-gray-300 focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-100 pl-4 text-lg transition-all duration-300 bg-white/80 backdrop-blur-sm"
            />
          </div>

          <div className="relative">
            <label className="block text-gray-700 font-semibold mb-2">
              State/Province <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="state"
              value={shippingData.state}
              onChange={handleInputChange}
              placeholder="NY"
              required
              autoComplete="on"
              className="w-full h-14 border-2 rounded-xl border-gray-300 focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-100 pl-4 text-lg transition-all duration-300 bg-white/80 backdrop-blur-sm"
            />
          </div>
        </div>

        {/* Country */}
        <div className="relative">
          <label className="block text-gray-700 font-semibold mb-2">
            <Globe className="h-4 w-4 inline mr-2" />
            Country <span className="text-red-500">*</span>
          </label>
          <select
            name="country"
            value={shippingData.country}
            onChange={handleInputChange}
            required
            autoComplete="on"
            className="w-full h-14 border-2 rounded-xl border-gray-300 focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-100 pl-4 text-lg transition-all duration-300 bg-white/80 backdrop-blur-sm appearance-none cursor-pointer"
          >
            <option value="" disabled>
              Select a Country
            </option>
            <option value="pl">Palestine</option>
          </select>
        </div>
      </div>

      {/* Enhanced navigation buttons */}
      <div className="flex flex-row justify-between mt-12">
        <button
          className="group relative px-8 py-4 border-2 border-gray-300 rounded-xl font-semibold text-gray-700 hover:border-purple-500 hover:text-purple-600 transition-all duration-300 transform hover:scale-105 bg-white/80 backdrop-blur-sm"
          onClick={() => onContinue("contact")}
        >
          <span className="relative z-10">← Back to Contact</span>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-50 to-teal-50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </button>

        <button
          className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-teal-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 overflow-hidden"
          onClick={handleContinue}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-teal-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <span className="relative z-10">Continue to Payment →</span>
          <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shimmer"></div>
        </button>
      </div>
    </div>
  )
}

export default ShippingForm
