import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import NoImage from "../../../assets/NoImage.jpg";
import {
  ArrowLeft,
  Edit,
  Heart,
  Printer,
  Share,
  ShoppingCart,
  Star,
} from "lucide-react";
import Layout from "../UI/Layout.jsx";
import PageContainer from "../UI/PageContainer.jsx";
import { getProductById } from "../../ProductsPage/Code/Product_data.js";
export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id;

  const [product, setProduct] = useState({});
  
    const fetchProduct = async () => {
      const data = await getProductById(productId);
      if (data) {
        const mappedProduct = {
          id: productId,
          name: data.product_name,
          category: data.category_name,
          selling_price: data.selling_price,
          original_price: data.original_price,
          rating: data.product_rating,
          reviews: data.number_of_users_rating_product,
          stock: data.remaining_quantity,
          description: data.description,
          uses: data.uses,
          how_use_it: data.how_use_it,
          land_size: data.land_size,
          company_name: data.company_name,
          images: data.attachments,
          year_of_manufacturing: data.year_of_manufacture,
        };
        setProduct(mappedProduct);
      }
    };
    const [selectedImage, setSelectedImage] = useState(0);
  
    useEffect(() => {
      fetchProduct();
    }, []);
  // This would normally come from an API or database
  // const product = {
  //   id: productId,
  //   name: "Compact Tractor X200",
  //   category: "Tractors",
  //   selling_price: 24500,
  //   original_price: 29999,
  //   rating: 4.8,
  //   reviews: 124,
  //   stock: 15,
  //   description:
  //     "The Compact Tractor X200 is a versatile and powerful machine designed for small to medium-sized farms and agricultural operations. With its robust engine and compact design, it offers excellent maneuverability and efficiency for various farming tasks.",
  //   features: [
  //     "60 HP diesel engine",
  //     "4-wheel drive",
  //     "Hydraulic power steering",
  //     "Adjustable seat with suspension",
  //     "Digital instrument panel",
  //     "LED work lights",
  //     "3-point hitch system",
  //     "Power take-off (PTO)",
  //   ],
  //   specifications: {
  //     engine: "4-cylinder diesel",
  //     horsepower: "60 HP",
  //     transmission: "12-speed synchromesh",
  //     fuelCapacity: "15 gallons",
  //     hydraulicSystem: "Open center",
  //     liftCapacity: "3,300 lbs",
  //     weight: "4,200 lbs",
  //     dimensions: '126" L x 72" W x 98" H',
  //   },
  //   images: [
  //     "/placeholder.svg?height=500&width=500",
  //     "/placeholder.svg?height=500&width=500",
  //     "/placeholder.svg?height=500&width=500",
  //   ],
  // };

  const handleEditProduct = () => {};

  return (
    <Layout adminName={"Ali Othman"}>
      <PageContainer title="" description="">
        {/* Back button and actions */}
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => window.history.back()}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            <span>Back to Products</span>
          </button>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => window.print()}
              className="flex items-center px-3 py-1.5 text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Printer className="h-4 w-4 mr-1" />
              <span>Print</span>
            </button>
            <Link to={`/tools/${product.id}/edit`}><button
              onClick={handleEditProduct}
              className="flex items-center px-3 py-1.5 text-white bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 rounded-lg transition-all duration-300"
            >
              <Edit className="h-4 w-4 mr-1" />
              <span>Edit Product</span>
            </button></Link>
          </div>
        </div>

        {/* Product Details */}
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden p-6 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Product Images */}
                  <div>
                    <div className="relative h-80 bg-gray-100 rounded-lg mb-4 overflow-hidden">
                      <img
                        src={product.images?.[selectedImage] || NoImage}
                        alt={product.name}
                        className="object-contain"
                      />
                    </div>
                    <div className="flex space-x-2">
                      {(product.images || []).map((image, index) => (
                        <div
                          key={index}
                          className={`relative h-20 w-20 bg-gray-100 rounded-md cursor-pointer border-2 ${
                            selectedImage === index
                              ? "border-green-500"
                              : "border-transparent"
                          } hover:border-green-300 transition-colors`}
                          onClick={() => setSelectedImage(index)}
                        >
                          <img
                            src={image || NoImage}
                            alt={`${product.name} ${index + 1}`}
                            className="object-contain p-1"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
        
                  {/* Product Info */}
                  <div>
                    <div className="flex flex-col mb-4 items-start justify-start">
                      <h1 className="text-2xl font-bold text-gray-900 mb-2 m-0 ">
                        {product.name}
                      </h1>
                      <div className="flex items-center mb-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < Math.floor(product.rating)
                                  ? "text-yellow-400"
                                  : "text-gray-300"
                              }`}
                              fill={
                                i < Math.floor(product.rating) ? "currentColor" : "none"
                              }
                            />
                          ))}
                        </div>
                        <span className="ml-2 text-sm text-gray-600">
                          {product.rating} ({product.reviews} reviews)
                        </span>
                      </div>
                      <div className="flex flex-row items-start justify-start gap-1">
                        <p className="text-sm text-gray-600 mb-4 m-0">Price: </p>
                        <p className="text-sm text-gray-600 mb-4 m-0">
                          {product.selling_price != null
                            ? `$${product.selling_price.toLocaleString()}`
                            : "N/A"}
                        </p>
                      </div>
                      <div className="flex flex-row items-start justify-start gap-1">
                        <p className="text-sm text-gray-600 mb-4 m-0">
                          Manufacturing Year:{" "}
                        </p>
                        <p className="text-sm text-gray-600 mb-4 m-0">
                          {product.year_of_manufacturing}
                        </p>
                      </div>
                      <p className="text-sm text-gray-600 mb-4 m-0">
                        Category: {product.category}
                      </p>
                      <p className="text-sm text-gray-600 mb-4 m-0">
                        Manufacture Company: {product.company_name}
                      </p>
                      <p className="text-sm text-gray-600 mb-4 m-0">
                        Land Size: {product.land_size}
                      </p>
                      <div className="flex flex-row items-start justify-start gap-1">
                        <p className="text-sm text-gray-600 m-0">Stock: </p>
                        <p className="text-sm text-gray-600 m-0">
                          {product.stock} units available
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-row items-center justify-end gap-4">
                      <button
                        className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 text-white rounded-lg transition-all duration-300 hover:shadow-lg flex items-center justify-center"
                        onClick={() => {
                          InsertProductIntoCart(
                            userId,
                            product.id,
                            1,
                            product.name
                          );
                        }}
                      >
                        <ShoppingCart className="h-5 w-5 mr-2" />
                        Add to Cart
                      </button>
                      <button className="p-3 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors hover:text-red-500"
                      onClick={() => {
                        InsertProductIntoWishlist(
                          userId,
                          product.id,
                          product.name
                        );
                      }}>
                        <Heart className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
        
              {/* Product Specifications */}
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden p-6 mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Specifications</h2>
                <div className="flex flex-row gap-5 items-center justify-center">
                  <div className="w-[30%]">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      How use it
                    </h3>
                    {product.how_use_it}
                  </div>
                  <div className="w-[30%]">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Description
                    </h3>
                    {product.description}
                  </div>
                  <div className="w-[30%]">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Uses</h3>
                    {product.uses}
                  </div>
                </div>
              </div>
      </PageContainer>
    </Layout>
  );
}
