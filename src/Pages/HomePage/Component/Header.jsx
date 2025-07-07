import { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import {
  Package,
  Sparkles,
  Leaf,
  Sun,
  Droplets,
  ArrowRight,
  Star,
  Zap,
  TrendingUp,
  Award,
  Users,
  ShoppingBag,
} from "lucide-react"
import { getNumberOfProducts, getTotalUsers } from "../Code/Header.js"
import image from "../../../assets/image10.png"
function Header() {
  const [numberOfProducts, setNumberOfProduct] = useState(0)
  const [totalUsers, setTotalUsers] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const headerRef = useRef(null)

  const fetchNumberOfProduct = async () => {
    const data = await getNumberOfProducts();
    if (data) {
      setNumberOfProduct(data.numberOfProducts);
    }
  };
  
  const fetchTotalUsers = async () => {
    const data = await getTotalUsers();
    if (data) {
      setTotalUsers(data.total_users);
    }
  };

  
  useEffect(() => {
    fetchNumberOfProduct();
    fetchTotalUsers();
  }, []);

  // Intersection observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (headerRef.current) {
      observer.observe(headerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    fetchNumberOfProduct()
  }, [])

  const floatingIcons = [
    { icon: Leaf, color: "text-green-500", delay: "0s", position: "top-10 left-10" },
    { icon: Sun, color: "text-yellow-500", delay: "0.5s", position: "top-20 right-20" },
    { icon: Droplets, color: "text-blue-500", delay: "1s", position: "bottom-32 left-16" },
    { icon: Sparkles, color: "text-purple-500", delay: "1.5s", position: "bottom-20 right-32" },
    { icon: Star, color: "text-pink-500", delay: "2s", position: "top-32 left-1/3" },
    { icon: Zap, color: "text-orange-500", delay: "2.5s", position: "bottom-40 right-1/4" },
  ]
  return (
    <div
      ref={headerRef}
      className="relative w-full min-h-[600px] overflow-hidden bg-gradient-to-br from-green-50 via-white to-blue-50"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Particles */}
        <div className="absolute -top-4 -left-4 w-96 h-96 bg-gradient-to-r from-green-400/20 to-emerald-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -top-8 -right-8 w-80 h-80 bg-gradient-to-r from-blue-400/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-gradient-to-r from-purple-400/20 to-pink-500/20 rounded-full blur-3xl animate-pulse delay-2000"></div>

        {/* Floating Icons */}
        {floatingIcons.map((item, index) => (
          <div
            key={index}
            className={`absolute ${item.position} opacity-20 animate-float`}
            style={{
              animationDelay: item.delay,
              animationDuration: `${3 + index * 0.5}s`,
            }}
          >
            <item.icon className={`h-8 w-8 ${item.color}`} />
          </div>
        ))}

        {/* Geometric Shapes */}
        <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-green-400 rotate-45 animate-spin-slow opacity-30"></div>
        <div className="absolute top-3/4 right-1/3 w-6 h-6 bg-blue-400 rounded-full animate-bounce opacity-30"></div>
        <div className="absolute bottom-1/4 left-1/3 w-3 h-12 bg-purple-400 animate-pulse opacity-30"></div>
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-center px-4 sm:px-6 lg:px-8 py-16 max-w-7xl mx-auto">
        {/* Left Content Section */}
        <div className={`w-full lg:w-1/2 flex flex-col space-y-8 ${isVisible ? "animate-slide-in-left" : "opacity-0"}`}>
          {/* Main Heading */}
          <div className="space-y-4">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full border border-green-200 shadow-sm">
              <Sparkles className="h-4 w-4 text-green-600 mr-2 animate-spin" />
              <span className="text-sm font-semibold text-green-700 tracking-wide">PREMIUM AGRICULTURE</span>
            </div>

            <h1 className="text-6xl lg:text-7xl font-black leading-tight">
              <span className="block bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent animate-gradient-x">
                Cultivate
              </span>
              <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent animate-gradient-x delay-500">
                Success
              </span>
            </h1>
          </div>

          {/* Description */}
          <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed max-w-2xl">
            Discover our{" "}
            <span className="font-semibold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              wide range
            </span>{" "}
            of high-quality agricultural tools and equipment designed to{" "}
            <span className="font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              enhance your farming experience
            </span>{" "}
            and maximize productivity.
          </p>

          {/* Stats Section */}
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-lg border border-white/20">
              <Package className="h-5 w-5 text-green-600" />
              <span className="text-sm font-semibold text-gray-700">+{numberOfProducts} Tools</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-lg border border-white/20">
              <Users className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-semibold text-gray-700">{totalUsers}+ Farmers</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-lg border border-white/20">
              <Award className="h-5 w-5 text-purple-600" />
              <span className="text-sm font-semibold text-gray-700">Award Winning</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-8">
          <Link to="/products"><button className="group relative px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold rounded-2xl shadow-2xl hover:shadow-green-500/25 transform hover:scale-105 transition-all duration-300 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-green-700 to-emerald-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex items-center justify-center space-x-2">
                <ShoppingBag className="h-5 w-5 transform group-hover:rotate-12 transition-transform duration-300" />
                <span>Shop Now</span>
                <ArrowRight className="h-5 w-5 transform group-hover:translate-x-1 transition-transform duration-300" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 group-hover:animate-shimmer"></div>
            </button></Link>

            <Link to="/categories"><button className="group relative px-8 py-4 bg-white/80 backdrop-blur-sm border-2 border-green-200 text-green-700 font-bold rounded-2xl shadow-lg hover:shadow-xl hover:bg-green-50 transform hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-center space-x-2">
                <Leaf className="h-5 w-5 transform group-hover:rotate-12 transition-transform duration-300" />
                <span>View Categories</span>
              </div>
            </button></Link>
          </div>
        </div>

        {/* Right Image Section */}
        <div
          className={`w-full lg:w-1/2 flex justify-center items-center mt-12 lg:mt-0 ${isVisible ? "animate-slide-in-right" : "opacity-0"}`}
        >
          <div className="relative">
            {/* Main Image Container */}
            <div className="relative w-96 h-96 lg:w-[500px] lg:h-[400px] rounded-3xl shadow-2xl overflow-hidden transform hover:scale-105 transition-all duration-500 group">
              <div
                className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${image})` }}
              >
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
              </div>

              {/* Floating Achievement Badge */}
              <div className="absolute -top-4 -right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-2xl p-3 shadow-xl transform rotate-12 hover:rotate-0 transition-transform duration-300">
                <div className="flex items-center space-x-2">
                  <Award className="h-5 w-5" />
                  <span className="font-bold text-sm">Best Quality</span>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-4 left-4 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
              <div className="absolute bottom-4 right-4 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
            </div>

            {/* Floating Elements Around Image */}
            <div className="absolute -top-8 -left-8 w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-xl animate-bounce">
              <Leaf className="h-8 w-8 text-white" />
            </div>
            <div className="absolute -bottom-8 -right-8 w-12 h-12 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full flex items-center justify-center shadow-xl animate-pulse">
              <Droplets className="h-6 w-6 text-white" />
            </div>
          </div>
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
        
        @keyframes slide-in-left {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
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
        
        .animate-slide-in-left {
          animation: slide-in-left 1s ease-out forwards;
        }
        
        .animate-slide-in-right {
          animation: slide-in-right 1s ease-out forwards;
        }
        
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
      `}</style>
    </div>
  )
}

export default Header;
