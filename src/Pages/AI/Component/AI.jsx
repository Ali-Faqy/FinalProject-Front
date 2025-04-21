"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Navication from "../../HomePage/Component/Navication.jsx";
import HeroBackGround from "../../CategoriesPage/Component/HeroBackGround.jsx";
import {
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";
// Mock data for AI results
const mockItems = [
  {
    id: "AI-001",
    name: "Neural Network Assistant",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.8,
    description:
      "Advanced neural network system designed to assist with complex data analysis and pattern recognition tasks.",
    price: "$899",
    availability: "In Stock",
  },
  {
    id: "AI-002",
    name: "Smart Home Controller",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.6,
    description:
      "Intelligent system that learns your preferences and optimizes your home environment for comfort and energy efficiency.",
    price: "$649",
    availability: "In Stock",
  },
  {
    id: "AI-003",
    name: "Language Processing Engine",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.9,
    description:
      "Sophisticated language model capable of understanding and generating human-like text across multiple languages.",
    price: "$1,299",
    availability: "Limited Stock",
  },
  {
    id: "AI-004",
    name: "Computer Vision System",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.7,
    description:
      "Advanced image recognition system that can identify objects, faces, and scenes with remarkable accuracy.",
    price: "$899",
    availability: "In Stock",
  },
  {
    id: "AI-005",
    name: "Predictive Analytics Tool",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.5,
    description: "Data-driven forecasting tool that uses historical patterns to predict future trends and outcomes.",
    price: "$749",
    availability: "In Stock",
  },
]

// Additional images for carousel
const additionalImages = [
  "/placeholder.svg?height=200&width=300",
  "/placeholder.svg?height=200&width=300",
  "/placeholder.svg?height=200&width=300",
]

const AIDesignPage = () => {
  const [showWelcome, setShowWelcome] = useState(true)
  const [showInput, setShowInput] = useState(false)
  const [inputValue, setInputValue] = useState("")
  const [showResults, setShowResults] = useState(false)
  const [hoveredItem, setHoveredItem] = useState(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const inputRef = useRef(null)
  const [isInputFocused, setIsInputFocused] = useState(false)

  // Animation sequence on load
  useEffect(() => {
    const welcomeTimer = setTimeout(() => {
      setShowInput(true)
    }, 1000)

    return () => clearTimeout(welcomeTimer)
  }, [])

  // Handle input submission
  const handleSubmit = (e) => {
    e.preventDefault()
    if (inputValue.trim()) {
      setShowWelcome(false)
      setShowResults(true)
    }
  }

  // Handle image carousel navigation
  const nextImage = (e, itemId) => {
    e.stopPropagation()
    setCurrentImageIndex((prevIndex) => (prevIndex === additionalImages.length ? 0 : prevIndex + 1))
  }

  const prevImage = (e, itemId) => {
    e.stopPropagation()
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? additionalImages.length : prevIndex - 1))
  }

  // Get current image for preview
  const getCurrentImage = (item) => {
    if (currentImageIndex === 0) return item.image
    return additionalImages[currentImageIndex - 1]
  }

  return (

    <>
    
    <Navication/>

          <HeroBackGround>
            <div className="mb-6 flex items-center">
              <Link
                to="/home"
                className="text-[#a4a4a4] hover:text-teal-600 transition-colors pt-[100px]"
              >
                Home
              </Link>
              <ChevronRight className="text-[#a4a4a4] mx-2 h-4 w-4 mt-[100px]" />
              <Link
                to="/AI"
                className="text-black hover:text-teal-600 transition-colors pt-[100px]"
              >
                AI Search
              </Link>
            </div>

          </HeroBackGround>

    <div className="flex flex-col items-center justify-center">
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 to-white text-gray-800 font-sans flex flex-col items-center pt-20 relative overflow-hidden">
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
            Welcome to AI
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input section with Apple Intelligence glow effect */}
      <AnimatePresence>
        {showInput && (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
            className="w-full max-w-2xl px-4 mb-16 relative z-10"
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
                placeholder="What would you like to explore today?"
                className="w-full px-6 py-4 bg-white border border-gray-200 rounded-full text-gray-800 placeholder-gray-400 focus:outline-none transition-all duration-300 shadow-sm glow-input"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-400 to-purple-400 text-white p-2 rounded-full hover:shadow-lg transition-all duration-300"
                disabled={!inputValue.trim()}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      {/* Results section with expanding cards */}
      <AnimatePresence>
        {showResults && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, staggerChildren: 0.1 }}
            className="w-full max-w-6xl px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6"
          >
            {mockItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative ${hoveredItem === item.id ? "z-50 lg:col-span-2 lg:row-span-2" : ""}`}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <motion.div
                  layout
                  className={`bg-white border border-gray-200 rounded-xl p-4 h-full transition-all duration-300 hover:shadow-xl ${
                    hoveredItem === item.id ? "shadow-xl" : "shadow-sm"
                  }`}
                  style={{
                    transformOrigin: "center",
                  }}
                >
                  <motion.div layout className="flex items-start justify-between mb-2">
                    <span className="text-xs font-medium text-gray-500">{item.id}</span>
                    <div className="flex items-center">
                      <span className="text-yellow-500 mr-1">★</span>
                      <span className="text-xs">{item.rating}</span>
                    </div>
                  </motion.div>

                  <motion.div
                    layout
                    className={`w-full ${hoveredItem === item.id ? "h-48" : "h-32"} mb-3 overflow-hidden rounded-lg`}
                  >
                    <img
                      src={hoveredItem === item.id ? getCurrentImage(item) : item.image}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />

                    {/* Image navigation only shows when hovered */}
                    {hoveredItem === item.id && (
                      <>
                        <button
                          onClick={(e) => prevImage(e, item.id)}
                          className="absolute left-6 top-1/3 transform -translate-y-1/2 bg-white/80 text-gray-800 p-1.5 rounded-full hover:bg-white transition-colors"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                          </svg>
                        </button>
                        <button
                          onClick={(e) => nextImage(e, item.id)}
                          className="absolute right-6 top-1/3 transform -translate-y-1/2 bg-white/80 text-gray-800 p-1.5 rounded-full hover:bg-white transition-colors"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </>
                    )}
                  </motion.div>

                  <motion.h3 layout className="font-medium text-lg mb-2">
                    {item.name}
                  </motion.h3>

                  {/* Additional content that only appears when hovered */}
                  <AnimatePresence>
                    {hoveredItem === item.id && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <p className="text-sm text-gray-600 mb-4">{item.description}</p>

                        {/* Thumbnails */}
                        <div className="flex space-x-2 mb-4 overflow-x-auto pb-2">
                          <div
                            className={`w-12 h-12 rounded-md overflow-hidden cursor-pointer border-2 ${currentImageIndex === 0 ? "border-blue-400" : "border-transparent"}`}
                            onClick={() => setCurrentImageIndex(0)}
                          >
                            <img src={item.image || "/placeholder.svg"} alt="" className="w-full h-full object-cover" />
                          </div>
                          {additionalImages.map((img, idx) => (
                            <div
                              key={idx}
                              className={`w-12 h-12 rounded-md overflow-hidden cursor-pointer border-2 ${currentImageIndex === idx + 1 ? "border-blue-400" : "border-transparent"}`}
                              onClick={() => setCurrentImageIndex(idx + 1)}
                            >
                              <img src={img || "/placeholder.svg"} alt="" className="w-full h-full object-cover" />
                            </div>
                          ))}
                        </div>

                        <div className="flex justify-between items-center">
                          <div>
                            <span className="text-sm text-gray-500">Availability:</span>
                            <span className="ml-2 text-green-500">{item.availability}</span>
                          </div>
                          <div>
                            <span className="text-sm text-gray-500">Price:</span>
                            <span className="ml-2 text-lg font-medium">{item.price}</span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Show truncated description when not hovered */}
                  {hoveredItem !== item.id && <p className="text-sm text-gray-500 line-clamp-2">{item.description}</p>}
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

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
    </div>
  )

    </>

 
)
}

export default AIDesignPage
