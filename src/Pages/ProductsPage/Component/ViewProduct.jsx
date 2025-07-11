// import Navication from "../../HomePage/Component/Navication.jsx";
// import HeroBackGround from "../../CategoriesPage/Component/HeroBackGround.jsx";
// import { React, useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import { ChevronRight, Heart, ShoppingCart, Star } from "lucide-react";
// import {
//   getProductById,
//   InsertProductIntoCart,
//   InsertProductIntoWishlist,
// } from "../Code/Product_data.js";

// import NoImage from "../../../assets/NoImage.jpg";
// export default function ViewProduct() {
//   const userId = localStorage.getItem("userId");
//   const params = useParams();
//   const productId = params.id;
//   const [product, setProduct] = useState({});

//   const fetchProduct = async () => {
//     const data = await getProductById(productId);
//     if (data) {
//       const mappedProduct = {
//         id: productId,
//         name: data.product_name,
//         category: data.category_name,
//         selling_price: data.selling_price,
//         original_price: data.original_price,
//         rating: data.product_rating,
//         reviews: data.number_of_users_rating_product,
//         stock: data.remaining_quantity,
//         description: data.description,
//         uses: data.uses,
//         how_use_it: data.how_use_it,
//         land_size: data.land_size,
//         company_name: data.company_name,
//         images: data.attachments,
//         year_of_manufacturing: data.year_of_manufacture,
//       };
//       setProduct(mappedProduct);
//     }
//   };
//   const [selectedImage, setSelectedImage] = useState(0);

//   useEffect(() => {
//     fetchProduct();
//   }, []);

