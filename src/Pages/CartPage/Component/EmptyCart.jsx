import { Link } from "react-router-dom"
import { ShoppingBag, Heart, Star, ArrowRight } from "lucide-react"

function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-8">
      {/* Animated empty cart illustration */}
      <div className="relative mb-8">
        <div className="bg-gradient-to-br from-teal-100 to-blue-100 rounded-full p-8 mb-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-teal-200/50 to-blue-200/50 rounded-full animate-pulse"></div>
          <ShoppingBag className="h-16 w-16 text-teal-600 relative z-10 animate-bounce" />

          {/* Floating elements */}
          <div className="absolute -top-2 -right-2 animate-float">
            <Heart className="h-6 w-6 text-pink-400" />
          </div>
          <div className="absolute -bottom-2 -left-2 animate-float delay-1000">
            <Star className="h-5 w-5 text-yellow-400" />
          </div>
        </div>

        {/* Ripple effect */}
        <div className="absolute inset-0 rounded-full border-4 border-teal-200 animate-ping opacity-20"></div>
        <div className="absolute inset-0 rounded-full border-4 border-blue-200 animate-ping opacity-20 delay-500"></div>
      </div>

      <div className="text-center max-w-md">
        <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
          Your cart feels lonely
        </h2>
        <p className="text-gray-600 mb-8 text-lg leading-relaxed">
          It's waiting for some amazing products to keep it company.
          <span className="block mt-2 text-teal-600 font-medium">Let's fill it with something special! ✨</span>
        </p>

        {/* Animated button */}
        <Link to="/products">
          <button className="group relative bg-gradient-to-r from-teal-600 to-blue-600 text-white py-4 px-8 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-teal-700 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative flex items-center gap-2">
              <span>Start Shopping</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </div>

            {/* Shimmer effect */}
            <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shimmer"></div>
          </button>
        </Link>
      </div>

      {/* Decorative elements */}
      <div className="mt-12 flex gap-4 opacity-60">
        <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse"></div>
        <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-300"></div>
        <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-600"></div>
      </div>
    </div>
  )
}

export default EmptyCart
