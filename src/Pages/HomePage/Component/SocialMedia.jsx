import { useState, useEffect, useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import {
  ChevronRight,
  Users,
  MessageCircle,
  Heart,
  Share2,
  Sparkles,
  Leaf,
  Sun,
  Droplets,
  Star,
  Award,
  TrendingUp,
  Globe,
  Camera,
  Video,
  UserPlus,
  Bell,
  Gift,
  Zap,
  Target,
  Rocket,
} from "lucide-react"

function SocialMedia() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false)
  const [activeFeature, setActiveFeature] = useState(0)
  const sectionRef = useRef(null)
  const userId = localStorage.getItem("userId")

  // Redirect logic for React Router
  if (!userId) {
    navigate("/signIn")
  }

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

  // Auto-rotate features
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 4)
    }, 3000)
    return () => clearInterval(interval)
  }, [])


  const communityFeatures = [
    {
      icon: Users,
      title: "Connect with Farmers",
      description: "Join 50,000+ farmers worldwide",
      gradient: "from-blue-500 to-purple-600",
      stats: "50K+ Members",
    },
    {
      icon: MessageCircle,
      title: "Expert Discussions",
      description: "Share knowledge and get advice",
      gradient: "from-green-500 to-emerald-600",
      stats: "1M+ Messages",
    },
    {
      icon: Camera,
      title: "Showcase Your Farm",
      description: "Share your farming journey",
      gradient: "from-orange-500 to-red-600",
      stats: "100K+ Photos",
    },
    {
      icon: Award,
      title: "Earn Rewards",
      description: "Get recognized for contributions",
      gradient: "from-yellow-500 to-orange-600",
      stats: "5K+ Rewards",
    },
  ]

  const socialStats = [
    { icon: Heart, count: "2.5M", label: "Likes", color: "text-red-500" },
    { icon: Share2, count: "850K", label: "Shares", color: "text-blue-500" },
    { icon: MessageCircle, count: "1.2M", label: "Comments", color: "text-green-500" },
    { icon: Users, count: "50K+", label: "Members", color: "text-purple-500" },
  ]

  const floatingElements = [
    { icon: Leaf, color: "text-green-500", position: "top-10 left-10", delay: "0s", size: "h-6 w-6" },
    { icon: Sun, color: "text-yellow-500", position: "top-20 right-20", delay: "0.5s", size: "h-8 w-8" },
    { icon: Droplets, color: "text-blue-500", position: "bottom-32 left-16", delay: "1s", size: "h-5 w-5" },
    { icon: Star, color: "text-purple-500", position: "bottom-20 right-32", delay: "1.5s", size: "h-7 w-7" },
    { icon: Sparkles, color: "text-pink-500", position: "top-1/3 left-1/4", delay: "2s", size: "h-6 w-6" },
    { icon: Zap, color: "text-orange-500", position: "bottom-1/3 right-1/4", delay: "2.5s", size: "h-5 w-5" },
  ]

  return (
    <div
      ref={sectionRef}
      className="relative w-full min-h-screen flex items-center justify-center py-20 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 overflow-hidden"
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
            className={`absolute ${element.position} opacity-30 animate-float`}
            style={{
              animationDelay: element.delay,
              animationDuration: `${4 + index * 0.5}s`,
            }}
          >
            <element.icon className={`${element.size} ${element.color}`} />
          </div>
        ))}

        {/* Animated Particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 bg-gradient-to-r from-green-400 to-blue-500 rounded-full animate-ping opacity-20`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Main Content Container */}
      <div
        className={`relative z-10 w-full max-w-6xl mx-auto px-4 transform transition-all duration-1000 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        {/* Glassmorphism Card */}
        <div className="relative bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          {/* Animated Border */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-green-500/20 via-blue-500/20 to-purple-500/20 animate-gradient-x"></div>

          {/* Content Grid */}
          <div className="relative grid lg:grid-cols-2 gap-8 p-8 lg:p-12">
            {/* Left Content */}
            <div className="space-y-8">
              {/* Header Section */}
              <div className="space-y-6">
                {/* Badge */}
                <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-100/80 to-blue-100/80 backdrop-blur-sm rounded-full border border-white/30 shadow-lg">
                  <Globe className="h-4 w-4 text-green-600 mr-2 animate-spin-slow" />
                  <span className="text-sm font-bold text-green-700 tracking-wide">GLOBAL COMMUNITY</span>
                </div>

                {/* Main Title */}
                <h2 className="text-4xl lg:text-5xl font-black leading-tight">
                  <span className="block bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent animate-gradient-x">
                    Join the
                  </span>
                  <span className="block bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent animate-gradient-x delay-500">
                    Maeadati Community
                  </span>
                </h2>

                {/* Description */}
                <p className="text-lg lg:text-xl text-gray-700 leading-relaxed">
                  Grow smarter with{" "}
                  <span className="font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                    Maeadati 🌾✨
                  </span>{" "}
                  Subscribe now to get exclusive offers, expert farming tips, and be the first to know when new gear
                  drops. Don't miss out — your farm deserves the best! 🚜🛠️
                </p>

                {/* Social Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {socialStats.map((stat, index) => (
                    <div
                      key={index}
                      className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 border border-white/30 hover:bg-white/30 transition-all duration-300 transform hover:scale-105"
                      style={{ animationDelay: `${index * 200}ms` }}
                    >
                      <div className="flex items-center space-x-2">
                        <stat.icon className={`h-5 w-5 ${stat.color}`} />
                        <div>
                          <p className="text-lg font-bold text-gray-800">{stat.count}</p>
                          <p className="text-xs text-gray-600 font-medium">{stat.label}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="group relative px-8 py-4 bg-gradient-to-r from-green-600 to-blue-600 text-white font-bold rounded-2xl shadow-2xl hover:shadow-green-500/25 transform hover:scale-105 transition-all duration-300 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-700 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative flex items-center justify-center space-x-2">
                    <Rocket className="h-5 w-5 transform group-hover:rotate-12 transition-transform duration-300" />
                    <span>Get Started</span>
                    <ChevronRight className="h-5 w-5 transform group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 group-hover:animate-shimmer"></div>
                </button>

                <button className="group relative px-8 py-4 bg-white/20 backdrop-blur-sm border-2 border-white/30 text-gray-700 font-bold rounded-2xl shadow-lg hover:shadow-xl hover:bg-white/30 transform hover:scale-105 transition-all duration-300">
                  <div className="flex items-center justify-center space-x-2">
                    <Video className="h-5 w-5 transform group-hover:rotate-12 transition-transform duration-300" />
                    <span>Watch Demo</span>
                  </div>
                </button>
              </div>

              {/* Additional Description */}
              <p className="text-base text-gray-600 leading-relaxed bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                Enjoy the most beautiful experience of getting to know and exchanging experiences with people interested
                in this field. Connect, learn, and grow together! 🌱
              </p>
            </div>

            {/* Right Content - Interactive Features */}
            <div className="space-y-6">
              {/* Community Features */}
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <Target className="h-6 w-6 text-green-600" />
                  Community Features
                </h3>

                <div className="space-y-3">
                  {communityFeatures.map((feature, index) => (
                    <div
                      key={index}
                      className={`group relative p-4 rounded-2xl border transition-all duration-500 cursor-pointer ${
                        activeFeature === index
                          ? `bg-gradient-to-r ${feature.gradient} text-white border-white/30 shadow-2xl scale-105`
                          : "bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20"
                      }`}
                      onClick={() => setActiveFeature(index)}
                    >
                      <div className="flex items-center space-x-4">
                        <div
                          className={`h-12 w-12 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                            activeFeature === index
                              ? "bg-white/20 backdrop-blur-sm"
                              : `bg-gradient-to-r ${feature.gradient}`
                          }`}
                        >
                          <feature.icon
                            className={`h-6 w-6 ${
                              activeFeature === index ? "text-white" : "text-white"
                            } transform group-hover:rotate-12 transition-transform duration-300`}
                          />
                        </div>
                        <div className="flex-1">
                          <h4
                            className={`font-bold text-lg ${activeFeature === index ? "text-white" : "text-gray-800"}`}
                          >
                            {feature.title}
                          </h4>
                          <p className={`text-sm ${activeFeature === index ? "text-white/80" : "text-gray-600"}`}>
                            {feature.description}
                          </p>
                        </div>
                        <div
                          className={`text-sm font-bold px-3 py-1 rounded-full ${
                            activeFeature === index ? "bg-white/20 text-white" : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {feature.stats}
                        </div>
                      </div>

                      {/* Active indicator */}
                      {activeFeature === index && (
                        <div className="absolute -right-1 top-1/2 transform -translate-y-1/2 w-2 h-8 bg-white rounded-full animate-pulse"></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Benefits Section */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Gift className="h-5 w-5 text-purple-600" />
                  Member Benefits
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { icon: Bell, text: "Early Access" },
                    { icon: Award, text: "Exclusive Rewards" },
                    { icon: UserPlus, text: "Expert Network" },
                    { icon: TrendingUp, text: "Growth Tips" },
                  ].map((benefit, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2 p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-300"
                    >
                      <benefit.icon className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium text-gray-700">{benefit.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Floating Success Indicators */}
          <div className="absolute top-4 right-4 flex space-x-2">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
            <div className="w-4 h-4 bg-purple-400 rounded-full animate-bounce"></div>
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
        
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
      `}</style>
    </div>
  )
}

export default SocialMedia;
