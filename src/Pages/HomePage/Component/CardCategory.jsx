import { useState, useEffect } from "react"
import { ChevronRight } from "lucide-react";
const CardCategory = ({ category, index }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      const rect = e.currentTarget?.getBoundingClientRect()
      if (rect) {
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        })
      }
    }

    if (isHovered) {
      document.addEventListener("mousemove", handleMouseMove)
    }

    return () => document.removeEventListener("mousemove", handleMouseMove)
  }, [isHovered])

  const colorSchemes = [
    {
      gradient: "from-emerald-500 to-teal-600",
      bg: "from-emerald-50 to-teal-50",
      shadow: "shadow-emerald-500/25",
      glow: "shadow-emerald-500/50",
    },
    {
      gradient: "from-blue-500 to-cyan-600",
      bg: "from-blue-50 to-cyan-50",
      shadow: "shadow-blue-500/25",
      glow: "shadow-blue-500/50",
    },
    {
      gradient: "from-purple-500 to-pink-600",
      bg: "from-purple-50 to-pink-50",
      shadow: "shadow-purple-500/25",
      glow: "shadow-purple-500/50",
    },
    {
      gradient: "from-orange-500 to-red-600",
      bg: "from-orange-50 to-red-50",
      shadow: "shadow-orange-500/25",
      glow: "shadow-orange-500/50",
    },
  ]

  const scheme = colorSchemes[index % colorSchemes.length]

  return (
    <div
      className={`group relative overflow-hidden rounded-3xl bg-gradient-to-br ${scheme.bg} p-8 transition-all duration-500 hover:scale-105 ${scheme.shadow} hover:${scheme.glow} hover:shadow-2xl cursor-pointer`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        animationDelay: `${index * 150}ms`,
      }}
    >
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0 animate-pulse"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, rgba(0,0,0,0.1) 1px, transparent 1px),
                           radial-gradient(circle at 80% 50%, rgba(0,0,0,0.1) 1px, transparent 1px)`,
            backgroundSize: "30px 30px",
          }}
        />
      </div>

      {/* Mouse Following Gradient */}
      {isHovered && (
        <div
          className="absolute inset-0 opacity-20 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle 200px at ${mousePosition.x}px ${mousePosition.y}px, 
              rgba(255,255,255,0.3) 0%, 
              transparent 70%)`,
          }}
        />
      )}

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          >
            <div className={`w-2 h-2 bg-gradient-to-r ${scheme.gradient} rounded-full blur-sm`} />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-between">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div
            className={`p-4 rounded-2xl bg-gradient-to-br ${scheme.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}
          >
            {category.icon && <category.icon className="h-8 w-8 text-white" />}
          </div>

          <div className="text-right">
            <div className="text-3xl font-bold text-gray-800 group-hover:scale-110 transition-transform duration-300">
              {category.items || "0"}
            </div>
            <div className="text-sm text-gray-600">Products</div>
          </div>
        </div>

        {/* Category Info */}
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-gray-900 group-hover:text-gray-700 transition-colors duration-300">
            {category.name}
          </h3>

          <p className="text-gray-600 leading-relaxed line-clamp-3">{category.description}</p>

          {/* Action Button */}
          <div className="flex items-center justify-between pt-4">
            <button
              className={`group/btn flex items-center gap-2 px-6 py-3 bg-gradient-to-r ${scheme.gradient} text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105`}
            >
              <span>Explore</span>
              <ChevronRight className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />

            </button>

            <div className="text-sm text-gray-500">From ${category.startingPrice}</div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/20 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300" />
      <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-white/10 rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300" />

      {/* Ripple Effect */}
      <div className="absolute inset-0 rounded-3xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
      </div>
    </div>
  )
}

export default CardCategory
