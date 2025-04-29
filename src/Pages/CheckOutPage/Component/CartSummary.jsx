import { ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

export default function CartSummary({ cart, total }) {
  const shipping = 5.99;
  const tax = total * 0.07;
  const finalTotal = total + shipping + tax;

  // Calculate total savings
  const originalTotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const discountTotal = originalTotal - total;

  return (
    <div className="flex flex-col h-full p-4">
      <div className="flex items-center gap-2 mb-4 pb-2 border-b">
        <ShoppingBag className="h-5 w-5 text-teal-600" />
        <h3 className="font-semibold text-lg">Order Summary</h3>
      </div>

      {/* Cart items */}
      <div className="flex-1 overflow-auto mb-4">
        {cart.length === 0 ? (
          <div className="text-center py-6 text-gray-500">Your cart is empty</div>
        ) : (
          <div className="space-y-3">
            {cart.map((item) => {
              const discountedPrice = item.discount
                ? item.price * (1 - item.discount / 100)
                : item.price;
              const totalPrice = discountedPrice * item.quantity;

              return (
                <div key={item.id} className="flex gap-3 py-2 border-b">
                  <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                    <img
                      src={item.image || "/placeholder.svg?height=64&width=64"}
                      alt={item.name}
                      width={64}
                      height={64}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{item.name}</h4>
                    <div className="text-sm text-gray-500 mt-1">Qty: {item.quantity}</div>
                  </div>
                  <div className="text-right font-medium text-sm">
                    {item.discount > 0 ? (
                      <>
                        <p className="text-teal-600 m-0">
                          ${totalPrice.toFixed(2)}
                        </p>
                        <p className="text-xs text-gray-400 line-through m-0">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </>
                    ) : (
                      <p>${totalPrice.toFixed(2)}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Order totals */}
      <div className="border-t pt-3 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Subtotal</span>
          <span>${total.toFixed(2)}</span>
        </div>
        {discountTotal > 0 && (
          <div className="flex justify-between text-sm text-green-600">
            <span>You saved</span>
            <span>-${discountTotal.toFixed(2)}</span>
          </div>
        )}
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Shipping</span>
          <span>${shipping.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Tax</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-semibold text-base pt-2 border-t mt-2">
          <span>Total</span>
          <span className="text-teal-600">${finalTotal.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
