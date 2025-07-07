import { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
  Clock,
  Tractor,
  Sparkles,
  Leaf,
  Sun,
  Droplets,
  Star,
  Heart,
  Send,
  Globe,
  Award,
  Users,
  MessageCircle,
  ArrowUp,
  ExternalLink,
  Shield,
  Home,
  Search,
  Share2,
  Package,
  Grid3X3
} from "lucide-react"

function ContactUs() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeSection, setActiveSection] = useState(0)
  const [currentTime, setCurrentTime] = useState(new Date())
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

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // Auto-rotate sections
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSection((prev) => (prev + 1) % 3)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const socialPlatforms = [
    {
      name: "Facebook",
      icon: Facebook,
      color: "from-blue-600 to-blue-700",
      hoverColor: "hover:shadow-blue-500/50",
      followers: "25K",
      url: "#",
    },
    {
      name: "Twitter",
      icon: Twitter,
      color: "from-sky-500 to-sky-600",
      hoverColor: "hover:shadow-sky-500/50",
      followers: "18K",
      url: "#",
    },
    {
      name: "Instagram",
      icon: Instagram,
      color: "from-pink-500 to-purple-600",
      hoverColor: "hover:shadow-pink-500/50",
      followers: "32K",
      url: "#",
    },
    {
      name: "YouTube",
      icon: Youtube,
      color: "from-red-500 to-red-600",
      hoverColor: "hover:shadow-red-500/50",
      followers: "12K",
      url: "#",
    },
  ]

  const quickLinks = [
    { name: "Home", section: "/home", icon: Home },
    { name: "Category", section: "/categories", icon: Grid3X3 },
    { name: "Products", section: "/products", icon: Package },
    { name: "Social Media", section: "/social-media", icon: Share2 },
    { name: "Advanced Search", section: "/AI", icon: Search },
  ]

  const contactInfo = [
    {
      icon: MapPin,
      title: "Address",
      details: ["PO Box 14, Birzeit", "West Bank, Palestine"],
      gradient: "from-green-500 to-emerald-600",
    },
    {
      icon: Mail,
      title: "Email",
      details: ["info@Maeadati.com", "support@Maeadati.com"],
      gradient: "from-blue-500 to-cyan-600",
    },
    {
      icon: Phone,
      title: "Phone",
      details: ["(+972) 59-9999999", "(+972) 59-8888888"],
      gradient: "from-purple-500 to-pink-600",
    },
    {
      icon: Clock,
      title: "Hours",
      details: ["Sat-Thu: 8am - 6pm", "Friday: 9am - 4pm"],
      gradient: "from-orange-500 to-red-600",
    },
  ]

  const floatingElements = [
    { icon: Leaf, color: "text-green-500", position: "top-10 left-10", delay: "0s" },
    { icon: Sun, color: "text-yellow-500", position: "top-20 right-20", delay: "0.5s" },
    { icon: Droplets, color: "text-blue-500", position: "bottom-32 left-16", delay: "1s" },
    { icon: Star, color: "text-purple-500", position: "bottom-20 right-32", delay: "1.5s" },
    { icon: Sparkles, color: "text-pink-500", position: "top-1/3 left-1/4", delay: "2s" },
    { icon: Heart, color: "text-red-500", position: "bottom-1/3 right-1/4", delay: "2.5s" },
  ]

  const isBusinessOpen = () => {
    const day = currentTime.getDay()
    const hour = currentTime.getHours()

    if (day === 5) {
      // Friday
      return hour >= 9 && hour < 16
    } else if (day === 6) {
      // Saturday
      return false
    } else {
      // Sunday to Thursday
      return hour >= 8 && hour < 18
    }
  }

  return (
    <div
      ref={sectionRef}
      className="relative w-full min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Dynamic Gradient Orbs */}
        <div className="absolute -top-4 -left-4 w-96 h-96 bg-gradient-to-r from-green-400/20 to-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-8 -right-8 w-80 h-80 bg-gradient-to-r from-purple-400/20 to-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-yellow-400/15 to-orange-500/15 rounded-full blur-3xl animate-pulse delay-2000"></div>

        {/* Floating Icons */}
        {floatingElements.map((element, index) => (
          <div
            key={index}
            className={`absolute ${element.position} opacity-20 animate-float`}
            style={{
              animationDelay: element.delay,
              animationDuration: `${4 + index * 0.5}s`,
            }}
          >
            <element.icon className={`h-8 w-8 ${element.color}`} />
          </div>
        ))}

        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      </div>

      {/* Main Content */}
      <div
        className={`relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 transform transition-all duration-1000 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="relative inline-flex items-center justify-center mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500 rounded-full blur-lg opacity-50 animate-pulse"></div>
            <div className="relative h-20 w-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-2xl transform hover:scale-110 transition-all duration-300">
              <Tractor className="h-10 w-10 text-white" />
              <div className="absolute -top-1 -right-1">
                <Sparkles className="h-6 w-6 text-yellow-400 animate-spin" />
              </div>
            </div>
          </div>

          <h1 className="text-6xl lg:text-7xl font-black mb-6 m-0">
            <span className="bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-gradient-x">
              Get In Touch
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Connect with the{" "}
            <span className="font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              Maeadati family
            </span>{" "}
            and join thousands of farmers worldwide in revolutionizing agriculture
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {/* Company Info Section */}
          <div className="lg:col-span-1 space-y-8">
            {/* Brand Card */}
            <div className="bg-white/10 backdrop-blur-2xl rounded-3xl p-8 border border-white/20 shadow-2xl">
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="h-16 w-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-xl">
                    <Tractor className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-black bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                      Maeadati
                    </h2>
                    <div className="flex items-center space-x-2 mt-1">
                      <Shield className="h-4 w-4 text-green-400" />
                      <span className="text-sm text-gray-300">Since 1998</span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-300 leading-relaxed">
                  Providing high-quality agricultural equipment to support farmers worldwide. Trusted by over{" "}
                  <span className="font-bold text-green-400">50,000+ farmers</span> across the globe.
                </p>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 rounded-2xl p-4 text-center">
                    <Award className="h-6 w-6 text-yellow-400 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-white">25+</p>
                    <p className="text-xs text-gray-400">Years Experience</p>
                  </div>
                  <div className="bg-white/5 rounded-2xl p-4 text-center">
                    <Users className="h-6 w-6 text-blue-400 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-white">50K+</p>
                    <p className="text-xs text-gray-400">Happy Farmers</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media Section */}
            <div className="bg-white/10 backdrop-blur-2xl rounded-3xl p-8 border border-white/20 shadow-2xl">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Globe className="h-6 w-6 text-blue-400" />
                Follow Us
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {socialPlatforms.map((platform) => (
                  <button
                    key={platform.name}
                    className={`group relative p-4 bg-gradient-to-r ${platform.color} rounded-2xl shadow-xl ${platform.hoverColor} transform hover:scale-105 transition-all duration-300 overflow-hidden`}
                  >
                    <div className="relative z-10 flex flex-col items-center space-y-2">
                      <platform.icon className="h-6 w-6 text-white transform group-hover:rotate-12 transition-transform duration-300" />
                      <span className="text-white font-semibold text-sm">{platform.name}</span>
                      <span className="text-white/80 text-xs">{platform.followers}</span>
                    </div>

                    {/* Hover Effect */}
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {/* Shimmer Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 group-hover:animate-shimmer"></div>

                    {/* External Link Icon */}
                    <ExternalLink className="absolute top-2 right-2 h-3 w-3 text-white/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Info Section */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white/10 backdrop-blur-2xl rounded-3xl p-8 border border-white/20 shadow-2xl">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <MessageCircle className="h-6 w-6 text-green-400" />
                Contact Info
              </h3>

              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div
                    key={index}
                    className={`group p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all duration-300 transform hover:scale-105 ${
                      activeSection === index % 3 ? "ring-2 ring-white/30" : ""
                    }`}
                  >
                    <div className="flex items-start space-x-4">
                      <div
                        className={`h-12 w-12 bg-gradient-to-r ${info.gradient} rounded-2xl flex items-center justify-center shadow-lg`}
                      >
                        <info.icon className="h-6 w-6 text-white transform group-hover:rotate-12 transition-transform duration-300" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-white mb-2">{info.title}</h4>
                        {info.details.map((detail, idx) => (
                          <p key={idx} className="text-gray-300 text-sm leading-relaxed">
                            {detail}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Business Status */}
              <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-white/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div
                      className={`w-3 h-3 rounded-full ${isBusinessOpen() ? "bg-green-400 animate-pulse" : "bg-red-400"}`}
                    ></div>
                    <span className="text-white font-medium">{isBusinessOpen() ? "Open Now" : "Closed"}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-white text-sm">{currentTime.toLocaleTimeString()}</p>
                    <p className="text-gray-300 text-xs">{currentTime.toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links Section */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white/10 backdrop-blur-2xl rounded-3xl p-8 border border-white/20 shadow-2xl">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <ArrowUp className="h-6 w-6 text-purple-400" />
                Quick Links
              </h3>

              <div className="space-y-3">
                {quickLinks.map((link) => (
                  <Link to= {link.section}><button
                    key={link.name}
                    className="group w-full p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all duration-300 transform hover:scale-105 text-left"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="h-10 w-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
                        <link.icon className="h-5 w-5 text-white transform group-hover:rotate-12 transition-transform duration-300" />
                      </div>
                      <span className="text-white font-medium group-hover:text-purple-300 transition-colors duration-300">
                        {link.name}
                      </span>
                      <div className="ml-auto">
                        <ArrowUp className="h-4 w-4 text-gray-400 transform -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                      </div>
                    </div>
                  </button></Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <div className="h-12 w-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                <Tractor className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-white font-semibold">© {new Date().getFullYear()} Maeadati</p>
                <p className="text-gray-400 text-sm">All rights reserved</p>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <button className="text-gray-400 hover:text-white transition-colors duration-300">Privacy Policy</button>
              <button className="text-gray-400 hover:text-white transition-colors duration-300">
                Terms of Service
              </button>
              <div className="flex items-center space-x-2">
                <Heart className="h-4 w-4 text-red-400 animate-pulse" />
                <span className="text-gray-400 text-sm">Made with love for farmers</span>
              </div>
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
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-gradient-x {
          animation: gradient-x 15s ease infinite;
        }
        
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        
        .bg-grid-pattern {
          background-image: radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px);
          background-size: 20px 20px;
        }
      `}</style>
    </div>
  )
}

export default ContactUs;
