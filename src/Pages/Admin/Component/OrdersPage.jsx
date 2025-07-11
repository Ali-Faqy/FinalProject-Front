import {Link} from "react-router-dom"
import { ShoppingCart, Users } from "lucide-react"
import Layout from "../UI/Layout.jsx";
import PageContainer from "../UI/PageContainer.jsx";
export default function OrdersPage() {
  return (
    <Layout adminName={localStorage.getItem("userName") || "Admin"}>
    <PageContainer title="" description="">
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 m-0">Order Management System</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto m-0">
            Manage your customer and purchase orders in one place
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Link to="/admin/orders/customers" className="block">
            <div className="bg-white rounded-xl border border-gray-200 p-8 h-full hover:shadow-lg transition-all duration-300 hover:border-green-500">
              <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6 mx-auto">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-center mb-4">Customer Orders</h2>
              <p className="text-gray-600 text-center mb-6">View and manage orders placed by your customers</p>
              <div className="text-center">
                <button className="bg-green-500 hover:bg-green-600 w-[50%] h-[40px] rounded-xl">View Customer Orders</button>
              </div>
            </div>
          </Link>

          <Link to="/admin/orders/purchase" className="block">
            <div className="bg-white rounded-xl border border-gray-200 p-8 h-full hover:shadow-lg transition-all duration-300 hover:border-green-500">
              <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6 mx-auto">
                <ShoppingCart className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-center mb-4">Purchase Orders</h2>
              <p className="text-gray-600 text-center mb-6">Manage orders you've placed with your suppliers</p>
              <div className="text-center">
                <button className="bg-green-500 hover:bg-green-600 w-[50%] h-[40px] rounded-xl">View Purchase Orders</button>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
    </PageContainer>
    </Layout>
  )
}
