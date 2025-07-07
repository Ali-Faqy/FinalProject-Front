import { Link } from 'react-router-dom'
import CartItems from './CartItems.jsx'
import { ShoppingCart, Sparkles } from 'lucide-react'
import Navigation from '../../HomePage/Component/Navication.jsx'

function CartPage() {
  return (
    <div className='min-h-screen w-screen overflow-x-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative'>
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-teal-400/20 to-green-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-pink-400/10 to-orange-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>
      
      <Navigation/>
      
      {/* Hero section with animated title */}
      <div className="relative z-10 pt-8 pb-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="relative">
                <ShoppingCart className="h-8 w-8 text-teal-600 animate-bounce" />
                <Sparkles className="h-4 w-4 text-yellow-500 absolute -top-1 -right-1 animate-pulse" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-teal-600 via-blue-600 to-purple-600 bg-clip-text text-transparent m-0">
                Your Shopping Cart
              </h1>
            </div>
            <p className="text-gray-600 text-lg">Review your items and proceed to checkout</p>
          </div>
        </div>
      </div>
      
      <div className='flex flex-col lg:flex-row gap-8 items-start justify-center w-full min-h-[650px] px-4 pb-8 relative z-10'>
        <CartItems />
      </div>
    </div>
  )
}

export default CartPage