//   return (
//     <div className="min-h-screen w-full flex flex-col bg-[#e6e6e6]">
//       <Navication />
//       <HeroBackGround>
//         <div className="mb-6 flex items-center">
//           <Link
//             to="/home"
//             className="text-[#a4a4a4] hover:text-teal-600 transition-colors pt-[100px]"
//           >
//             Home
//           </Link>
//           <ChevronRight className="text-[#a4a4a4] mx-2 h-4 w-4 mt-[100px]" />
//           <Link
//             to="/products"
//             className="text-black hover:text-teal-600 transition-colors pt-[100px]"
//           >
//             All Product
//           </Link>
//           <ChevronRight className="text-[#a4a4a4] mx-2 h-4 w-4 mt-[100px]" />
//           <Link
//             to={`/product/view/${product.id}`}
//             className="text-black hover:text-teal-600 transition-colors pt-[100px]"
//           >
//             {product.name}
//           </Link>
//         </div>
//         <h2 className="text-3xl font-bold text-black">{product.name}</h2>
//         <p className="text-[#a4a4a4] m-0 py-[30px]">
//           Browse our complete collection of high-quality agricultural tools and
//           equipment
//         </p>
//       </HeroBackGround>
//       {/* Product Details */}
//       <div className="bg-white rounded-xl border border-gray-200 overflow-hidden p-6 mb-6">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//           {/* Product Images */}
//           <div>
//             <div className="relative h-80 bg-gray-100 rounded-lg mb-4 overflow-hidden">
//               <img
//                 src={product.images?.[selectedImage] || NoImage}
//                 alt={product.name}
//                 className="object-contain"
//               />
//             </div>
//             <div className="flex space-x-2">
//               {(product.images || []).map((image, index) => (
//                 <div
//                   key={index}
//                   className={`relative h-20 w-20 bg-gray-100 rounded-md cursor-pointer border-2 ${
//                     selectedImage === index
//                       ? "border-green-500"
//                       : "border-transparent"
//                   } hover:border-green-300 transition-colors`}
//                   onClick={() => setSelectedImage(index)}
//                 >
//                   <img
//                     src={image || NoImage}
//                     alt={`${product.name} ${index + 1}`}
//                     className="object-contain p-1"
//                   />
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Product Info */}
//           <div>
//             <div className="flex flex-col mb-4 items-start justify-start">
//               <h1 className="text-2xl font-bold text-gray-900 mb-2 m-0 ">
//                 {product.name}
//               </h1>
//               <div className="flex items-center mb-2">
//                 <div className="flex items-center">
//                   {[...Array(5)].map((_, i) => (
//                     <Star
//                       key={i}
//                       className={`h-4 w-4 ${
//                         i < Math.floor(product.rating)
//                           ? "text-yellow-400"
//                           : "text-gray-300"
//                       }`}
//                       fill={
//                         i < Math.floor(product.rating) ? "currentColor" : "none"
//                       }
//                     />
//                   ))}
//                 </div>
//                 <span className="ml-2 text-sm text-gray-600">
//                   {product.rating} ({product.reviews} reviews)
//                 </span>
//               </div>
//               <div className="flex flex-row items-start justify-start gap-1">
//                 <p className="text-sm text-gray-600 mb-4 m-0">Price: </p>
//                 <p className="text-sm text-gray-600 mb-4 m-0">
//                   {product.selling_price != null
//                     ? `$${product.selling_price.toLocaleString()}`
//                     : "N/A"}
//                 </p>
//               </div>
//               <div className="flex flex-row items-start justify-start gap-1">
//                 <p className="text-sm text-gray-600 mb-4 m-0">
//                   Manufacturing Year:{" "}
//                 </p>
//                 <p className="text-sm text-gray-600 mb-4 m-0">
//                   {product.year_of_manufacturing}
//                 </p>
//               </div>
//               <p className="text-sm text-gray-600 mb-4 m-0">
//                 Category: {product.category}
//               </p>
//               <p className="text-sm text-gray-600 mb-4 m-0">
//                 Manufacture Company: {product.company_name}
//               </p>
//               <p className="text-sm text-gray-600 mb-4 m-0">
//                 Land Size: {product.land_size}
//               </p>
//               <div className="flex flex-row items-start justify-start gap-1">
//                 <p className="text-sm text-gray-600 m-0">Stock: </p>
//                 <p className="text-sm text-gray-600 m-0">
//                   {product.stock} units available
//                 </p>
//               </div>
//             </div>
//             <div className="flex flex-row items-center justify-end gap-4">
//               <button
//                 className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 text-white rounded-lg transition-all duration-300 hover:shadow-lg flex items-center justify-center"
//                 onClick={() => {
//                   InsertProductIntoCart(
//                     userId,
//                     product.id,
//                     1,
//                     product.name
//                   );
//                 }}
//               >
//                 <ShoppingCart className="h-5 w-5 mr-2" />
//                 Add to Cart
//               </button>
//               <button className="p-3 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors hover:text-red-500"
//               onClick={() => {
//                 InsertProductIntoWishlist(
//                   userId,
//                   product.id,
//                   product.name
//                 );
//               }}>
//                 <Heart className="h-5 w-5" />
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Product Specifications */}
//       <div className="bg-white rounded-xl border border-gray-200 overflow-hidden p-6 mb-6">
//         <h2 className="text-xl font-bold text-gray-900 mb-4">Specifications</h2>
//         <div className="flex flex-row gap-5 items-center justify-center">
//           <div className="w-[30%]">
//             <h3 className="text-lg font-medium text-gray-900 mb-2">
//               How use it
//             </h3>
//             {product.how_use_it}
//           </div>
//           <div className="w-[30%]">
//             <h3 className="text-lg font-medium text-gray-900 mb-2">
//               Description
//             </h3>
//             {product.description}
//           </div>
//           <div className="w-[30%]">
//             <h3 className="text-lg font-medium text-gray-900 mb-2">Uses</h3>
//             {product.uses}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client"

import Navication from "../../HomePage/Component/Navication.jsx"
import { useEffect, useState, useRef } from "react"
import { Link, useParams } from "react-router-dom"
import {
  ChevronRight,
  Heart,
  ShoppingCart,
  Star,
  Sparkles,
  Zap,
  Shield,
  Truck,
  RotateCcw,
  MessageCircle,
  Share2,
  Bookmark,
  Plus,
  Minus,
  Eye,
  Camera,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Download,
  Award,
  TrendingUp,
  Users,
  Clock,
  MapPin,
  Leaf,
  Sun,
  Droplets,
  Crown,
  Diamond,
  Rocket,
  Target,
  Palette,
  Cpu,
  Gauge,
  Settings,
  Info,
  CheckCircle,
  ThumbsUp,
  Package,
  Phone,
} from "lucide-react"
import { getProductById, InsertProductIntoCart, InsertProductIntoWishlist } from "../Code/Product_data.js"

