import { useEffect, useState } from "react"
import { ChevronLeft, ChevronRight, ShoppingBag, Zap } from "lucide-react"
import Navication from "../../HomePage/Component/Navication.jsx"
import Card from "./Card.jsx"
import getAllCategoriesWithProducts from "/src/Pages/CategoriesPage/code/data.js"

export default function CategoriesPage() {
  const [apiData, setApiData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllCategoriesWithProducts()
      setApiData(data)
    }
    fetchData()
  }, [])

  const categories = apiData.map((category) => ({
    categoryId: category.category_id,
    name: category.category_name,
    tools: category.products.map((product) => ({
      id: product.product_id,
      name: product.product_name,
      price: product.selling_price,
      tag: product.company_name,
      description: product.description,
      rating: product.product_rating,
      availability: product.availability_status,
      image: product.attachments,
    })),
  }))

  const scrollLeft = (categoryId) => {
    const container = document.getElementById(`scroll-container-${categoryId}`)
    if (container) {
      container.scrollBy({ left: -400, behavior: "smooth" })
    }
  }

  const scrollRight = (categoryId) => {
    const container = document.getElementById(`scroll-container-${categoryId}`)
    if (container) {
      container.scrollBy({ left: 400, behavior: "smooth" })
    }
  }

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-20 w-72 h-72 bg-green-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
          <div className="absolute top-40 right-20 w-72 h-72 bg-emerald-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-40 w-72 h-72 bg-teal-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>
      </div>

      <Navication open={{is: "category"}}/>

      {/* Hero Section */}
      <div className="relative pt-20 pb-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 text-sm font-medium mb-6 animate-fade-in">
            <Zap className="w-4 h-4" />
            Discover Amazing Products
          </div>
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent mb-6 animate-slide-up">
            Creative
            <span className="block">Collections</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto animate-fade-in-delay">
            Explore our curated selection of premium products across multiple categories
          </p>
        </div>
      </div>

      {/* Categories */}
      <div className="max-w-7xl mx-auto px-6 pb-20">
        {categories.map((category) => (
          <div key={category.categoryId} className="mb-20">
            {/* Category Header */}
            <div className="relative mb-12">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-2 h-12 bg-gradient-to-b from-green-500 to-emerald-500 rounded-full"></div>
                  <h2 className="text-4xl md:text-5xl font-bold text-gray-800 tracking-tight">{category.name}</h2>
                </div>

                {/* Scroll Controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => scrollLeft(category.categoryId)}
                    className="w-10 h-10 rounded-full bg-white shadow-lg hover:shadow-xl border border-gray-100 hover:border-green-200 flex items-center justify-center transition-all duration-300 hover:scale-110"
                  >
                    <ChevronLeft className="w-5 h-5 text-green-600" />
                  </button>
                  <button
                    onClick={() => scrollRight(category.categoryId)}
                    className="w-10 h-10 rounded-full bg-white shadow-lg hover:shadow-xl border border-gray-100 hover:border-green-200 flex items-center justify-center transition-all duration-300 hover:scale-110"
                  >
                    <ChevronRight className="w-5 h-5 text-green-600" />
                  </button>
                </div>
              </div>
              <div className="h-px bg-gradient-to-r from-green-200 via-emerald-200 to-transparent"></div>
            </div>

            {/* Products Horizontal Scroll - 2 Rows */}
            <div className="relative">
              <div
                id={`scroll-container-${category.categoryId}`}
                className="overflow-x-auto scrollbar-hide pb-4"
                style={{
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                }}
              >
                <div className="grid grid-rows-2 grid-flow-col gap-6 w-max">
                  {category.tools.map((tool, toolIndex) => (
                    <div
                      key={tool.id}
                      className="w-80 animate-fade-in-up"
                      style={{
                        animationDelay: `${toolIndex * 50}ms`,
                      }}
                    >
                      <Card product={tool} index={toolIndex} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Gradient Fade Effects */}
              <div className="absolute top-0 left-0 w-8 h-full bg-gradient-to-r from-green-50 to-transparent pointer-events-none z-10"></div>
              <div className="absolute top-0 right-0 w-8 h-full bg-gradient-to-l from-green-50 to-transparent pointer-events-none z-10"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <button className="w-14 h-14 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group hover:scale-110">
          <ShoppingBag className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
        </button>
      </div>
    </div>
  )
}
