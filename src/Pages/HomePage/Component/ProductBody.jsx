import { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { Tractor, ChevronRight, Sparkles, Package, Leaf, Sun, Award, TrendingUp, Zap } from "lucide-react"
import CardProduct from "../Component/CardProduct"
const products = [
  {
    id: 1,
    name: "Premium Tractor",
    price: 1299.99,
    originalPrice: 1599.99,
    tag: "Best Seller",
    description: "Top of the Line Performance",
    rating: 5,
    availability: true,
    image: "",
    gradient: "from-blue-500 to-purple-600",
    category: "Heavy Machinery",
    discount: 19,
    features: ["GPS Navigation", "Auto-Pilot", "Fuel Efficient"],
  },
  {
    id: 2,
    name: "Smart Irrigation System",
    price: 249.99,
    originalPrice: 299.99,
    tag: "New Arrival",
    description: "AI-Powered Water Management",
    rating: 4,
    availability: true,
    image: "",
    gradient: "from-cyan-500 to-blue-600",
    category: "Irrigation",
    discount: 17,
    features: ["Smart Sensors", "Mobile App", "Weather Sync"],
  },
  {
    id: 3,
    name: "Professional Harvesting Tool",
    price: 89.99,
    originalPrice: 119.99,
    tag: "Popular",
    description: "Precision Harvesting Solution",
    rating: 3,
    availability: false,
    image: "",
    gradient: "from-orange-500 to-red-600",
    category: "Hand Tools",
    discount: 25,
    features: ["Ergonomic Design", "Rust Resistant", "Lightweight"],
  },
  {
    id: 4,
    name: "Automated Seed Planter",
    price: 159.99,
    originalPrice: 199.99,
    tag: "Sale",
    description: "Precision Planting Technology",
    rating: 4.5,
    availability: true,
    image: "",
    gradient: "from-green-500 to-emerald-600",
    category: "Planting",
    discount: 20,
    features: ["Auto Spacing", "Depth Control", "Multi-Seed"],
  },
  {
    id: 5,
    name: "Professional Garden Shears",
    price: 29.99,
    originalPrice: 39.99,
    tag: "Best Value",
    description: "Perfect for Precision Pruning",
    rating: 2,
    availability: true,
    image: "",
    gradient: "from-pink-500 to-rose-600",
    category: "Hand Tools",
    discount: 25,
    features: ["Sharp Blades", "Comfort Grip", "Easy Clean"],
  },
  {
    id: 6,
    name: "Digital Soil Analysis Kit",
    price: 49.99,
    originalPrice: 69.99,
    tag: "Top Rated",
    description: "Essential Soil Health Monitor",
    rating: 5,
    availability: true,
    image: "",
    gradient: "from-purple-500 to-indigo-600",
    category: "Testing",
    discount: 29,
    features: ["pH Testing", "Nutrient Analysis", "Mobile App"],
  },
  {
    id: 7,
    name: "High-Efficiency Water Pump",
    price: 199.99,
    originalPrice: 249.99,
    tag: "Essential",
    description: "Maximum Flow, Minimum Energy",
    rating: 4,
    availability: true,
    image: "",
    gradient: "from-teal-500 to-cyan-600",
    category: "Irrigation",
    discount: 20,
    features: ["Energy Efficient", "Quiet Operation", "Durable"],
  },
  {
    id: 8,
    name: "Premium Farming Gloves",
    price: 19.99,
    originalPrice: 24.99,
    tag: "Must Have",
    description: "Ultimate Hand Protection",
    rating: 3,
    availability: false,
    image: "",
    gradient: "from-yellow-500 to-orange-600",
    category: "Safety",
    discount: 20,
    features: ["Waterproof", "Breathable", "Grip Enhanced"],
  },
]

function ProductBody() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const floatingElements = [
    { icon: Leaf, color: "text-green-500", position: "top-10 left-10", delay: "0s" },
    { icon: Sun, color: "text-yellow-500", position: "top-20 right-20", delay: "0.5s" },
    { icon: Package, color: "text-blue-500", position: "bottom-32 left-16", delay: "1s" },
    { icon: Sparkles, color: "text-purple-500", position: "bottom-20 right-32", delay: "1.5s" },
  ]

  return (
    <div
      ref={sectionRef}
      className="relative w-full min-h-screen py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50 overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Particles */}
        <div className="absolute -top-4 -left-4 w-96 h-96 bg-gradient-to-r from-green-400/10 to-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-8 -right-8 w-80 h-80 bg-gradient-to-r from-purple-400/10 to-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

        {/* Floating Icons */}
        {floatingElements.map((element, index) => (
          <div
            key={index}
            className={`absolute ${element.position} opacity-20 animate-float`}
            style={{
              animationDelay: element.delay,
              animationDuration: `${4 + index}s`,
            }}
          >
            <element.icon className={`h-8 w-8 ${element.color}`} />
          </div>
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className={`text-center space-y-8 mb-16 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          {/* Icon */}
          <div className="relative inline-flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500 rounded-full blur-lg opacity-50 animate-pulse"></div>
            <div className="relative h-20 w-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-2xl transform hover:scale-110 transition-all duration-300">
              <Tractor className="h-10 w-10 text-white" />
              <div className="absolute -top-1 -right-1">
                <Sparkles className="h-6 w-6 text-yellow-400 animate-spin" />
              </div>
            </div>
          </div>

          {/* Title */}
          <div className="space-y-4">
            <h2 className="text-6xl lg:text-7xl font-black">
              <span className="bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent animate-gradient-x">
                Featured Products
              </span>
            </h2>
            <div className="flex items-center justify-center">
              <div className="h-1 w-32 bg-gradient-to-r from-green-600 via-blue-500 to-purple-600 rounded-full animate-pulse"></div>
            </div>
          </div>

          {/* Description */}
          <p className="text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Explore our{" "}
            <span className="font-semibold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              most popular
            </span>{" "}
            agricultural tools and equipment, carefully selected for{" "}
            <span className="font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              maximum productivity
            </span>
            .
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mt-12">
            <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-2xl px-6 py-3 shadow-lg border border-white/20">
              <Award className="h-6 w-6 text-yellow-500" />
              <span className="font-bold text-gray-700">Premium Quality</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-2xl px-6 py-3 shadow-lg border border-white/20">
              <TrendingUp className="h-6 w-6 text-green-500" />
              <span className="font-bold text-gray-700">Best Sellers</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-2xl px-6 py-3 shadow-lg border border-white/20">
              <Zap className="h-6 w-6 text-blue-500" />
              <span className="font-bold text-gray-700">Fast Delivery</span>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-16">
          {products.map((product, index) => (
            <CardProduct key={product.id} product={product} index={index} />
          ))}
        </div>

        {/* View All Button */}
        <div
          className={`text-center ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
          style={{ animationDelay: "800ms" }}
        >
          <button className="group relative px-8 py-4 bg-gradient-to-r from-green-600 to-blue-600 text-white font-bold rounded-2xl shadow-2xl hover:shadow-green-500/25 transform hover:scale-105 transition-all duration-300 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-green-700 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <Link to="/products"><div className="relative flex items-center justify-center space-x-2">
              <Package className="h-5 w-5 transform group-hover:rotate-12 transition-transform duration-300" />
              <span>View All Products</span>
              <ChevronRight className="h-5 w-5 transform group-hover:translate-x-1 transition-transform duration-300" />
            </div></Link>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 group-hover:animate-shimmer"></div>
          </button>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes gradient-x {
          0%, 100% {
            background-size: 200% 200%;
            background-position: left center;
          }
          50% {
            background-size: 200% 200%;
            background-position: right center;
          }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%) skewX(-12deg); }
          100% { transform: translateX(200%) skewX(-12deg); }
        }
        
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-gradient-x {
          animation: gradient-x 15s ease infinite;
        }
        
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out forwards;
        }
      `}</style>
    </div>
  )
}

export default ProductBody;
