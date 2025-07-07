import { Link } from "react-router-dom";
import Navication from "../../HomePage/Component/Navication.jsx";
import NoImage from "/src/assets/NoImage.jpg";
import { useState, useEffect, useRef } from "react";
import {
  ChevronRight,
  Search,
  Grid3X3,
  List,
  Star,
  Heart,
  ChevronLeft,
  X,
  SlidersHorizontal,
  ArrowUpDown,
  Filter,
  Sparkles,
  Zap,
  ShoppingCart,
  Eye,
  TrendingUp,
  Award,
  Package,
  Rocket,
  Leaf,
  Sun,
  Droplets,
  MagnetIcon as Magic,
  Flame,
  Crown,
  Diamond,
  Target,
  Gift,
} from "lucide-react";
import { Slider } from "../../UI/Slider.jsx";
import { Separtor } from "../../UI/Separtor.jsx";
import { Checkbox } from "../../UI/Checkbox.jsx";
import { Switch } from "../../UI/Switch.jsx";
import {
  getAllProducts,
  getAllCategories,
  getAllBrands,
  InsertProductIntoCart,
  InsertProductIntoWishlist,
} from "../Code/Product_data.js";

function ProductsPage() {
  const [viewMode, setViewMode] = useState("grid");
  const [priceRange, setPriceRange] = useState([0, 1000]); // Default range, updated after fetch
  const [maxPrice, setMaxPrice] = useState(1000); // Store max price dynamically
  const [showFilters, setShowFilters] = useState(false);
  const [sortOption, setSortOption] = useState("featured");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [onSaleOnly, setOnSaleOnly] = useState(false);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const userId = localStorage.getItem("userId");

  // Creative enhancement states
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchFocused, setSearchFocused] = useState(false);
  const [filterAnimating, setFilterAnimating] = useState(false);
  const sectionRef = useRef(null);

  const getDriveThumbnail = (url) => {
    const match = url.match(/\/d\/([^/]+)\//);
    return match ? `https://drive.google.com/thumbnail?id=${match[1]}` : NoImage;
  };

  const fetchProducts = async () => {
    setLoading(true);
    const data = await getAllProducts();
    if (data) {
      const categoriesData = await getAllCategories();
      const brandsData = await getAllBrands();

      const categoryMap = {};
      const brandMap = {};

      if (categoriesData) {
        categoriesData.forEach((cat) => {
          categoryMap[cat.category_id] = cat.category_name;
        });
      }

      if (brandsData) {
        brandsData.forEach((brand) => {
          brandMap[brand.company_id] = brand.company_name;
        });
      }

      const mappedProducts = data.map((product) => ({
        id: product.product_id,
        name: product.product_name,
        price: product.selling_price,
        image: product.attachments[0],
        inStock: product.availability_status,
        rating: product.product_rating,
        reviews: product.number_of_users_rating_product,
        description: product.how_use_it,
        brand: brandMap[product.company_id] || `Brand ${product.company_id}`,
        brandName: product.company_name,
        categoryId: product.category_id,
        category: categoryMap[product.category_id] || `Category ${product.category_id}`,
        discount: product.offer_percentage,
        new: new Date(product.added_at) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      }));

      const calculatedMaxPrice = Math.max(...mappedProducts.map((p) => p.price), 1000); // Ensure at least 1000
      setProducts(mappedProducts);
      setMaxPrice(calculatedMaxPrice);
      setPriceRange([0, calculatedMaxPrice]);
    }
    setLoading(false);
  };

  const fetchCategories = async () => {
    const data = await getAllCategories();
    if (data) {
      const mappedCategories = data.map((category) => ({
        id: category.category_id,
        name: category.category_name,
      }));
      setCategories(mappedCategories);
    }
  };

  const fetchBrands = async () => {
    const data = await getAllBrands();
    if (data) {
      const mappedBrands = data.map((brand) => ({
        name: brand.company_name,
      }));
      setBrands(mappedBrands);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchProducts();
      fetchCategories();
      fetchBrands();
    }
  }, [userId]);

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      !searchQuery ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    const matchesBrand = !selectedBrand || product.brand === selectedBrand;
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    const matchesInStock = !inStockOnly || product.inStock;
    const matchesOnSale = !onSaleOnly || product.discount > 0;

    return matchesSearch && matchesCategory && matchesBrand && matchesPrice && matchesInStock && matchesOnSale;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOption) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      case "newest":
        return b.id - a.id;
      default:
        return b.featured ? 1 : -1;
    }
  });

  const productsPerPage = 9;
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);
  const paginatedProducts = sortedProducts.slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage);

  const floatingElements = [
    { icon: Leaf, color: "text-green-400", size: "h-6 w-6", position: "top-20 left-10" },
    { icon: Sun, color: "text-yellow-400", size: "h-8 w-8", position: "top-32 right-20" },
    { icon: Droplets, color: "text-blue-400", size: "h-5 w-5", position: "bottom-40 left-16" },
    { icon: Sparkles, color: "text-purple-400", size: "h-7 w-7", position: "bottom-20 right-32" },
    { icon: Magic, color: "text-pink-400", size: "h-6 w-6", position: "top-1/2 left-8" },
    { icon: Flame, color: "text-orange-400", size: "h-5 w-5", position: "top-1/3 right-12" },
  ];

  const handleAddToCart = (product) => {
    try {
      InsertProductIntoCart(userId, product.id, 1, product.name);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const handleAddToWishlist = (product) => {
    try {
      InsertProductIntoWishlist(userId, product.id, product.name);
    } catch (error) {
      console.error("Error adding to wishlist:", error);
    }
  };

  if (!userId) {
    return <Link to="/signIn" />;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        <div className="text-center space-y-8 z-10">
          <div className="relative">
            <div className="h-24 w-24 mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-spin"></div>
              <div className="absolute inset-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full animate-spin reverse"></div>
              <div className="absolute inset-4 bg-gradient-to-r from-green-500 to-yellow-500 rounded-full animate-pulse"></div>
            </div>
          </div>
          <div className="space-y-4">
            <h2 className="text-4xl font-black bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
              Loading Amazing Products
            </h2>
            <div className="flex items-center justify-center space-x-2">
              <div className="h-2 w-2 bg-purple-400 rounded-full animate-bounce"></div>
              <div className="h-2 w-2 bg-pink-400 rounded-full animate-bounce delay-100"></div>
              <div className="h-2 w-2 bg-blue-400 rounded-full animate-bounce delay-200"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={sectionRef}
      className="min-h-screen w-full relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
    >
      <Navication open={{is: "products"}}/>
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {floatingElements.map((element, index) => (
          <div
            key={index}
            className={`absolute ${element.position} opacity-20 animate-float`}
            style={{
              animationDelay: `${index * 0.5}s`,
              animationDuration: `${4 + index}s`,
            }}
          >
            <element.icon className={`${element.size} ${element.color}`} />
          </div>
        ))}
      </div>
      <div className="relative z-10">
        <div className="relative z-20">
          <div className="text-center space-y-6">
            <h2 className="text-6xl lg:text-7xl font-black bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent animate-pulse">
              All Products
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              Browse our complete collection of high-quality agricultural tools and equipment designed for the future of
              farming
            </p>
            <div className="flex flex-wrap justify-center gap-6 mt-8">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl px-6 py-3 border border-white/20 hover:bg-white/20 transition-all duration-300 group">
                <div className="flex items-center space-x-2">
                  <Package className="h-6 w-6 text-cyan-400 group-hover:animate-bounce" />
                  <span className="font-bold text-white">{products.length}+ Products</span>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl px-6 py-3 border border-white/20 hover:bg-white/20 transition-all duration-300 group">
                <div className="flex items-center space-x-2">
                  <Award className="h-6 w-6 text-yellow-400 group-hover:animate-spin" />
                  <span className="font-bold text-white">Premium Quality</span>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl px-6 py-3 border border-white/20 hover:bg-white/20 transition-all duration-300 group">
                <div className="flex items-center space-x-2">
                  <Rocket className="h-6 w-6 text-purple-400 group-hover:animate-pulse" />
                  <span className="font-bold text-white">Fast Delivery</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative z-10 container px-4 md:px-6 mx-auto py-12">
        <div className="bg-white/5 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl border border-white/10 mb-8 hover:bg-white/10 transition-all duration-500">
          <div className="flex flex-col lg:flex-row gap-6 items-center">
            <div className="relative flex-1 max-w-md group">
              <Search
                className={`absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 transition-all duration-300 ${
                  searchFocused ? "text-purple-400 animate-pulse" : "text-gray-400"
                }`}
              />
              <input
                type="text"
                placeholder="Search magical products..."
                className="pl-12 w-full h-12 rounded-2xl border-2 border-white/20 bg-white/10 backdrop-blur-sm px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
              />
              {searchFocused && (
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 -z-10 blur animate-pulse"></div>
              )}
            </div>
            <div className="flex bg-white/10 backdrop-blur-sm rounded-2xl p-2 border border-white/20">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-3 rounded-xl transition-all duration-300 transform hover:scale-110 ${
                  viewMode === "grid"
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                }`}
              >
                <Grid3X3 className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-3 rounded-xl transition-all duration-300 transform hover:scale-110 ${
                  viewMode === "list"
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                }`}
              >
                <List className="h-5 w-5" />
              </button>
            </div>
            <select
              className="px-4 py-3 rounded-2xl border-2 border-white/20 bg-white/10 backdrop-blur-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="featured" className="bg-gray-800">
                ✨ Featured
              </option>
              <option value="newest" className="bg-gray-800">
                🆕 Newest
              </option>
              <option value="price-low" className="bg-gray-800">
                💰 Price: Low to High
              </option>
              <option value="price-high" className="bg-gray-800">
                💎 Price: High to Low
              </option>
              <option value="rating" className="bg-gray-800">
                ⭐ Highest Rated
              </option>
            </select>
            <button
              onClick={() => {
                setShowFilters(!showFilters);
                setFilterAnimating(true);
                setTimeout(() => setFilterAnimating(false), 300);
              }}
              className="lg:hidden bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-2xl flex items-center gap-2 hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <Filter className={`h-5 w-5 ${filterAnimating ? "animate-spin" : ""}`} />
              Filters
            </button>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between mb-8 gap-4">
          <div className="text-white/80">
            Showing <span className="font-bold text-purple-400 text-lg">{paginatedProducts.length}</span> of{" "}
            <span className="font-bold text-pink-400 text-lg">{filteredProducts.length}</span> magical products
          </div>
          <div className="flex flex-wrap gap-2">
            {selectedCategory && (
              <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm text-purple-300 border border-purple-500/30 flex items-center gap-2 pl-3 pr-2 rounded-full text-sm py-2 animate-fade-in">
                <Crown className="h-3 w-3" />
                Category: {selectedCategory}
                <button
                  className="h-5 w-5 p-0 hover:bg-purple-500/30 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                  onClick={() => setSelectedCategory(null)}
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            )}
            {selectedBrand && (
              <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-sm text-blue-300 border border-blue-500/30 flex items-center gap-2 pl-3 pr-2 rounded-full text-sm py-2 animate-fade-in">
                <Diamond className="h-3 w-3" />
                Brand: {selectedBrand}
                <button
                  className="h-5 w-5 p-0 hover:bg-blue-500/30 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                  onClick={() => setSelectedBrand(null)}
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            )}
            {(priceRange[0] > 0 || priceRange[1] < maxPrice) && (
              <div className="bg-gradient-to-r from-green-500/20 to-yellow-500/20 backdrop-blur-sm text-green-300 border border-green-500/30 flex items-center gap-2 pl-3 pr-2 rounded-full text-sm py-2 animate-fade-in">
                <Target className="h-3 w-3" />
                Price: ${priceRange[0]} - ${priceRange[1]}
                <button
                  className="h-5 w-5 p-0 hover:bg-green-500/30 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                  onClick={() => setPriceRange([0, maxPrice])}
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            )}
            {(selectedCategory || selectedBrand || priceRange[0] > 0 || priceRange[1] < maxPrice) && (
              <button
                className="bg-gradient-to-r from-red-500/20 to-orange-500/20 backdrop-blur-sm text-red-300 border border-red-500/30 hover:bg-red-500/30 px-3 py-2 rounded-full text-sm transition-all duration-300 hover:scale-105"
                onClick={() => {
                  setSelectedCategory(null);
                  setSelectedBrand(null);
                  setPriceRange([0, maxPrice]);
                }}
              >
                Clear All ✨
              </button>
            )}
          </div>
        </div>
        <div className="w-full flex flex-col md:flex-row gap-8">
          <div className={`${showFilters ? "block" : "hidden"} md:block w-full md:w-[320px] shrink-0`}>
            <div className="sticky top-24 bg-white/5 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/10 p-8 hover:bg-white/10 transition-all duration-500">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <SlidersHorizontal className="h-6 w-6 text-purple-400" />
                  Filters
                </h2>
                <button
                  className="bg-white/10 hover:bg-white/20 text-white px-3 py-2 rounded-xl text-sm transition-all duration-300 hover:scale-105"
                  onClick={() => {
                    setPriceRange([0, maxPrice]);
                    setSelectedCategory(null);
                    setSelectedBrand(null);
                  }}
                >
                  Reset All
                </button>
              </div>
              <div className="space-y-8">
                <div className="space-y-4">
                  <h3 className="font-semibold text-white flex items-center gap-2">
                    <Gift className="h-4 w-4 text-green-400" />
                    Price Range
                  </h3>
                  <div className="space-y-4">
                    <Slider
                      defaultValue={[0, maxPrice]}
                      max={maxPrice}
                      step={10}
                      value={priceRange}
                      onValueChange={setPriceRange}
                      className="py-4"
                    />
                    <div className="flex items-center justify-between gap-4">
                      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-2 text-white text-center">
                        ${priceRange[0]}
                      </div>
                      <div className="text-white/50">to</div>
                      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-2 text-white text-center">
                        ${priceRange[1]}
                      </div>
                    </div>
                  </div>
                </div>
                <Separtor className="border-white/20" />
                <div className="space-y-4">
                  <h3 className="font-semibold text-white flex items-center gap-2">
                    <Crown className="h-4 w-4 text-purple-400" />
                    Categories
                  </h3>
                  <div className="space-y-3">
                    {categories.map((category, index) => (
                      <div key={index} className="flex items-center space-x-3 group">
                        <Checkbox
                          id={`category-${index}`}
                          checked={selectedCategory === category.name}
                          onCheckedChange={(checked) => {
                            setSelectedCategory(checked ? category.name : null);
                          }}
                          className="border-white/30 data-[state=checked]:bg-purple-500 data-[state=checked]:border-purple-500"
                        />
                        <label
                          htmlFor={`category-${index}`}
                          className="text-white/80 hover:text-white cursor-pointer transition-colors duration-200 group-hover:text-purple-300"
                        >
                          {category.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                <Separtor className="border-white/20" />
                <div className="space-y-4">
                  <h3 className="font-semibold text-white flex items-center gap-2">
                    <Diamond className="h-4 w-4 text-blue-400" />
                    Brands
                  </h3>
                  <div className="space-y-3">
                    {brands.map((brand, index) => (
                      <div key={index} className="flex items-center space-x-3 group">
                        <Checkbox
                          id={`brand-${index}`}
                          checked={selectedBrand === brand.name}
                          onCheckedChange={(checked) => {
                            setSelectedBrand(checked ? brand.name : null);
                          }}
                          className="border-white/30 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                        />
                        <label
                          htmlFor={`brand-${index}`}
                          className="text-white/80 hover:text-white cursor-pointer transition-colors duration-200 group-hover:text-blue-300"
                        >
                          {brand.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                <Separtor className="border-white/20" />
                <div className="space-y-4">
                  <h3 className="font-semibold text-white flex items-center gap-2">
                    <Zap className="h-4 w-4 text-yellow-400" />
                    Availability
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <label htmlFor="in-stock" className="text-white/80 hover:text-white transition-colors">
                        In Stock Only
                      </label>
                      <Switch
                        id="in-stock"
                        checked={inStockOnly}
                        onCheckedChange={setInStockOnly}
                        className="data-[state=checked]:bg-green-500"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <label htmlFor="on-sale" className="text-white/80 hover:text-white transition-colors">
                        On Sale
                      </label>
                      <Switch
                        id="on-sale"
                        checked={onSaleOnly}
                        onCheckedChange={setOnSaleOnly}
                        className="data-[state=checked]:bg-red-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1">
            {paginatedProducts.length === 0 ? (
              <div className="bg-white/5 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/10 p-12 text-center">
                <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 mb-6 animate-pulse">
                  <Search className="h-10 w-10 text-purple-400" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">No Magical Products Found</h3>
                <p className="text-white/60 mb-8 text-lg">
                  We couldn't find any products matching your search criteria. Try adjusting your filters!
                </p>
                <button
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-2xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory(null);
                    setSelectedBrand(null);
                    setPriceRange([0, maxPrice]);
                  }}
                >
                  Clear All Filters ✨
                </button>
              </div>
            ) : viewMode === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {paginatedProducts.map((product, index) => (
                  <div
                    key={product.id}
                    className={`group relative bg-white/5 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/10 overflow-hidden hover:bg-white/10 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2`}
                    style={{ animationDelay: `${index * 100}ms` }}
                    onMouseEnter={() => setHoveredProduct(product.id)}
                    onMouseLeave={() => setHoveredProduct(null)}
                  >
                    <div className="relative h-64 overflow-hidden rounded-t-3xl">
                      <img
                        src={product.image && product.image.trim() !== "" ? getDriveThumbnail(product.image) : NoImage}
                        alt={product.name}
                        className="object-cover w-full h-full transition-all duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute top-4 left-4 space-y-2">
                        {product.discount > 0 && (
                          <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse shadow-lg">
                            -{product.discount}% OFF
                          </div>
                        )}
                        {product.new && (
                          <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                            ✨ NEW
                          </div>
                        )}
                      </div>
                      <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                        <button
                          onClick={() => handleAddToWishlist(product)}
                          className="h-10 w-10 rounded-full bg-white text-gray-600 hover:text-red-500 shadow-lg flex items-center justify-center transition-colors duration-200 cursor-pointer z-30"
                          style={{ pointerEvents: "auto" }}
                        >
                          <Heart className="h-5 w-5" />
                        </button>
                        <Link to={`/product/view/${product.id}`}>
                          <button
                            className="h-10 w-10 rounded-full bg-white text-gray-600 hover:text-blue-500 shadow-lg flex items-center justify-center transition-colors duration-200 cursor-pointer z-30"
                            style={{ pointerEvents: "auto" }}
                          >
                            <Eye className="h-5 w-5" />
                          </button>
                        </Link>
                      </div>
                      {!product.inStock && (
                        <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
                          <div className="bg-red-500 text-white px-4 py-2 rounded-2xl font-bold shadow-lg">
                            Out of Stock
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="p-6 space-y-4">
                      <div className="flex items-center gap-2">
                        {Array(5)
                          .fill(0)
                          .map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 transition-all duration-200 ${
                                i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-500"
                              }`}
                            />
                          ))}
                        <span className="text-sm text-white/60">({product.reviews})</span>
                      </div>
                      <Link to={`/product/view/${product.id}`}>
                        <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors duration-300 line-clamp-2">
                          {product.name}
                        </h3>
                      </Link>
                      <p className="text-white/60 text-sm line-clamp-2">{product.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                              $
                              {product.discount > 0
                                ? (product.price * (1 - product.discount / 100)).toFixed(2)
                                : product.price.toFixed(2)}
                            </span>
                            {product.discount > 0 && (
                              <span className="text-sm text-white/50 line-through">${product.price.toFixed(2)}</span>
                            )}
                          </div>
                          <span className="text-xs text-white/50">{product.brandName}</span>
                        </div>
                      </div>
                      <button
                        className={`w-full py-3 rounded-2xl font-semibold transition-all duration-200 z-20 relative ${
                          product.inStock
                            ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg cursor-pointer"
                            : "bg-gray-600 text-gray-400 cursor-not-allowed"
                        }`}
                        disabled={!product.inStock}
                        onClick={() => handleAddToCart(product)}
                        style={{ pointerEvents: product.inStock ? "auto" : "none" }}
                      >
                        <div className="flex items-center justify-center gap-2">
                          <ShoppingCart className="h-5 w-5" />
                          {product.inStock ? "Add to Cart" : "Out of Stock"}
                        </div>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                {paginatedProducts.map((product, index) => (
                  <div
                    key={product.id}
                    className={`bg-white/5 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/10 overflow-hidden hover:bg-white/10 transition-all duration-500`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex flex-col sm:flex-row">
                      <div className="relative w-full sm:w-[250px] h-[200px]">
                        <img
                          src={
                            product.image && product.image.trim() !== "" ? getDriveThumbnail(product.image) : NoImage
                          }
                          alt={product.name}
                          className="object-cover w-full h-full"
                        />
                        {!product.inStock && (
                          <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
                            <div className="bg-red-500 text-white px-3 py-1.5 rounded-md">Out of Stock</div>
                          </div>
                        )}
                        {product.discount > 0 && (
                          <div className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-pink-500 text-white px-2 py-1 rounded-md">
                            {product.discount}% OFF
                          </div>
                        )}
                        {product.new && (
                          <div className="absolute top-3 left-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-2 py-1 rounded-md">
                            NEW
                          </div>
                        )}
                      </div>
                      <div className="p-6 flex-1">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-1">
                            {Array(5)
                              .fill(0)
                              .map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-500"
                                  }`}
                                />
                              ))}
                            <span className="text-xs text-white/60 ml-1">({product.reviews})</span>
                          </div>
                          <div className="text-xs bg-white/10 text-white px-2 py-1 rounded-md">{product.brandName}</div>
                        </div>
                        <Link to={`/product/view/${product.id}`}>
                          <h3 className="font-semibold text-xl text-white hover:text-purple-300 transition-colors mb-2">
                            {product.name}
                          </h3>
                        </Link>
                        <p className="text-white/60 text-sm mb-4 line-clamp-2">{product.description}</p>
                        <div className="flex items-center justify-between">
                          <div>
                            {product.discount > 0 ? (
                              <div className="flex items-center gap-2">
                                <p className="font-bold text-2xl bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                                  ${(product.price * (1 - product.discount / 100)).toFixed(2)}
                                </p>
                                <p className="text-sm text-white/50 line-through">${product.price.toFixed(2)}</p>
                              </div>
                            ) : (
                              <p className="font-bold text-2xl bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                                ${product.price.toFixed(2)}
                              </p>
                            )}
                          </div>
                          <div className="flex gap-3">
                            <button
                              onClick={() => handleAddToWishlist(product)}
                              className="h-10 w-10 rounded-full bg-white/10 text-white/70 hover:text-red-400 hover:bg-white/20 flex items-center justify-center transition-all duration-200 cursor-pointer z-20"
                              style={{ pointerEvents: "auto" }}
                            >
                              <Heart className="h-5 w-5" />
                            </button>
                            <button
                              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-2 rounded-2xl transition-all duration-200 cursor-pointer z-20"
                              disabled={!product.inStock}
                              onClick={() => handleAddToCart(product)}
                              style={{ pointerEvents: product.inStock ? "auto" : "none" }}
                            >
                              Add to Cart
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {totalPages > 1 && (
              <div className="mt-12 flex items-center justify-center gap-4">
                <button
                  className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  <ChevronLeft className="h-5 w-5" />
                  Previous
                </button>
                <div className="flex gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      className={`h-12 w-12 rounded-2xl font-semibold transition-all duration-300 hover:scale-110 ${
                        currentPage === page
                          ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                          : "bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20"
                      }`}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </button>
                  ))}
                </div>
                <button
                  className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  Next
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <section className="py-16 bg-gradient-to-r from-purple-900/20 via-blue-900/20 to-indigo-900/20 mt-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5"></div>
        <div className="container px-4 md:px-6 mx-auto relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2 space-y-8">
              <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                Shopping Guide
              </h2>
              <p className="text-xl text-white/80 leading-relaxed">
                Not sure which product is right for you? Our magical shopping guide can help you make the best choice
                for your farming needs.
              </p>
              <div className="space-y-6">
                <div className="flex gap-4 group">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <SlidersHorizontal className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg">Use Magical Filters</h3>
                    <p className="text-white/70">
                      Narrow down your search by category, brand, or price range with our intelligent filtering system.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 group">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <ArrowUpDown className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg">Smart Sorting</h3>
                    <p className="text-white/70">
                      Sort by price, popularity, or ratings to find the perfect options for your needs.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 group">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-r from-green-600 to-emerald-600 text-white flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <TrendingUp className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg">Read Reviews</h3>
                    <p className="text-white/70">
                      Check what other customers are saying about the products to make informed decisions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:w-1/2 relative">
              <div className="aspect-video relative rounded-3xl overflow-hidden shadow-2xl border border-white/20">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-sm flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="h-20 w-20 mx-auto bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                      <Sparkles className="h-10 w-10 text-white animate-pulse" />
                    </div>
                    <p className="text-white font-semibold">Interactive Shopping Guide</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer className="w-full py-12 bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 text-white/80 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5"></div>
        <div className="container px-4 md:px-6 mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-center md:text-left text-white/60">
              © {new Date().getFullYear()} Agricultural Tools Store. All rights reserved. ✨
            </p>
            <div className="flex gap-8">
              <Link to="/" className="text-white/60 hover:text-purple-400 transition-colors duration-300">
                Privacy Policy
              </Link>
              <Link to="/" className="text-white/60 hover:text-pink-400 transition-colors duration-300">
                Terms of Service
              </Link>
              <Link to="/" className="text-white/60 hover:text-cyan-400 transition-colors duration-300">
                Help Center
              </Link>
            </div>
          </div>
        </div>
      </footer>
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out forwards;
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .reverse {
          animation-direction: reverse;
        }
      `}</style>
    </div>
  );
}

export default ProductsPage;