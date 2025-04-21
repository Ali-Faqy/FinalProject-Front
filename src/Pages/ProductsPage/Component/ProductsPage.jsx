import { Link } from "react-router-dom";
import Navication from "../../HomePage/Component/Navication.jsx";
import HeroBackGround from "../../CategoriesPage/Component/HeroBackGround.jsx";
import NoImage from "/src/assets/NoImage.jpg";
import React from 'react';
import {
  ChevronRight,
  Search,
  Grid3X3,
  List,
  Star,
  Heart,
  ShoppingBag,
  ChevronLeft,
  X,
  SlidersHorizontal,
  ArrowUpDown,
  Filter,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Slider } from "../../UI/Slider.jsx";
import { Separtor } from "../../UI/Separtor.jsx";
import { Checkbox } from "../../UI/Checkbox.jsx";
import { Switch } from "../../UI/Switch.jsx";
import {getAllProducts, getAllCategories, getAllBrands, InsertProductIntoCart} from "../Code/Product_data.js";

function ProductsPage() {
  const userId = localStorage.getItem("userId");
    if (!userId) {
        <Link to="/signIn"></Link>
    }

  const [viewMode, setViewMode] = useState("grid");
  const [priceRange, setPriceRange] = useState([0, 1500]);
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

  const getDriveThumbnail = (url) => {
    const match = url.match(/\/d\/([^/]+)\//);
    return match ? `https://drive.google.com/thumbnail?id=${match[1]}` : NoImage;
  };

  const fetchProducts = async () => {
    const data = await getAllProducts();
    if (data) {
      // Map API data to match the structure used in the component
      const mappedProducts = data.map((product) => ({
        id: product.product_id,
        name: product.product_name,
        price: product.selling_price,
        image: product.attachments[0],
        inStock: product.availability_status,
        rating: product.product_rating,
        reviews: product.number_of_users_rating_product,
        description: product.how_use_it,
        brand: `Brand ${product.company_id}`, // Adjust as needed
        category: `Category ${product.category_id}`, // Adjust as needed
        discount: product.offer_percentage,
        featured: false, // Adjust based on your logic
        new: new Date(product.added_at) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // Mark as new if added in the last 30 days
      }));
      setProducts(mappedProducts);
    }
  };

  const fetchCategories = async () => {
    const data = await getAllCategories();
    if (data) {
      // Map API data to match the structure used in the component
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
      // Map API data to match the structure used in the component
      const mappedBrands = data.map((brand) => ({
        name: brand.company_name,
      }));
      setBrands(mappedBrands);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchBrands();
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      !searchQuery ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesCategory =
      !selectedCategory || product.category === selectedCategory;
    const matchesBrand = !selectedBrand || product.brand === selectedBrand;
    const matchesPrice =product.price >= priceRange[0] && product.price <= priceRange[1];
    // const matchesInStock = !inStockOnly || product.inStock;
    // const matchesOnSale = !onSaleOnly || product.discount > 0;
    return (
      matchesSearch &&
        matchesCategory &&
        matchesBrand &&
        matchesPrice
      //   matchesInStock,
      // matchesOnSale
    );
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
      default: // featured
        return b.featured ? 1 : -1;
    }
  });

  const productsPerPage = 9;
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);
  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  return (
    <div className="min-h-screen w-full flex flex-col bg-[#e6e6e6]">
      <Navication />
      <HeroBackGround>
        <div className="mb-6 flex items-center">
          <Link
            to="/home"
            className="text-[#a4a4a4] hover:text-teal-600 transition-colors pt-[100px]"
          >
            Home
          </Link>
          <ChevronRight className="text-[#a4a4a4] mx-2 h-4 w-4 mt-[100px]" />
          <Link
            to="/products"
            className="text-black hover:text-teal-600 transition-colors pt-[100px]"
          >
            All products
          </Link>
        </div>
        <h2 className="text-3xl font-bold text-black">All Products</h2>
        <p className="text-[#a4a4a4] m-0 py-[30px]">
          Browse our complete collection of high-quality agricultural tools and
          equipment
        </p>
      </HeroBackGround>

      <div className="container px-4 md:px-6 mx-auto">
        {/* Sorting and view options */}
        <div className="rounded-xl px-5 bg-white h-[80px] flex flex-col sm:flex-row justify-between items-center mb-6 gap-4 mt-6">
          <div className="relative flex-1 max-w-md w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#a4a4a4]" />
            <input
              type="text"
              placeholder="Search products..."
              className="pl-9 w-full h-10 rounded-md border border-teal-600/20 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="border border-teal-600/20 bg-white text-black hover:bg-teal-600/10 md:hidden h-10 px-4 py-2 rounded-md text-sm flex items-center gap-2"
            >
              <Filter className="h-4 w-4" />
              Filters
            </button>

            <div className="flex border rounded-md overflow-hidden">
              <button
                className={`rounded-none h-10 w-10 flex items-center justify-center ${
                  viewMode === "grid"
                    ? "bg-teal-600/10 text-teal-600"
                    : "bg-white"
                }`}
                onClick={() => setViewMode("grid")}
              >
                <Grid3X3 className="h-4 w-4" />
              </button>
              <button
                className={`rounded-none h-10 w-10 flex items-center justify-center ${
                  viewMode === "list"
                    ? "bg-teal-600/10 text-teal-600"
                    : "bg-white"
                }`}
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </button>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-[#a4a4a4] whitespace-nowrap">
                Sort by:
              </span>
              <select
                className="h-10 rounded-md border border-teal-600/20 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Active filters */}
        <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
          <div className="text-sm text-[#a4a4a4]">
            Showing{" "}
            <span className="font-medium text-black">
              {paginatedProducts.length}
            </span>{" "}
            of{" "}
            <span className="font-medium text-black">
              {filteredProducts.length}
            </span>{" "}
            products
          </div>

          <div className="flex flex-wrap gap-2">
            {selectedCategory && (
              <div className="bg-teal-600/10 text-teal-600 flex items-center gap-1 pl-2 pr-1 rounded-full text-sm py-1">
                Category: {selectedCategory}
                <button
                  className="h-5 w-5 p-0 hover:bg-teal-600/20 rounded-full flex items-center justify-center"
                  onClick={() => setSelectedCategory(null)}
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            )}

            {selectedBrand && (
              <div className="bg-teal-600/10 text-teal-600 flex items-center gap-1 pl-2 pr-1 rounded-full text-sm py-1">
                Brand: {selectedBrand}
                <button
                  className="h-5 w-5 p-0 hover:bg-teal-600/20 rounded-full flex items-center justify-center"
                  onClick={() => setSelectedBrand(null)}
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            )}

            {(priceRange[0] > 0 || priceRange[1] < 1500) && (
              <div className="bg-teal-600/10 text-teal-600 flex items-center gap-1 pl-2 pr-1 rounded-full text-sm py-1">
                Price: ${priceRange[0]} - ${priceRange[1]}
                <button
                  className="h-5 w-5 p-0 hover:bg-teal-600/20 rounded-full flex items-center justify-center"
                  onClick={() => setPriceRange([0, 1500])}
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            )}

            {(selectedCategory ||
              selectedBrand ||
              priceRange[0] > 0 ||
              priceRange[1] < 1500) && (
              <button
                className="h-7 text-xs border border-teal-600/20 text-teal-600 hover:bg-teal-600/10 rounded-md px-2"
                onClick={() => {
                  setSelectedCategory(null);
                  setSelectedBrand(null);
                  setPriceRange([0, 1500]);
                }}
              >
                Clear All
              </button>
            )}
          </div>
        </div>

        <div className="w-full flex flex-col md:flex-row gap-8">
          {/* Filters sidebar - desktop */}
          <div className="hidden md:block w-[280px] shrink-0">
            <div className="sticky top-24 bg-white rounded-lg shadow-md border-0 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold">Filters</h2>
                <button
                  className="h-8 text-xs hover:bg-[#e6e6e6] rounded-xl px-2"
                  onClick={() => {
                    setPriceRange([0, 1500]);
                    setSelectedCategory(null);
                    setSelectedBrand(null);
                  }}
                >
                  Reset All
                </button>
              </div>

              <div className="space-y-6">
                {/* Price Range */}
                <div>
                  <h3 className="font-medium mb-3">Price Range</h3>
                  <div className="space-y-4">
                    <Slider
                      defaultValue={[0, 1500]}
                      max={1500}
                      step={10}
                      value={priceRange}
                      onValueChange={setPriceRange}
                      className="py-4"
                    />
                    <div className="flex items-center justify-between">
                      <div className="border rounded-md px-3 py-1.5">
                        ${priceRange[0]}
                      </div>
                      <div className="border rounded-md px-3 py-1.5">
                        ${priceRange[1]}
                      </div>
                    </div>
                  </div>
                </div>

                <Separtor className="mt-[20px]" />

                {/* Categories */}
                <div>
                  <h3 className="font-medium mb-3">Categories</h3>
                  <div className="space-y-2">
                    {categories.map((category, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Checkbox
                          id={`category-${index}`}
                          checked={selectedCategory === category.name}
                          onCheckedChange={(checked) => {
                            setSelectedCategory(checked ? category.name : null);
                          }}
                        />
                        <label
                          htmlFor={`category-${index}`}
                          className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {category.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <Separtor className="mt-[20px]" />

                {/* Brands */}
                <div>
                  <h3 className="font-medium mb-3">Brands</h3>
                  <div className="space-y-2">
                    {brands.map((brand, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Checkbox
                          id={`brand-${index}`}
                          checked={selectedBrand === brand.name}
                          onCheckedChange={(checked) => {
                            setSelectedBrand(checked ? brand.name : null);
                          }}
                        />
                        <label
                          htmlFor={`brand-${index}`}
                          className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {brand.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <Separtor className="mt-[20px]" />

                {/* Availability */}
                <div>
                  <h3 className="font-medium mb-3">Availability</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label htmlFor="in-stock" className="text-sm">
                        In Stock Only
                      </label>
                      <Switch
                        id="in-stock"
                        checked={inStockOnly}
                        onCheckedChange={setInStockOnly}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <label htmlFor="on-sale" className="text-sm">
                        On Sale
                      </label>
                      <Switch
                        id="on-sale"
                        checked={onSaleOnly}
                        onCheckedChange={setOnSaleOnly}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Products section */}
          <div className="flex-1">
            {/* Products grid/list */}
            {paginatedProducts.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-teal-600/10 mb-4">
                  <Search className="h-8 w-8 text-teal-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  No Products Found
                </h3>
                <p className="text-[#a4a4a4] mb-6">
                  We couldn't find any products matching your search criteria.
                </p>
                <button
                  className="border border-teal-600/20 text-teal-600 hover:bg-teal-600/10 px-4 py-2 rounded-md"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory(null);
                    setSelectedBrand(null);
                    setPriceRange([0, 1500]);
                  }}
                >
                  Clear Filters
                </button>
              </div>
            ) : viewMode === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedProducts.map((product) => (
                  <div
                    key={product.id}
                    className="border-0 overflow-hidden bg-white shadow-md rounded-lg hover:shadow-lg transition-all duration-300 group"
                  >
                    <div className="relative">
                      <div className="aspect-square relative overflow-hidden">
                        <img
                          src={product.image && product.image.trim() !== "" ? getDriveThumbnail(product.image) : NoImage}
                          alt={product.name}
                          className="object-cover w-full h-full transition-all duration-500 group-hover:scale-110"
                        />
                      </div>
                      <div className="absolute top-3 right-3 flex flex-col gap-2">
                        <button className="h-8 w-8 rounded-full bg-white/90 text-[#a4a4a4] hover:bg-white hover:text-red-500 shadow-sm flex items-center justify-center">
                          <Heart className="h-4 w-4" />
                        </button>
                      </div>
                      {!product.inStock && (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                          <div className="bg-red-500 text-white px-3 py-1.5 rounded-md">
                            Out of Stock
                          </div>
                        </div>
                      )}
                      <div className="absolute top-3 left-3 flex flex-col">
                        {product.discount > 0 && (
                          <div className="bg-yellow-500 text-black px-2 py-1 rounded-md">
                            {product.discount}% OFF
                          </div>
                        )}
                        {product.new && (
                          <div className="bg-teal-600 text-white px-2 py-1 rounded-md">
                            NEW
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center gap-1 text-yellow-500 mb-1">
                        {Array(5)
                          .fill(0)
                          .map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${
                                i < Math.floor(product.rating)
                                  ? "fill-current"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        <span className="text-xs text-[#a4a4a4] ml-1">
                          ({product.reviews})
                        </span>
                      </div>
                      <Link to={`/product/${product.id}`}>
                        <h3 className="font-semibold line-clamp-1 hover:text-teal-600 transition-colors">
                          {product.name}
                        </h3>
                      </Link>
                      <p className="text-xs text-[#a4a4a4] mt-1 line-clamp-2 text-start">
                        {product.description}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <div>
                          {product.discount > 0 ? (
                            <div className="flex items-center gap-2">
                              <p className="font-bold text-lg text-teal-600">
                                $
                                {(
                                  product.price *
                                  (1 - product.discount / 100)
                                ).toFixed(2)}
                              </p>
                              <p className="text-sm text-[#a4a4a4] line-through">
                                ${product.price.toFixed(2)}
                              </p>
                            </div>
                          ) : (
                            <p className="font-bold text-lg text-teal-600">
                              ${product.price.toFixed(2)}
                            </p>
                          )}
                        </div>
                        <div className="text-xs border border-teal-600/20 text-teal-600 px-2 py-1 rounded-md">
                          {product.brand}
                        </div>
                      </div>
                      <button
                        className="w-full mt-4 bg-teal-600 hover:bg-teal-700 text-white py-2 rounded-md"
                        disabled={!product.inStock}
                        onClick={() => {
                          const quantity = 1; 
                          InsertProductIntoCart(userId, product.id, quantity);
                        }}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {paginatedProducts.map((product) => (
                  <div
                    key={product.id}
                    className="border-0 overflow-hidden bg-white shadow-md rounded-lg hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex flex-col sm:flex-row">
                      <div className="relative w-full sm:w-[200px] h-[200px]">
                        <img
                          src={product.image && product.image.trim() !== "" ? getDriveThumbnail(product.image) : NoImage}
                          alt={product.name}
                          className="object-cover w-full h-full"
                        />
                        {!product.inStock && (
                          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                            <div className="bg-red-500 text-white px-3 py-1.5 rounded-md">
                              Out of Stock
                            </div>
                          </div>
                        )}
                        {product.discount > 0 && (
                          <div className="absolute top-3 left-3 bg-yellow-500 text-black px-2 py-1 rounded-md">
                            {product.discount}% OFF
                          </div>
                        )}
                        {product.new && (
                          <div className="absolute top-3 left-3 bg-teal-600 text-white px-2 py-1 rounded-md">
                            NEW
                          </div>
                        )}
                      </div>
                      <div className="p-4 flex-1">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1 text-yellow-500">
                            {Array(5)
                              .fill(0)
                              .map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-3 w-3 ${
                                    i < Math.floor(product.rating)
                                      ? "fill-current"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                            <span className="text-xs text-[#a4a4a4] ml-1">
                              ({product.reviews})
                            </span>
                          </div>
                          <div className="text-xs border border-teal-600/20 text-teal-600 px-2 py-1 rounded-md">
                            {product.brand}
                          </div>
                        </div>

                        <Link to={`/product/${product.id}`}>
                          <h3 className="font-semibold text-lg mt-2 hover:text-teal-600 transition-colors">
                            {product.name}
                          </h3>
                        </Link>

                        <p className="text-sm text-[#a4a4a4] mt-2 line-clamp-2">
                          {product.description}
                        </p>

                        <div className="flex items-center justify-between mt-4">
                          <div>
                            {product.discount > 0 ? (
                              <div className="flex items-center gap-2">
                                <p className="font-bold text-xl text-teal-600">
                                  $
                                  {(
                                    product.price *
                                    (1 - product.discount / 100)
                                  ).toFixed(2)}
                                </p>
                                <p className="text-sm text-[#a4a4a4] line-through">
                                  ${product.price.toFixed(2)}
                                </p>
                              </div>
                            ) : (
                              <p className="font-bold text-xl text-teal-600">
                                ${product.price.toFixed(2)}
                              </p>
                            )}
                          </div>

                          <div className="flex gap-2">
                            <button className="h-9 w-9 rounded-full border border-teal-600/20 text-[#a4a4a4] hover:text-red-500 hover:bg-red-500/10 flex items-center justify-center">
                              <Heart className="h-4 w-4" />
                            </button>
                            <button
                              className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md"
                              disabled={!product.inStock}

                              onClick={() => {
                                const quantity = 1;
                                console.log("Product added to cart:", product.id);
                                console.log("Product added to cart:", userId);
                                InsertProductIntoCart(userId, product.id, quantity);
                              }}
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

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex items-center justify-between">
                <button
                  className="border border-teal-600/20 text-teal-600 hover:bg-teal-600/10 px-4 py-2 rounded-md flex items-center"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Previous
                </button>

                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <button
                        key={page}
                        className={
                          currentPage === page
                            ? "bg-teal-600 hover:bg-teal-700 text-white h-8 w-8 p-0 rounded-md"
                            : "border border-teal-600/20 text-black hover:bg-teal-600/10 h-8 w-8 p-0 rounded-md"
                        }
                        onClick={() => setCurrentPage(page)}
                      >
                        {page}
                      </button>
                    )
                  )}
                </div>

                <button
                  className="border border-teal-600/20 text-teal-600 hover:bg-teal-600/10 px-4 py-2 rounded-md flex items-center"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  Next
                  <ChevronRight className="ml-2 h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Shopping guide section */}
      <section className="py-12 bg-gradient-to-r from-teal-600/5 to-yellow-500/5 mt-12">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Shopping Guide
              </h2>
              <p className="text-start text-[#a4a4a4] mb-6  m-0 pt-5">
                Not sure which product is right for you? Our shopping guide can
                help you make the best choice for your farming needs.
              </p>

              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="h-8 w-8 rounded-full bg-teal-600 text-white flex items-center justify-center flex-shrink-0">
                    <SlidersHorizontal className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-medium">Use Filters</h3>
                    <p className="text-sm text-[#a4a4a4]  m-0 pt-5">
                      Narrow down your search by category, brand, or price
                      range.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="h-8 w-8 rounded-full bg-teal-600 text-white flex items-center justify-center flex-shrink-0">
                    <ArrowUpDown className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-medium">Sort Results</h3>
                    <p className="text-sm text-[#a4a4a4]  m-0 pt-5">
                      Sort by price, popularity, or ratings to find the best
                      options.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="h-8 w-8 rounded-full bg-teal-600 text-white flex items-center justify-center flex-shrink-0">
                    <Search className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-medium">Read Reviews</h3>
                    <p className="text-sm text-[#a4a4a4] m-0 pt-5">
                      Check what other customers are saying about the products.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:w-1/2 relative">
              <div className="aspect-video relative rounded-lg overflow-hidden shadow-xl">
                <img
                  src="/"
                  alt="Shopping Guide"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="w-full py-6 bg-[#333] text-white/80">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-center md:text-left text-white/60 text-sm">
              © {new Date().getFullYear()} Agricultural Tools Store. All rights
              reserved.
            </p>
            <div className="flex gap-6">
              <Link
                to="/"
                className="text-white/60 hover:text-teal-600 text-sm"
              >
                Privacy Policy
              </Link>
              <Link
                to="/"
                className="text-white/60 hover:text-teal-600 text-sm"
              >
                Terms of Service
              </Link>
              <Link
                to="/"
                className="text-white/60 hover:text-teal-600 text-sm"
              >
                Help Center
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default ProductsPage;
