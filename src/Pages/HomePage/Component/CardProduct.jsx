import { useState, useEffect, useRef } from "react"
import { Star, Heart, ShoppingCart, Eye } from "lucide-react"
import { InsertProductIntoCart, InsertProductIntoWishlist } from "../../ProductsPage/Code/Product_data"
import NoImage from "../../../assets/NoImage.jpg"

function CardProduct({ product, index }) {
  const [isHovered, setIsHovered] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const cardRef = useRef(null)

  const {
    id,
    name,
    price,
    originalPrice,
    tag,
    description,
    rating,
    availability,
    image,
    gradient,
    category,
    discount,
    features,
  } = product

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const handleWishlist = async () => {
    const userId = localStorage.getItem("userId")
    if (userId) {
      try {
        await InsertProductIntoWishlist(userId, id)
        setIsLiked(!isLiked)
      } catch (error) {
        console.error("Error updating wishlist:", error)
      }
    }
  }

  const handleAddToCart = async () => {
    const userId = localStorage.getItem("userId")
    if (userId && !isAddingToCart) {
      try {
        setIsAddingToCart(true)
        await InsertProductIntoCart(userId, id, 1, )
      } catch (error) {
        console.error("Error adding to cart:", error)
      } finally {
        setIsAddingToCart(false)
      }
    }
  }

  const renderStars = () => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="h-4 w-4 fill-yellow-400 text-yellow-400" />)
    }

    if (hasHalfStar) {
      stars.push(<Star key="half" className="h-4 w-4 fill-yellow-400/50 text-yellow-400" />)
    }

    for (let i = stars.length; i < 5; i++) {
      stars.push(<Star key={`empty-${i}`} className="h-4 w-4 text-gray-300" />)
    }

    return stars
  }

  const getDriveThumbnail = (url) => {
    if (!url || url.trim() === "") return NoImage
    const match = url.match(/\/d\/([^/]+)\//)
    return match ? `https://drive.google.com/thumbnail?id=${match[1]}` : url
  }

  return (
    <div
      ref={cardRef}
      className={`group relative transform transition-all duration-700 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main Card */}
      <div className="relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden transform group-hover:scale-105 group-hover:-translate-y-2">
        {/* Animated Background Gradient */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
        ></div>

        {/* Discount Badge */}
        {discount > 0 && (
          <div className="absolute top-4 left-4 z-20">
            <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg animate-pulse">
              -{discount}%
            </div>
          </div>
        )}

        {/* Tag Badge */}
        <div className="absolute top-4 right-4 z-20">
          <div className={`bg-gradient-to-r ${gradient} text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg`}>
            {tag}
          </div>
        </div>

        {/* Image Section */}
        <div className="relative h-64 overflow-hidden rounded-t-3xl">
          <div
            className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
            style={{
              backgroundImage: `url(${getDriveThumbnail(image)})`,
            }}
          >
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            {/* Floating Action Buttons */}
            <div className="absolute top-4 right-4 flex flex-col gap-2 transform translate-x-12 group-hover:translate-x-0 transition-transform duration-300">
              <button
                onClick={handleWishlist}
                className={`h-10 w-10 rounded-full backdrop-blur-sm border border-white/20 shadow-lg flex items-center justify-center transition-all duration-300 ${
                  isLiked ? "bg-red-500 text-white" : "bg-white/90 text-gray-600 hover:bg-red-500 hover:text-white"
                }`}
              >
                <Heart className={`h-5 w-5 ${isLiked ? "fill-current" : ""}`} />
              </button>
              <button className="h-10 w-10 rounded-full bg-white/90 backdrop-blur-sm border border-white/20 text-gray-600 hover:bg-blue-500 hover:text-white shadow-lg flex items-center justify-center transition-all duration-300">
                <Eye className="h-5 w-5" />
              </button>
            </div>

            {/* Category Badge */}
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-medium text-gray-700">
              {category}
            </div>

            {/* Description Overlay */}
            <div className="absolute inset-x-4 bottom-16 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <p className="text-white text-sm font-medium bg-black/50 backdrop-blur-sm rounded-lg px-3 py-2">
                {description}
              </p>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 space-y-4">
          {/* Title and Availability */}
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-gray-800 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-gray-800 group-hover:to-gray-600 group-hover:bg-clip-text transition-all duration-300">
              {name}
            </h3>
            <div className="flex items-center justify-between">
              <span
                className={`text-sm font-medium px-2 py-1 rounded-full ${
                  availability ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                }`}
              >
                {availability ? "✓ Available" : "✗ Out of Stock"}
              </span>
              <div className="flex items-center gap-1">
                {renderStars()}
                <span className="text-sm text-gray-500 ml-1">({rating})</span>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-2">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Key Features</p>
            <div className="flex flex-wrap gap-1">
              {features.slice(0, 2).map((feature, idx) => (
                <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                  {feature}
                </span>
              ))}
              {features.length > 2 && (
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                  +{features.length - 2} more
                </span>
              )}
            </div>
          </div>

          {/* Price Section */}
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-gray-800">${price}</span>
                {originalPrice > price && <span className="text-sm text-gray-500 line-through">${originalPrice}</span>}
              </div>
              {originalPrice > price && (
                <p className="text-xs text-green-600 font-medium">Save ${(originalPrice - price).toFixed(2)}</p>
              )}
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={handleAddToCart}
            disabled={!availability || isAddingToCart}
            className={`w-full py-3 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 ${
              availability
                ? `bg-gradient-to-r ${gradient} text-white shadow-lg hover:shadow-xl ${
                    isAddingToCart ? "opacity-75 cursor-not-allowed" : ""
                  }`
                : "bg-gray-200 text-gray-500 cursor-not-allowed"
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              {isAddingToCart ? "Adding..." : availability ? "Add to Cart" : "Out of Stock"}
            </div>
          </button>
        </div>

        {/* Hover Effects */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
      </div>

      {/* Floating Elements */}
      {isHovered && <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full animate-ping"></div>}
    </div>
  )
}

export default CardProduct;
