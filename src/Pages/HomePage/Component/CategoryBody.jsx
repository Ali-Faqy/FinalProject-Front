import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Leaf, ChevronRight } from "lucide-react";
import CardCategory from "./CardCategory.jsx";
import { getAllCategories } from "../Code/Category_data.js";

const CategoryBody = () => {
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [categories, setCategories] = useState([]);

  // Fetch categories from API
  const fetchCategories = async () => {
    const data = await getAllCategories();
    if (data) {
      const mappedCategories = data.map((category) => ({
        id: category.category_id,
        name: category.category_name,
        description: category.description,
        items: category.product_count,
        startingPrice: category.lowest_selling_price ?? 0,
      }));
      setCategories(mappedCategories);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Mouse move effect for dynamic background
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section id="categories" className="relative py-24 overflow-hidden">
      {/* Dynamic Background */}
      <div
        className="absolute inset-0 opacity-30 transition-all duration-1000"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, 
            rgba(16, 185, 129, 0.2) 0%, 
            rgba(20, 184, 166, 0.15) 30%, 
            rgba(6, 182, 212, 0.1) 60%, 
            transparent 100%)`,
        }}
      />

      {/* Animated Mesh Background */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0 animate-pulse"
          style={{
            backgroundImage: `linear-gradient(45deg, rgba(16, 185, 129, 0.1) 25%, transparent 25%),
                           linear-gradient(-45deg, rgba(20, 184, 166, 0.1) 25%, transparent 25%),
                           linear-gradient(45deg, transparent 75%, rgba(6, 182, 212, 0.1) 75%),
                           linear-gradient(-45deg, transparent 75%, rgba(139, 92, 246, 0.1) 75%)`,
            backgroundSize: "40px 40px",
            backgroundPosition: "0 0, 0 20px, 20px -20px, -20px 0px",
          }}
        />
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          >
            <div className="w-3 h-3 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full opacity-40 blur-sm animate-pulse" />
          </div>
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 backdrop-blur-sm rounded-full border border-emerald-500/30 mb-6 animate-bounce-subtle">
            <Leaf className="h-4 w-4 text-emerald-600 animate-spin-slow" />
            <span className="text-sm font-medium text-emerald-700">Product Categories</span>
          </div>

          <h2 className="text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-500 bg-clip-text text-transparent animate-gradient bg-300%">
              Shop by Category
            </span>
          </h2>

          <div className="h-1 w-24 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mx-auto mb-6 animate-expand-width" />

          <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in-up animation-delay-300">
            Find the perfect tools for your specific agricultural needs. Each category is carefully curated with premium
            quality equipment designed for modern farming challenges.
          </p>
        </div>

        {/* Categories Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {[
            { label: "Total Products", value: categories.reduce((sum, cat) => sum + (cat.items || 0), 0), icon: "📦" },
            { label: "Categories", value: categories.length, icon: "🏷️" },
            { label: "Brands", value: "50+", icon: "🏭" },
            { label: "Countries", value: "25+", icon: "🌍" },
          ].map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 bg-white/50 backdrop-blur-sm rounded-2xl border border-white/30 hover:bg-white/70 transition-all duration-300 hover:scale-105 animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 gap-8">
          {categories.map((category, index) => (
            <div
              key={category.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 150}ms` }}
              onMouseEnter={() => setHoveredCategory(category.id)}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              <CardCategory category={category} index={index} />
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-3xl p-12 border border-emerald-200">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/categories"
                className="group px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-full hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 transform hover:scale-105 shadow-xl relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Browse All Category
                  <ChevronRight className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </Link>

              <Link
                to="/products"
                className="group px-8 py-4 bg-white/50 backdrop-blur-sm border-2 border-emerald-500/30 text-emerald-700 rounded-full font-semibold hover:bg-emerald-50 hover:border-emerald-500 transition-all duration-300 hover:scale-105"
              >
                <span className="flex items-center gap-2">
                  Browse All Products
                  <ChevronRight className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryBody;