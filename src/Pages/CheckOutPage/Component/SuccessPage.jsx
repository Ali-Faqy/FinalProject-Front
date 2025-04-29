import {Link} from "react-router-dom"
import { CheckCircle } from "lucide-react"

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
        </div>
        <h1 className="text-2xl font-bold mb-2 text-black m-0">Payment Successful!</h1>
        <p className="text-gray-600 mb-6">Thank you for your purchase. Your payment has been processed successfully.</p>
        <Link to="/checkout">
        <button className="w-[50%] bg-black text-white rounded-xl">Go Home</button>
        </Link>
      </div>
    </div>
  )
}
