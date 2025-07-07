import { useState } from "react"
import { Link } from "react-router-dom"
import { Star, Heart, ShoppingCart, Eye, ChevronLeft, ChevronRight } from "lucide-react"
import {
    InsertProductIntoCart,
    InsertProductIntoWishlist,
  } from "../../ProductsPage/Code/Product_data.js"
  import NoImage from "../../../assets/NoImage.jpg"
function Card({ product }) {
  const [isLiked, setIsLiked] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const userId = localStorage.getItem("userId")

  const getImageUrl = (url) => {
    const safeUrl = String(url || '');
    const match = safeUrl.match(/\/d\/([^/]+)\//);
    return match ? `https://drive.google.com/thumbnail?id=${match[1]}` : NoImage;
  };
  

  // Multiple image sources for carousel
  const images = [
    getImageUrl(product.image)
  ]

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const handleAddToCart = (product) => {
      try {
        InsertProductIntoCart(userId, product.id, 1, product.name)
      } catch (error) {
        console.error("Error adding to cart:", error)
      }
    }
  
    const handleAddToWishlist = (product) => {
      try {
        InsertProductIntoWishlist(userId, product.id, product.name)
      } catch (error) {
        console.error("Error adding to wishlist:", error)
      }
    }

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden max-w-sm mx-auto">
      {/* Header with ID and Rating */}
      <div className="flex justify-between items-center p-4 pb-2">
        <span className="text-sm font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
          {product.id || "PRD-001"}
        </span>
        <div className="flex items-center gap-1">
          <Star className="w-4 h-4 text-yellow-400 fill-current" />
          <span className="text-sm font-semibold text-gray-700">{product.rating || "4.8"}</span>
        </div>
      </div>

      {/* Product Image Section */}
      <div className="relative group px-4">
        <div className="relative h-48 bg-gray-50 rounded-xl overflow-hidden">
          <img
            src={images[currentImageIndex] || "/placeholder.svg"}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />

          {/* Image Navigation */}
          <button
            onClick={prevImage}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-white/80 hover:bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-md"
          >
            <ChevronLeft className="w-4 h-4 text-gray-600" />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-white/80 hover:bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-md"
          >
            <ChevronRight className="w-4 h-4 text-gray-600" />
          </button>

          {/* Wishlist Button */}
          <button
            onClick={() => {
                setIsLiked(!isLiked);
                handleAddToWishlist(product);
              }}

            className="absolute top-3 right-3 w-9 h-9 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-md transition-all duration-200 hover:scale-110"
          >
            <Heart
              className={`w-5 h-5 transition-colors duration-200 ${
                isLiked ? "text-red-500 fill-current" : "text-gray-400 hover:text-red-400"
              }`}
            />
          </button>

          {/* Quick View Button */}
          <Link to={`/product/view/${product.id}`}><button className="absolute top-3 left-3 w-9 h-9 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110">
            <Eye className="w-5 h-5 text-gray-600" />
          </button></Link>
        </div>

        {/* Image Indicators */}
        <div className="flex justify-center gap-1 mt-3">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentImageIndex(i)}
              className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                i === currentImageIndex ? "bg-blue-500" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4 pt-3">
        {/* Product Name */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{product.name || "Amazing Product"}</h3>

        {/* Company Tag */}
        <p className="text-sm text-gray-500 mb-3">{product.tag || "Premium Brand"}</p>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {product.description ||
            "Advanced system designed to assist with complex data analysis and pattern recognition tasks."}
        </p>

        {/* Price and Availability */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-2xl font-bold text-gray-900">${product.price || "899"}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${product.availability ? "bg-green-500" : "bg-red-500"}`} />
            <span className={`text-sm font-medium ${product.availability ? "text-green-600" : "text-red-600"}`}>
              {product.availability ? "In Stock" : "Out of Stock"}
            </span>
          </div>
        </div>

        {/* Add to Cart Button */}
        <button
          className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
            product.availability
              ? "bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          onClick={() => handleAddToCart(product)}
          disabled={!product.availability}
        >
          <ShoppingCart className="w-5 h-5" />
          {product.availability ? "Add to Cart" : "Out of Stock"}
        </button>
      </div>
    </div>
  )
}

export default Card;
