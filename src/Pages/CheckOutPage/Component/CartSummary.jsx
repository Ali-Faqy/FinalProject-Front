import { ShoppingBag, Gift, Truck, Calculator, Sparkles, Tag } from "lucide-react"

export default function CartSummary({ cart, total }) {
  const shipping = 5.99
  const tax = total * 0.07
  const finalTotal = total + shipping + tax

  const originalTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0)
  const discountTotal = originalTotal - total
const getDriveThumbnail = (url) => {
    if (!url || url.trim() === "") return image10
    const match = url.match(/\/d\/([^/]+)\//)
    return match ? `https://drive.google.com/thumbnail?id=${match[1]}` : image10
  }

  return (
    <div className="flex flex-col h-full relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-blue-50 to-teal-50 opacity-60"></div>
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-200/30 to-pink-200/30 rounded-full blur-2xl animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-teal-200/30 to-blue-200/30 rounded-full blur-2xl animate-pulse delay-1000"></div>

      <div className="relative z-10 p-6">
        {/* Header with animated icon */}
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gradient-to-r from-purple-200 to-teal-200">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-teal-500 rounded-full blur-md opacity-30 animate-pulse"></div>
            <div className="relative bg-gradient-to-r from-purple-600 to-teal-600 p-2 rounded-full">
              <ShoppingBag className="h-6 w-6 text-white animate-bounce" />
            </div>
          </div>
          <div>
            <h3 className="font-bold text-xl bg-gradient-to-r from-purple-600 to-teal-600 bg-clip-text text-transparent m-0">
              Order Summary
            </h3>
            <p className="text-sm text-gray-500 m-0">{cart.length} items in your cart</p>
          </div>
        </div>

        {/* Cart items with enhanced styling */}
        <div className="flex-1 overflow-auto mb-6 max-h-80">
          {cart.length === 0 ? (
            <div className="text-center py-12">
              <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-full p-6 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <ShoppingBag className="h-8 w-8 text-gray-400" />
              </div>
              <p className="text-gray-500 font-medium">Your cart is empty</p>
            </div>
          ) : (
            <div className="mt-5 space-y-5 overflow-x-hidden">
              {cart.map((item, index) => {
                const discountedPrice = item.discount ? item.price * (1 - item.discount / 100) : item.price
                const totalPrice = discountedPrice * item.quantity

                return (
                  <div
                    key={item.id}
                    className="group relative bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] border border-white/20"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {/* Discount badge */}
                    {item.discount > 0 && (
                      <div className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg animate-pulse">
                        <Tag className="h-3 w-3 inline mr-1" />
                        {item.discount}%
                      </div>
                    )}

                    <div className="flex gap-4">
                      {/* Enhanced product image */}
                      <div className="relative group/image">
                        <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl overflow-hidden shadow-inner">
                          <img
                             src={getDriveThumbnail(item.image)}
                            alt={item.name}
                            className="object-cover w-full h-full group-hover/image:scale-110 transition-transform duration-300"
                          />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl opacity-0 group-hover/image:opacity-100 transition-opacity duration-300"></div>
                      </div>

                      {/* Product details */}
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800 group-hover:text-purple-600 transition-colors duration-300">
                          {item.name}
                        </h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-sm text-gray-500">Qty:</span>
                          <span className="bg-gradient-to-r from-purple-100 to-teal-100 px-2 py-1 rounded-full text-sm font-medium text-purple-700">
                            {item.quantity}
                          </span>
                        </div>
                      </div>

                      {/* Enhanced pricing */}
                      <div className="text-right">
                        {item.discount > 0 ? (
                          <div className="space-y-1">
                            <p className="font-bold text-teal-600 text-lg">${totalPrice.toFixed(2)}</p>
                            <p className="text-xs text-gray-400 line-through">
                              ${(item.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        ) : (
                          <p className="font-bold text-teal-600 text-lg">${totalPrice.toFixed(2)}</p>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Enhanced order totals */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
          <div className="space-y-4">
            {/* Subtotal */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Calculator className="h-4 w-4 text-gray-500" />
                <span className="text-gray-600">Subtotal</span>
              </div>
              <span className="font-semibold">${total.toFixed(2)}</span>
            </div>

            {/* Savings highlight */}
            {discountTotal > 0 && (
              <div className="flex justify-between items-center bg-gradient-to-r from-green-50 to-emerald-50 p-3 rounded-xl border border-green-200">
                <div className="flex items-center gap-2">
                  <Gift className="h-4 w-4 text-green-600 animate-bounce" />
                  <span className="text-green-700 font-medium">You saved</span>
                  <Sparkles className="h-3 w-3 text-yellow-500 animate-pulse" />
                </div>
                <span className="font-bold text-green-600">-${discountTotal.toFixed(2)}</span>
              </div>
            )}

            {/* Shipping */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Truck className="h-4 w-4 text-gray-500" />
                <span className="text-gray-600">Shipping</span>
              </div>
              <span className="font-semibold">${shipping.toFixed(2)}</span>
            </div>

            {/* Tax */}
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Tax</span>
              <span className="font-semibold">${tax.toFixed(2)}</span>
            </div>

            {/* Total with gradient border */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-teal-500 rounded-xl blur-sm opacity-30"></div>
              <div className="relative bg-white rounded-xl p-4 border-2 border-transparent bg-clip-padding">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-teal-600 bg-clip-text text-transparent">
                    Total
                  </span>
                  <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-teal-600 bg-clip-text text-transparent">
                    ${finalTotal.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