import NoImage from "../../../assets/NoImage.jpg"

export default function ViewProduct() {
  const userId = localStorage.getItem("userId")
  const params = useParams()
  const productId = params.id
  const [product, setProduct] = useState({})
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState("overview")
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [loading, setLoading] = useState(true)
  const [isVisible, setIsVisible] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isImageZoomed, setIsImageZoomed] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [viewCount, setViewCount] = useState(1247)
  const [isPlaying3D, setIsPlaying3D] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [activeFeature, setActiveFeature] = useState(0)
  const [particleCount, setParticleCount] = useState(0)
  const [colorTheme, setColorTheme] = useState("cosmic")

  const sectionRef = useRef(null)
  const imageRef = useRef(null)
  const canvasRef = useRef(null)

  // Redirect if no user
  if (!userId) {
    return <Link to="/signIn" />
  }

  // Enhanced product fetch with loading states
  const fetchProduct = async () => {
    setLoading(true)
    try {
      const data = await getProductById(productId)
      if (data) {
        const mappedProduct = {
          id: productId,
          name: data.product_name || "Amazing Product",
          category: data.category_name || "Premium Category",
          selling_price: data.selling_price || 0,
          original_price: data.original_price || 0,
          rating: data.product_rating || 4.8,
          reviews: data.number_of_users_rating_product || 156,
          stock: data.remaining_quantity || 25,
          description: data.description || "Revolutionary agricultural equipment designed for the future.",
          uses: data.uses || "Perfect for modern farming operations and sustainable agriculture.",
          how_use_it: data.how_use_it || "Easy to use with intuitive controls and smart automation features.",
          land_size: data.land_size || "1-50 acres",
          company_name: data.company_name || "TechFarm Industries",
          images: data.attachments || [NoImage],
          year_of_manufacturing: data.year_of_manufacture || new Date().getFullYear(),
          warranty: "2 Years Premium Warranty",
          weight: "125 kg",
          dimensions: "2.5m x 1.2m x 1.8m",
          power_source: "Electric/Hybrid",
          efficiency: "98%",
          certifications: ["ISO 9001", "CE Certified", "Energy Star"],
        }
        setProduct(mappedProduct)
        // Simulate view count increment
        setViewCount((prev) => prev + Math.floor(Math.random() * 5) + 1)
      }
    } catch (error) {
      console.error("Error fetching product:", error)
    } finally {
      setLoading(false)
    }
  }

  // Enhanced image handling
  const getDriveThumbnail = (url) => {
    if (!url || url.trim() === "") return NoImage
    const match = url.match(/\/d\/([^/]+)\//)
    return match ? `https://drive.google.com/thumbnail?id=${match[1]}` : NoImage
  }

  // Mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Scroll progress tracking
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress((scrolled / maxScroll) * 100)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Time updates
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // Auto-rotate features
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 6)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  // Particle animation
  useEffect(() => {
    const interval = setInterval(() => {
      setParticleCount((prev) => (prev + 1) % 100)
    }, 100)
    return () => clearInterval(interval)
  }, [])

  // Intersection observer
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

  useEffect(() => {
    fetchProduct()
  }, [productId])

  // Enhanced handlers
  const handleAddToCart = async () => {
    try {
      await InsertProductIntoCart(userId, product.id, quantity, product.name)
      // Add success animation/notification here
      alert(`${product.name} added to cart successfully!`)
    } catch (error) {
      console.error("Error adding to cart:", error)
      alert("Failed to add to cart. Please try again.")
    }
  }

  const handleAddToWishlist = async () => {
    try {
      await InsertProductIntoWishlist(userId, product.id, product.name)
      setIsLiked(!isLiked)
      alert(`${product.name} added to wishlist successfully!`)
    } catch (error) {
      console.error("Error adding to wishlist:", error)
      alert("Failed to add to wishlist. Please try again.")
    }
  }

  // Color themes
  const themes = {
    cosmic: {
      primary: "from-purple-600 via-blue-600 to-indigo-700",
      secondary: "from-pink-500 to-rose-600",
      accent: "from-cyan-400 to-blue-500",
      background: "from-slate-900 via-purple-900 to-slate-900",
    },
    nature: {
      primary: "from-green-600 via-emerald-600 to-teal-700",
      secondary: "from-yellow-500 to-orange-600",
      accent: "from-lime-400 to-green-500",
      background: "from-green-900 via-emerald-900 to-green-900",
    },
    sunset: {
      primary: "from-orange-600 via-red-600 to-pink-700",
      secondary: "from-yellow-500 to-orange-600",
      accent: "from-pink-400 to-red-500",
      background: "from-orange-900 via-red-900 to-pink-900",
    },
  }

  const currentTheme = themes[colorTheme]

  // Floating elements
  const floatingElements = [
    { icon: Leaf, color: "text-green-400", position: "top-10 left-10", delay: "0s" },
    { icon: Sun, color: "text-yellow-400", position: "top-20 right-20", delay: "0.5s" },
    { icon: Droplets, color: "text-blue-400", position: "bottom-32 left-16", delay: "1s" },
    { icon: Sparkles, color: "text-purple-400", position: "bottom-20 right-32", delay: "1.5s" },
    { icon: Crown, color: "text-yellow-500", position: "top-1/3 left-8", delay: "2s" },
    { icon: Diamond, color: "text-cyan-400", position: "bottom-1/3 right-12", delay: "2.5s" },
  ]

  // Product features
  const features = [
    { icon: Shield, title: "Premium Warranty", description: "2 Years Full Coverage", color: "text-green-400" },
    { icon: Truck, title: "Free Shipping", description: "Worldwide Delivery", color: "text-blue-400" },
    { icon: RotateCcw, title: "Easy Returns", description: "30-Day Money Back", color: "text-purple-400" },
    { icon: MessageCircle, title: "24/7 Support", description: "Expert Assistance", color: "text-pink-400" },
    { icon: Award, title: "Certified Quality", description: "ISO Standards", color: "text-yellow-400" },
    { icon: Zap, title: "High Performance", description: "98% Efficiency", color: "text-orange-400" },
  ]

  // Tabs configuration
  const tabs = [
    { id: "overview", label: "Overview", icon: Info },
    { id: "specifications", label: "Specifications", icon: Settings },
    { id: "support", label: "Support", icon: MessageCircle },
  ]

  if (loading) {
    return (
      <div
        className={`min-h-screen bg-gradient-to-br ${currentTheme.background} flex items-center justify-center relative overflow-hidden`}
      >
        {/* Animated background */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="text-center space-y-8 z-10">
          <div className="relative">
            <div className="h-32 w-32 mx-auto">
              <div
                className={`absolute inset-0 bg-gradient-to-r ${currentTheme.primary} rounded-full animate-spin`}
              ></div>
              <div
                className={`absolute inset-2 bg-gradient-to-r ${currentTheme.secondary} rounded-full animate-spin reverse`}
              ></div>
              <div
                className={`absolute inset-4 bg-gradient-to-r ${currentTheme.accent} rounded-full animate-pulse`}
              ></div>
              <div className="absolute inset-6 bg-white rounded-full flex items-center justify-center">
                <Sparkles className="h-8 w-8 text-purple-600 animate-pulse" />
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <h2 className="text-5xl font-black bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
              Loading Magical Product
            </h2>
            <div className="flex items-center justify-center space-x-2">
              <div className="h-3 w-3 bg-purple-400 rounded-full animate-bounce"></div>
              <div className="h-3 w-3 bg-pink-400 rounded-full animate-bounce delay-100"></div>
              <div className="h-3 w-3 bg-blue-400 rounded-full animate-bounce delay-200"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      ref={sectionRef}
      className={`min-h-screen w-full relative overflow-hidden bg-gradient-to-br ${currentTheme.background}`}
    >
      {/* Navigation */}
      <Navication />

      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-black/20 z-50">
        <div
          className={`h-full bg-gradient-to-r ${currentTheme.primary} transition-all duration-300`}
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>

      {/* Dynamic background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Animated gradient orbs */}
        <div
          className="absolute w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse"
          style={{
            left: `${mousePosition.x / 20}px`,
            top: `${mousePosition.y / 20}px`,
            transform: "translate(-50%, -50%)",
          }}
        ></div>
        <div
          className="absolute w-80 h-80 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"
          style={{
            right: `${mousePosition.x / 30}px`,
            bottom: `${mousePosition.y / 30}px`,
            transform: "translate(50%, 50%)",
          }}
        ></div>

        {/* Floating elements */}
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

        {/* Animated particles */}
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 bg-gradient-to-r ${currentTheme.accent} rounded-full animate-ping opacity-20`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Color Theme Selector */}
      <div className="fixed top-24 right-6 z-40 bg-white/10 backdrop-blur-2xl rounded-2xl p-4 border border-white/20">
        <div className="flex flex-col gap-2">
          <Palette className="h-5 w-5 text-white mx-auto mb-2" />
          {Object.keys(themes).map((theme) => (
            <button
              key={theme}
              onClick={() => setColorTheme(theme)}
              className={`w-8 h-8 rounded-full transition-all duration-300 ${
                colorTheme === theme ? "scale-125 ring-2 ring-white" : "hover:scale-110"
              }`}
              style={{
                background: `linear-gradient(45deg, ${
                  theme === "cosmic" ? "#8b5cf6, #3b82f6" : theme === "nature" ? "#10b981, #059669" : "#f97316, #dc2626"
                })`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Hero Section with Breadcrumb */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Enhanced Breadcrumb */}
          {/* Hero Title */}
          <div
            className={`text-center space-y-6 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
            style={{ animationDelay: "200ms" }}
          >
            {/* Live Stats */}
            <div className="flex flex-wrap justify-center gap-6 mt-8">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl px-6 py-3 border border-white/20 hover:bg-white/20 transition-all duration-300 group">
                <div className="flex items-center space-x-2">
                  <Eye className="h-6 w-6 text-cyan-400 group-hover:animate-pulse" />
                  <span className="font-bold text-white">{viewCount.toLocaleString()} Views</span>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl px-6 py-3 border border-white/20 hover:bg-white/20 transition-all duration-300 group">
                <div className="flex items-center space-x-2">
                  <Clock className="h-6 w-6 text-green-400 group-hover:animate-spin" />
                  <span className="font-bold text-white">{currentTime.toLocaleTimeString()}</span>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl px-6 py-3 border border-white/20 hover:bg-white/20 transition-all duration-300 group">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-6 w-6 text-yellow-400 group-hover:animate-bounce" />
                  <span className="font-bold text-white">Trending #1</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Product Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Product Showcase */}
        <div className="bg-white/5 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/10 overflow-hidden mb-12 hover:bg-white/10 transition-all duration-500">
          <div className="grid lg:grid-cols-2 gap-12 p-8">
            {/* Enhanced Image Gallery */}
            <div className="space-y-6">
              {/* Main Image with 3D Effects */}
              <div className="relative group">
                <div className="relative aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 shadow-2xl">
                  <img
                    ref={imageRef}
                    src={getDriveThumbnail(product.images?.[selectedImage]) || NoImage}
                    alt={product.name}
                    className={`w-full h-full object-cover transition-all duration-700 ${
                      isImageZoomed ? "scale-150" : "group-hover:scale-110"
                    }`}
                    onClick={() => setIsImageZoomed(!isImageZoomed)}
                  />

                  {/* Image Overlay Controls */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                      
                    </div>
                  </div>

                  {/* Magic Sparkles */}
                  <div className="absolute top-4 right-4 animate-pulse">
                    <Sparkles className="h-8 w-8 text-yellow-400" />
                  </div>
                </div>

                {/* Image Counter */}
                <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1 text-white text-sm">
                  {selectedImage + 1} / {product.images?.length || 1}
                </div>
              </div>

              {/* Enhanced Thumbnail Gallery */}
              <div className="flex gap-4 overflow-x-auto pb-2">
                {(product.images || [NoImage]).map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative h-20 w-20 rounded-2xl overflow-hidden border-2 transition-all duration-300 transform hover:scale-110 ${
                      selectedImage === index
                        ? `border-purple-500 shadow-lg shadow-purple-500/50 scale-110`
                        : "border-white/20 hover:border-purple-300"
                    }`}
                  >
                    <img
                      src={getDriveThumbnail(image) || NoImage}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    {selectedImage === index && (
                      <div className="absolute inset-0 bg-purple-500/20 flex items-center justify-center">
                        <CheckCircle className="h-6 w-6 text-white" />
                      </div>
                    )}
                  </button>
                ))}
              </div>

            
            </div>

            {/* Enhanced Product Info */}
            <div className="space-y-8">
              {/* Header */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span
                    className={`bg-gradient-to-r ${currentTheme.accent} text-white px-3 py-1 rounded-full text-sm font-semibold`}
                  >
                    {product.category}
                  </span>
                  <span className="bg-white/10 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {product.company_name}
                  </span>
                  <span className="bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                    <CheckCircle className="h-3 w-3" />
                    In Stock
                  </span>
                </div>

                <h2 className="text-4xl font-bold text-white">{product.name}</h2>

                {/* Enhanced Rating */}
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-6 w-6 transition-all duration-200 ${
                          i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-500"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-white font-semibold text-lg">{product.rating}</span>
                  <span className="text-white/60">({product.reviews} reviews)</span>
                  <div className="flex items-center gap-1 text-green-400">
                    <TrendingUp className="h-4 w-4" />
                    <span className="text-sm">Trending</span>
                  </div>
                </div>
              </div>

              {/* Enhanced Price Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span
                    className={`text-5xl font-black bg-gradient-to-r ${currentTheme.primary} bg-clip-text text-transparent`}
                  >
                    ${product.selling_price?.toLocaleString()}
                  </span>
                  {product.original_price > product.selling_price && (
                    <span className="text-2xl text-white/50 line-through">
                      ${product.original_price?.toLocaleString()}
                    </span>
                  )}
                </div>
                {product.original_price > product.selling_price && (
                  <div className="flex items-center gap-2">
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse">
                      SAVE ${(product.original_price - product.selling_price).toLocaleString()}
                    </span>
                    <span className="text-green-400 font-semibold">
                      ({Math.round(((product.original_price - product.selling_price) / product.original_price) * 100)}%
                      OFF)
                    </span>
                  </div>
                )}
              </div>

              {/* Quick Info Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="h-5 w-5 text-blue-400" />
                    <span className="text-white/80 text-sm">Manufacturing Year</span>
                  </div>
                  <span className="text-white font-semibold">{product.year_of_manufacturing}</span>
                </div>
                <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="h-5 w-5 text-green-400" />
                    <span className="text-white/80 text-sm">Land Coverage</span>
                  </div>
                  <span className="text-white font-semibold">{product.land_size}</span>
                </div>
                <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <Package className="h-5 w-5 text-purple-400" />
                    <span className="text-white/80 text-sm">Stock Available</span>
                  </div>
                  <span className="text-green-400 font-semibold">{product.stock} units</span>
                </div>
                <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="h-5 w-5 text-yellow-400" />
                    <span className="text-white/80 text-sm">Warranty</span>
                  </div>
                  <span className="text-white font-semibold">{product.warranty}</span>
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="space-y-4">
                <h3 className="text-white font-semibold text-lg">Quantity</h3>
                <div className="flex items-center gap-4">
                  <div className="flex items-center bg-white/10 rounded-2xl border border-white/20">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-3 hover:bg-white/10 rounded-l-2xl transition-colors"
                    >
                      <Minus className="h-5 w-5 text-white" />
                    </button>
                    <span className="px-6 py-3 text-white font-semibold text-lg">{quantity}</span>
                    <button
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      className="p-3 hover:bg-white/10 rounded-r-2xl transition-colors"
                    >
                      <Plus className="h-5 w-5 text-white" />
                    </button>
                  </div>
                  <span className="text-white/60">of {product.stock} available</span>
                </div>
              </div>

              {/* Enhanced Action Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={handleAddToCart}
                  className={`flex-1 bg-gradient-to-r ${currentTheme.primary} text-white py-4 rounded-2xl font-semibold hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 relative overflow-hidden`}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                  <ShoppingCart className="h-6 w-6" />
                  Add to Cart
                  <div className="absolute top-0 right-0 w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
                </button>
                <button
                  onClick={handleAddToWishlist}
                  className={`p-4 rounded-2xl border-2 transition-all duration-300 ${
                    isLiked
                      ? "border-red-500 bg-red-50 text-red-500"
                      : "border-white/20 hover:border-red-300 hover:bg-red-50 hover:text-red-500"
                  }`}
                >
                  <Heart className={`h-6 w-6 ${isLiked ? "fill-current" : ""}`} />
                </button>
             
              </div>

              {/* Features Grid */}
              <div className="grid grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-3 p-4 rounded-2xl transition-all duration-300 ${
                      activeFeature === index
                        ? "bg-white/20 border border-white/30 scale-105"
                        : "bg-white/5 border border-white/10 hover:bg-white/10"
                    }`}
                  >
                    <div
                      className={`h-12 w-12 rounded-xl flex items-center justify-center bg-gradient-to-r ${currentTheme.accent}`}
                    >
                      <feature.icon className={`h-6 w-6 text-white`} />
                    </div>
                    <div>
                      <p className="font-semibold text-white text-sm">{feature.title}</p>
                      <p className="text-white/60 text-xs">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Tabs Section */}
        <div className="bg-white/5 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/10 overflow-hidden">
          {/* Tab Navigation */}
          <div className="border-b border-white/20">
            <div className="flex overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 font-semibold transition-all duration-300 whitespace-nowrap ${
                    activeTab === tab.id
                      ? `text-white border-b-2 border-purple-500 bg-gradient-to-r ${currentTheme.primary}/20`
                      : "text-white/70 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <tab.icon className="h-5 w-5" />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-8">
            {activeTab === "overview" && (
              <div className="space-y-8">
                <h3 className="text-3xl font-bold text-white mb-6">Product Overview</h3>
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold text-white flex items-center gap-2">
                      <Info className="h-5 w-5 text-blue-400" />
                      Description
                    </h4>
                    <p className="text-white/80 leading-relaxed">{product.description}</p>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold text-white flex items-center gap-2">
                      <Settings className="h-5 w-5 text-green-400" />
                      How to Use
                    </h4>
                    <p className="text-white/80 leading-relaxed">{product.how_use_it}</p>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold text-white flex items-center gap-2">
                      <Target className="h-5 w-5 text-purple-400" />
                      Applications
                    </h4>
                    <p className="text-white/80 leading-relaxed">{product.uses}</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "specifications" && (
              <div className="space-y-8">
                <h3 className="text-3xl font-bold text-white mb-6">Technical Specifications</h3>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                      <h4 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                        <Cpu className="h-5 w-5 text-blue-400" />
                        General Specifications
                      </h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-white/70">Category</span>
                          <span className="text-white font-semibold">{product.category}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/70">Manufacturer</span>
                          <span className="text-white font-semibold">{product.company_name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/70">Year</span>
                          <span className="text-white font-semibold">{product.year_of_manufacturing}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/70">Weight</span>
                          <span className="text-white font-semibold">{product.weight}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                      <h4 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                        <Gauge className="h-5 w-5 text-green-400" />
                        Performance Metrics
                      </h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-white/70">Efficiency</span>
                          <span className="text-green-400 font-semibold">{product.efficiency}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/70">Power Source</span>
                          <span className="text-white font-semibold">{product.power_source}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/70">Dimensions</span>
                          <span className="text-white font-semibold">{product.dimensions}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/70">Land Coverage</span>
                          <span className="text-white font-semibold">{product.land_size}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}


            {activeTab === "support" && (
              <div className="space-y-8">
                <h3 className="text-3xl font-bold text-white mb-6">Customer Support</h3>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                      <h4 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                        <MessageCircle className="h-5 w-5 text-purple-400" />
                        Contact Options
                      </h4>
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 bg-purple-500/20 rounded-xl flex items-center justify-center">
                            <MessageCircle className="h-5 w-5 text-purple-400" />
                          </div>
                          <div>
                            <p className="font-semibold text-white">Live Chat</p>
                            <p className="text-white/60 text-sm">Available 24/7</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
                            <Phone className="h-5 w-5 text-blue-400" />
                          </div>
                          <div>
                            <p className="font-semibold text-white">Phone Support</p>
                            <p className="text-white/60 text-sm">+1 (555) 123-4567</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                      <h4 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                        <Info className="h-5 w-5 text-green-400" />
                        Resources
                      </h4>
                      <div className="space-y-3">
                        <button className="w-full text-left p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
                          <span className="text-white">User Manual (PDF)</span>
                        </button>
                        <button className="w-full text-left p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
                          <span className="text-white">Video Tutorials</span>
                        </button>
                        <button className="w-full text-left p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
                          <span className="text-white">FAQ Section</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
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
        
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out forwards;
        }
        
        .reverse {
          animation-direction: reverse;
        }
      `}</style>
    </div>
  )
}
