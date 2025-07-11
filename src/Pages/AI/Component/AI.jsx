import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronRight, Star, ShoppingCart, Info } from 'lucide-react'
import Navigation from "../../HomePage/Component/Navication"
import NoImage from "../../../assets/NoImage.jpg"
const AIDesignPage = () => {
  const [showWelcome, setShowWelcome] = useState(true)
  const [showInput, setShowInput] = useState(false)
  const [inputValue, setInputValue] = useState("")
  const [showResults, setShowResults] = useState(false)
  const [hoveredItem, setHoveredItem] = useState(null)
  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const inputRef = useRef(null)
  const [isInputFocused, setIsInputFocused] = useState(false)

  // Animation sequence on load
  useEffect(() => {
    const welcomeTimer = setTimeout(() => {
      setShowInput(true)
    }, 1000)
    return () => clearTimeout(welcomeTimer)
  }, [])

  // Handle input submission with API call
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (inputValue.trim()) {
      setIsLoading(true)
      try {
        const response = await fetch("http://localhost:8000/AI/recommend/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query: inputValue }),
        })

        if (!response.ok) {
          throw new Error("API request failed")
        }

        const data = await response.json()
        setItems(data)
        setShowWelcome(false)
        setShowResults(true)
      } catch (error) {
        console.error("Error fetching AI recommendations:", error)
        // You could show an error message here
      } finally {
        setIsLoading(false)
      }
    }
  }
  
  

  // Format price with currency
  const formatPrice = (price) => `$${price.toLocaleString()}`

  // Get availability status with color
  const getAvailabilityStatus = (product) => {
    if (!product.availability_status) return { text: "Out of Stock", color: "bg-red-500" }
    if (product.remaining_quantity <= 5) return { text: "Limited Stock", color: "bg-yellow-500" }
    return { text: "In Stock", color: "bg-green-500" }
  }

  // Get land size badge color
  const getLandSizeColor = (size) => {
    switch (size.toLowerCase()) {
      case "small":
        return "bg-blue-100 text-blue-800"
      case "medium":
        return "bg-green-100 text-green-800"
      case "large":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }
  const getDriveThumbnail = (url) => {
      if (!url || url.trim() === "") return NoImage
      const match = url.match(/\/d\/([^/]+)\//)
      return match ? `https://drive.google.com/thumbnail?id=${match[1]}` : url
    }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Navigation Breadcrumb */}
      <Navigation />
      <div className="flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-6xl">
          {/* Background subtle patterns */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-100 rounded-full filter blur-[100px] opacity-30 animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-100 rounded-full filter blur-[100px] opacity-30 animate-pulse delay-1000"></div>

          {/* Welcome message animation */}
          <AnimatePresence>
            {showWelcome && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-4xl font-light mb-16 text-center text-gray-800"
              >
                Welcome to AI Product Search
              </motion.div>
            )}
          </AnimatePresence>

          {/* Input section */}
          <AnimatePresence>
            {showInput && (
              <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                className="w-full max-w-2xl mx-auto mb-16 relative z-10"
                onSubmit={handleSubmit}
              >
                <div className={`relative glow-input-wrapper ${isInputFocused ? "focused" : ""}`}>
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onFocus={() => setIsInputFocused(true)}
                    onBlur={() => setIsInputFocused(false)}
                    placeholder="What agricultural tool do you need? (e.g., cutting grass in small land)"
                    className="w-full px-6 py-4 bg-white border border-gray-200 rounded-full text-gray-800 placeholder-gray-400 focus:outline-none transition-all duration-300 shadow-sm"
                    disabled={isLoading}
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-400 to-purple-400 text-white p-2 rounded-full hover:shadow-lg transition-all duration-300 disabled:opacity-50"
                    disabled={!inputValue.trim() || isLoading}
                  >
                    {isLoading ? (
                      <div className="animate-spin h-6 w-6 border-2 border-white border-t-transparent rounded-full"></div>
                    ) : (
                      <ChevronRight className="h-6 w-6" />
                    )}
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>

          {/* Results section */}
          <AnimatePresence>
            {showResults && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, staggerChildren: 0.1 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {items.map((item, index) => {
                  const availability = getAvailabilityStatus(item)
                  const isHovered = hoveredItem === item.product_id

                  return (
                    <motion.div
                      key={item.product_id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className={`relative ${isHovered ? "z-10" : ""}`}
                      onMouseEnter={() => setHoveredItem(item.product_id)}
                      onMouseLeave={() => setHoveredItem(null)}
                    >
                      <div
                        className={`bg-white border border-gray-200 rounded-xl p-6 h-full transition-all duration-300 hover:shadow-xl ${
                          isHovered ? "shadow-xl scale-105" : "shadow-sm"
                        }`}
                      >
                        {/* Header with ID and Rating */}
                        <div className="flex items-start justify-between mb-4">
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded border">
                            ID: {item.product_id}
                          </span>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-500 fill-current" />
                            <span className="text-sm ml-1">{item.product_rating.toFixed(1)}</span>
                            <span className="text-xs text-gray-500 ml-1">
                              ({item.number_of_users_rating_product})
                            </span>
                          </div>
                        </div>

                        {/* Product Image Placeholder */}
                        <div className="w-full h-48 mb-4 bg-gray-100 rounded-lg flex items-center justify-center">
                          <img
                            src={getDriveThumbnail(item.attachments[0])}
                            alt={item.product_name}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        </div>

                        {/* Product Name */}
                        <h3 className="font-semibold text-lg mb-2 line-clamp-2">{item.product_name}</h3>

                        {/* Price Section */}
                        <div className="mb-3">
                          <div className="flex items-center gap-2">
                            <span className="text-2xl font-bold text-green-600">
                              {formatPrice(item.selling_price)}
                            </span>
                            {item.offer_percentage > 0 && (
                              <>
                                <span className="text-sm text-gray-500 line-through">
                                  {formatPrice(item.original_price)}
                                </span>
                                <span className="px-2 py-1 bg-red-500 text-white text-xs rounded">
                                  -{item.offer_percentage}%
                                </span>
                              </>
                            )}
                          </div>
                        </div>

                        {/* Badges */}
                        <div className="flex flex-wrap gap-2 mb-3">
                          <span className={`px-2 py-1 text-xs rounded text-white ${availability.color}`}>
                            {availability.text}
                          </span>
                          <span className={`px-2 py-1 text-xs rounded ${getLandSizeColor(item.land_size)}`}>
                            {item.land_size} land
                          </span>
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded border">
                            {item.year_of_manufacture}
                          </span>
                        </div>

                        {/* Stock Info */}
                        <div className="text-sm text-gray-600 mb-3">
                          <span>
                            {item.remaining_quantity} of {item.total_quantity} remaining
                          </span>
                        </div>

                        {/* Description */}
                        <p className="text-sm text-gray-600 mb-4 line-clamp-3">{item.description}</p>

                        {/* Expanded content when hovered */}
                        <AnimatePresence>
                          {isHovered && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                              className="border-t pt-4 mt-4"
                            >
                              <div className="space-y-3">
                                <div>
                                  <h4 className="font-medium text-sm mb-1 flex items-center">
                                    <Info className="h-4 w-4 mr-1" />
                                    Uses
                                  </h4>
                                  <p className="text-xs text-gray-600">{item.uses}</p>
                                </div>

                                <div>
                                  <h4 className="font-medium text-sm mb-1">How to Use</h4>
                                  <p className="text-xs text-gray-600 line-clamp-3">{item.how_use_it}</p>
                                </div>

                                <button className="w-full mt-3 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center">
                                  <ShoppingCart className="h-4 w-4 mr-2" />
                                  Add to Cart
                                </button>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  )
                })}
              </motion.div>
            )}
          </AnimatePresence>

          {/* No results message */}
          {showResults && items.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
              <p className="text-gray-500 text-lg">No products found for your search.</p>
              <p className="text-gray-400 text-sm mt-2">Try a different search term.</p>
            </motion.div>
          )}
        </div>
      </div>

      {/* CSS for the glowing input effect */}
      <style jsx>{`
        .glow-input-wrapper {
          position: relative;
          border-radius: 25px;
          padding: 3px;
        }
        
        .glow-input-wrapper::before {
          content: '';
          position: absolute;
          top: -3px;
          left: -3px;
          right: -3px;
          bottom: -3px;
          border-radius: 25px;
          background: linear-gradient(
            90deg,
            #00c6ff, #ff6ec4, #ff00ff, #ff9800, #00f2ff, #00c6ff
          );
          background-size: 300% 300%;
          z-index: -1;
          filter: blur(10px) brightness(1.5);
          opacity: 0;
          transition: opacity 0.3s ease;
          animation: glowBorder 4s linear infinite;
        }
        
        .glow-input-wrapper.focused::before {
          opacity: 1;
        }
        
        @keyframes glowBorder {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  )
}

export default AIDesignPage