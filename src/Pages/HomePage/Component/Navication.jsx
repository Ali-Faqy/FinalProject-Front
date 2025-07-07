import { Link } from "react-router-dom"
import { useState, useRef, useEffect } from "react"
import { Tractor, User, ShoppingCart, Home, Package, Grid3X3, Share2, Search, Menu, X, Sparkles } from "lucide-react"
import { getNumberOfCartItem } from "../Code/Navication_data.js"

function Navigation({ open }) {
  const userId = localStorage.getItem("userId")

  const [isOpen, setIsOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [numberOfItemsCart, setNumberOfCartItem] = useState(0)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeLink, setActiveLink] = useState(open?.is || "home")
  const dropdownRef = useRef(null)

  const fetchNumberOfCartItem = async () => {
    try {
      const data = await getNumberOfCartItem(userId)
      setNumberOfCartItem(data.product_count)
    } catch (error) {
      console.error("Fetch error:", error)
    }
  }

  useEffect(() => {
    fetchNumberOfCartItem()
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isOpen])

  // Enhanced navigation items with more vibrant gradients and colors
  const navItems = [
    {
      name: "Home",
      href: "/home",
      icon: Home,
      gradient: "from-blue-500 to-purple-600",
      activeGradient: "from-blue-600 via-purple-600 to-indigo-700",
      glowColor: "shadow-blue-500/50",
    },
    {
      name: "Products",
      href: "/products",
      icon: Package,
      gradient: "from-green-500 to-teal-600",
      activeGradient: "from-green-600 via-emerald-600 to-teal-700",
      glowColor: "shadow-green-500/50",
    },
    {
      name: "Category",
      href: "/categories",
      icon: Grid3X3,
      gradient: "from-orange-500 to-red-600",
      activeGradient: "from-orange-600 via-red-600 to-pink-700",
      glowColor: "shadow-orange-500/50",
    },
    {
      name: "Social Media",
      href: "/social-media",
      icon: Share2,
      gradient: "from-pink-500 to-rose-600",
      activeGradient: "from-pink-600 via-rose-600 to-purple-700",
      glowColor: "shadow-pink-500/50",
    },
    {
      name: "Advanced Search",
      href: "/AI",
      icon: Search,
      gradient: "from-indigo-500 to-blue-600",
      activeGradient: "from-indigo-600 via-blue-600 to-cyan-700",
      glowColor: "shadow-indigo-500/50",
    },
  ]

  return (
    <>
      {/* Glassmorphism Navigation */}
      <div
        className={`fixed top-0 left-0 w-full z-[1000] transition-all duration-500 ${
          isScrolled
            ? "bg-white/80 backdrop-blur-xl shadow-2xl shadow-black/10 border-b border-white/20"
            : "bg-gradient-to-r from-white/95 to-white/90 backdrop-blur-lg"
        }`}
      >
        {/* Animated background particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-4 -left-4 w-72 h-72 bg-gradient-to-r from-green-400/20 to-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -top-8 -right-8 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo Section with Creative Animation */}
            <div className="flex items-center space-x-4 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-500 rounded-2xl blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
                <div className="relative h-14 w-14 bg-gradient-to-br from-green-600 via-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center transform group-hover:scale-110 transition-all duration-300 shadow-xl">
                  <Tractor className="text-white h-7 w-7 transform group-hover:rotate-12 transition-transform duration-300" />
                  <div className="absolute -top-1 -right-1">
                    <Sparkles className="h-4 w-4 text-yellow-400 animate-spin" />
                  </div>
                </div>
              </div>
              <div className="hidden sm:block">
                <h1 className="m-0 text-3xl font-black bg-gradient-to-r from-green-600 via-emerald-500 to-teal-600 bg-clip-text text-transparent group-hover:from-green-500 group-hover:to-blue-600 transition-all duration-500">
                  Maeadati
                </h1>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-2">
              {navItems.map((item, index) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setActiveLink(item.name.toLowerCase())}
                  className={`group relative px-6 py-3 rounded-2xl transition-all duration-300 transform hover:scale-105 ${
                    activeLink === item.name.toLowerCase()
                      ? `bg-gradient-to-r ${item.activeGradient} text-white shadow-2xl ${item.glowColor} border border-white/20`
                      : `text-gray-700 hover:text-white hover:bg-gradient-to-r ${item.gradient} hover:shadow-lg hover:${item.glowColor.replace("/50", "/30")}`
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center space-x-2">
                    <item.icon
                      className={`h-4 w-4 transform group-hover:rotate-12 transition-transform duration-300 ${
                        activeLink === item.name.toLowerCase() ? "text-white drop-shadow-lg" : ""
                      }`}
                    />
                    <span
                      className={`font-semibold text-sm tracking-wide ${
                        activeLink === item.name.toLowerCase() ? "text-white drop-shadow-lg" : ""
                      }`}
                    >
                      {item.name}
                    </span>
                  </div>

                  {/* Enhanced hover effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Enhanced active indicator */}
                  {activeLink === item.name.toLowerCase() && (
                    <>
                      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rounded-full animate-bounce shadow-lg"></div>
                      <div className="absolute inset-0 rounded-2xl bg-white/10 animate-pulse"></div>
                      {/* Glowing border effect */}
                      <div
                        className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${item.activeGradient} opacity-20 blur-sm animate-pulse`}
                      ></div>
                    </>
                  )}

                  {/* Subtle animation for active state */}
                  {activeLink === item.name.toLowerCase() && (
                    <div className="absolute inset-0 rounded-2xl overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-shimmer"></div>
                    </div>
                  )}
                </Link>
              ))}
            </nav>

            {/* Right Section */}
            <div className="flex items-center space-x-4">
              {/* Shopping Cart with Creative Badge */}
              <Link to={`/cart/${userId}`} className="group relative">
                <div className="relative p-3 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 hover:from-green-50 hover:to-emerald-100 transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl">
                  <ShoppingCart className="h-6 w-6 text-gray-700 group-hover:text-green-600 transition-colors duration-300" />

                  {/* Animated Cart Badge */}
                    <div className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center animate-bounce shadow-lg">
                      <span className="animate-pulse">{numberOfItemsCart}</span>
                    </div>

                  {/* Ripple effect */}
                  <div className="absolute inset-0 rounded-2xl bg-green-400/20 scale-0 group-hover:scale-100 transition-transform duration-300 opacity-0 group-hover:opacity-100"></div>
                </div>
              </Link>

              {/* Profile Button */}
              <Link to="/profile" className="group relative">
                <div className="relative p-3 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 hover:from-blue-50 hover:to-indigo-100 transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl">
                  <User className="h-6 w-6 text-gray-700 group-hover:text-blue-600 transition-colors duration-300" />

                  {/* Online indicator */}
                  {userId && (
                    <>
                      <div className="absolute top-1 right-1 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
                      <div className="absolute top-1 right-1 w-3 h-3 bg-green-500 rounded-full"></div>
                    </>
                  )}
                </div>
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-3 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 hover:from-purple-50 hover:to-pink-100 transition-all duration-300 transform hover:scale-110 shadow-lg"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6 text-gray-700 transform rotate-180 transition-transform duration-300" />
                ) : (
                  <Menu className="h-6 w-6 text-gray-700 transition-transform duration-300" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced Mobile Menu */}
        <div
          ref={dropdownRef}
          className={`lg:hidden transition-all duration-500 ease-in-out ${
            isMobileMenuOpen ? "max-h-screen opacity-100 visible" : "max-h-0 opacity-0 invisible"
          }`}
        >
          <div className="px-4 py-6 bg-white/95 backdrop-blur-xl border-t border-gray-200/50">
            <div className="space-y-3">
              {navItems.map((item, index) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => {
                    setActiveLink(item.name.toLowerCase())
                    setIsMobileMenuOpen(false)
                  }}
                  className={`flex items-center space-x-4 px-6 py-4 rounded-2xl transition-all duration-300 transform hover:scale-105 relative overflow-hidden ${
                    activeLink === item.name.toLowerCase()
                      ? `bg-gradient-to-r ${item.activeGradient} text-white shadow-2xl ${item.glowColor} border border-white/20`
                      : `text-gray-700 hover:bg-gradient-to-r ${item.gradient} hover:text-white hover:shadow-lg`
                  }`}
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animation: isMobileMenuOpen ? "slideInLeft 0.5s ease-out forwards" : "",
                  }}
                >
                  <item.icon
                    className={`h-5 w-5 ${activeLink === item.name.toLowerCase() ? "text-white drop-shadow-lg" : ""}`}
                  />
                  <span
                    className={`font-semibold ${
                      activeLink === item.name.toLowerCase() ? "text-white drop-shadow-lg" : ""
                    }`}
                  >
                    {item.name}
                  </span>

                  {/* Mobile active indicator */}
                  {activeLink === item.name.toLowerCase() && (
                    <>
                      <div className="absolute right-4 w-2 h-2 bg-white rounded-full animate-pulse"></div>
                      <div className="absolute inset-0 bg-white/10 animate-pulse"></div>
                      {/* Mobile shimmer effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-shimmer"></div>
                    </>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Spacer to prevent content overlap */}
      <div className="h-20"></div>

      <style jsx>{`
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%) skewX(-12deg);
          }
          100% {
            transform: translateX(200%) skewX(-12deg);
          }
        }

        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </>
  )
}

export default Navigation
