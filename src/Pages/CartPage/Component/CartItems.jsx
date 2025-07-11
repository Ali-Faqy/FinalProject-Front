import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Minus, Plus, Trash2, ShoppingCart, CreditCard, Shield, Tag, Zap } from "lucide-react"
import { Separtor } from "../../UI/Separtor.jsx"
import image10 from "../../../assets/image10.png"
import EmptyCart from "./EmptyCart.jsx"
import { getAllProductInCart, RemoveItemFromCart } from "../Data/CartData.js"

function CartItems() {
  const userId = localStorage.getItem("userId")
  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [removingItems, setRemovingItems] = useState(new Set())

  const fetchProducts = async () => {
    setIsLoading(true)
    const data = await getAllProductInCart(userId)
    if (data) {
      const updatedItems = data.map((item) => ({
        id: item.id,
        name: item.name,
        brand: item.brand,
        price: item.price,
        image: item.image,
        quantity: item.quantity,
        quantityAvailable: item.quantityAvailable,
        discount: item.discount,
      }))
      setItems(updatedItems)  

      console.log("Updated Items:", updatedItems)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const increaseQuantity = (id) => {
    setItems((prevItems) => {
      return prevItems.map((item) => {
        if (item.id === id) {
          if (item.quantity < item.quantityAvailable) {
            return { ...item, quantity: item.quantity + 1 }
          } else {
            // Create a more elegant alert
            const alertDiv = document.createElement("div")
            alertDiv.className =
              "fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-slide-in"
            alertDiv.textContent = `Maximum quantity available: ${item.quantityAvailable}`
            document.body.appendChild(alertDiv)
            setTimeout(() => {
              alertDiv.remove()
            }, 3000)
          }
        }
        return item
      })
    })
  }
const getDriveThumbnail = (url) => {
    if (!url || url.trim() === "") return image10
    const match = url.match(/\/d\/([^/]+)\//)
    return match ? `https://drive.google.com/thumbnail?id=${match[1]}` : image10
  }
  const decreaseQuantity = (id) => {
    setItems((prevItems) =>
      prevItems.map((item) => (item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item)),
    )
  }

  const removeItem = async (id) => {
    setRemovingItems((prev) => new Set(prev).add(id))

    // Add a small delay for animation
    setTimeout(async () => {
      setItems((prevItems) => prevItems.filter((item) => item.id !== id))
      await RemoveItemFromCart(userId, id)
      setRemovingItems((prev) => {
        const newSet = new Set(prev)
        newSet.delete(id)
        return newSet
      })
    }, 300)
  }

  const subtotal = items.reduce((acc, item) => {
    const discountedPrice = item.discount > 0 ? item.price * (1 - item.discount / 100) : item.price
    return acc + discountedPrice * item.quantity
  }, 0)

  const shippingEstimate = subtotal > 100 ? 0 : 20
  const taxEstimate = subtotal * 0.1
  const total = subtotal + shippingEstimate + taxEstimate

  const print = () => {
    console.log(items)
  }


  return (
    <div className="flex flex-col lg:flex-row gap-8 w-full max-w-7xl mx-auto">
      {/* Cart Items Section */}
      <div className="flex-1 bg-white/80 backdrop-blur-sm rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-teal-600 to-blue-600 p-6">
          <div className="flex items-center gap-3">
            <ShoppingCart className="h-6 w-6 text-white" />
            <h2 className="text-2xl font-bold text-white">Cart Items ({items.length})</h2>
          </div>
        </div>

        <div className="p-6 max-h-[600px] overflow-y-auto custom-scrollbar">
          {items.length === 0 ? (
            <EmptyCart />
          ) : (
            <div className="space-y-6">
              {items.map((item, index) => (
                <div
                  key={item.id}
                  className={`group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] ${
                    removingItems.has(item.id) ? "animate-slide-out opacity-0" : "animate-slide-in"
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Discount badge */}
                  {item.discount > 0 && (
                    <div className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg animate-pulse">
                      -{item.discount}%
                    </div>
                  )}

                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Product Image */}
                    <div className="relative group/image">
                      <div className="w-32 h-32 rounded-2xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                        <img
                          src={getDriveThumbnail(item.image)}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover/image:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl opacity-0 group-hover/image:opacity-100 transition-opacity duration-300"></div>
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 space-y-3">
                      <div className="flex flex-col gap-1">
                        <h3 className="text-xl font-bold text-gray-800 group-hover:text-teal-600 transition-colors duration-300">
                          {item.name}
                        </h3>
                        <span className="text-gray-500 font-medium">{item.brand}</span>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-4">
                        <span className="text-sm font-medium text-gray-600">Quantity:</span>
                        <div className="flex items-center bg-gray-100 rounded-xl overflow-hidden shadow-inner">
                          <button
                            onClick={() => decreaseQuantity(item.id)}
                            className="h-10 w-10 flex items-center justify-center hover:bg-teal-100 hover:text-teal-600 transition-colors duration-200"
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="w-12 text-center font-bold text-gray-800">{item.quantity}</span>
                          <button
                            onClick={() => increaseQuantity(item.id)}
                            className="h-10 w-10 flex items-center justify-center hover:bg-teal-100 hover:text-teal-600 transition-colors duration-200"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                        <span className="text-xs text-gray-400">{item.quantityAvailable} available</span>
                      </div>
                    </div>

                    {/* Price and Actions */}
                    <div className="flex flex-col items-end justify-between gap-4">
                      <div className="text-right">
                        {item.discount > 0 ? (
                          <div className="space-y-1">
                            <p className="text-2xl font-bold text-teal-600">
                              ${(item.price * (1 - item.discount / 100) * item.quantity).toFixed(2)}
                            </p>
                            <p className="text-sm text-gray-400 line-through">
                              ${(item.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        ) : (
                          <p className="text-2xl font-bold text-teal-600">${(item.price * item.quantity).toFixed(2)}</p>
                        )}
                      </div>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="group/remove flex items-center gap-2 px-4 py-2 text-red-500 hover:bg-red-50 rounded-xl transition-all duration-200 hover:scale-105"
                      >
                        <Trash2 className="h-4 w-4 group-hover/remove:animate-bounce" />
                        <span className="text-sm font-medium">Remove</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Order Summary Section */}
      {items.length > 0 && (
        <div className="w-full lg:w-96 bg-white/80 backdrop-blur-sm rounded-3xl border border-white/20 shadow-2xl overflow-hidden h-fit sticky top-4">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6">
            <div className="flex items-center gap-3">
              <CreditCard className="h-6 w-6 text-white" />
              <h2 className="text-2xl font-bold text-white">Order Summary</h2>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Summary Items */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 flex items-center gap-2">
                  <Tag className="h-4 w-4" />
                  Subtotal
                </span>
                <span className="font-semibold">${subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-600">Shipping estimate</span>
                <span className="font-semibold">
                  {shippingEstimate === 0 ? "FREE" : `$${shippingEstimate.toFixed(2)}`}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-600">Tax estimate</span>
                <span className="font-semibold">${taxEstimate.toFixed(2)}</span>
              </div>

              <Separtor className="my-4" />

              <div className="flex justify-between items-center text-xl font-bold">
                <span>Total</span>
                <span className="text-teal-600">${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Free shipping progress */}
            {subtotal < 100 && (
              <div className="bg-gradient-to-r from-teal-50 to-blue-50 p-4 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="h-4 w-4 text-teal-600" />
                  <span className="text-sm font-medium text-teal-700">
                    Add ${(100 - subtotal).toFixed(2)} for free shipping!
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-teal-500 to-blue-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min((subtotal / 100) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
            )}

            {/* Checkout Button */}
            <Link to={`/checkout/${userId}`} state={{ cart: items, total }} className="block">
              <button
                className="w-full bg-gradient-to-r from-teal-600 to-blue-600 text-white py-4 px-6 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group relative overflow-hidden"
                onClick={print}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-teal-700 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center justify-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  <span>Proceed to Checkout</span>
                </div>
                <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shimmer"></div>
              </button>
            </Link>

            {/* Security Badge */}
            <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
              <Shield className="h-4 w-4 text-green-500" />
              <span>Secure checkout powered by Stripe</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CartItems
