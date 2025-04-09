import { Link } from "react-router-dom";
import { Tractor, ChevronRight } from "lucide-react";
import CardProduct from "./CardProduct.jsx";

function ProductBody() {
  const products = [
    {
      id: 1,
      name: "Premium Tractor",
      price: 1299.99,
      tag: "Best Seller",
      description: "Top of the Line",
      rating: 5,
      availability: true,
      image: "",
    },
    {
      id: 2,
      name: "Irrigation System",
      price: 249.99,
      tag: "New Arrival",
      description: "Latest Technology",
      rating: 4,
      availability: true,
      image: "",
    },
    {
      id: 3,
      name: "Harvesting Tool",
      price: 89.99,
      tag: "Popular",
      description: "Best for Harvesting",
      rating: 3,
      availability: false,
      image: "",
    },
    {
      id: 4,
      name: "Seed Planter",
      price: 159.99,
      tag: "Sale",
      description: "Limited Time Offer",
      rating: 4.5,
      availability: true,
      image: "",
    },
    {
      id: 5,
      name: "Garden Shears",
      price: 29.99,
      tag: "Best Value",
      description: "Perfect for Pruning",
      rating: 2,
      availability: true,
      image: "",
    },
    {
      id: 6,
      name: "Soil Tester Kit",
      price: 49.99,
      tag: "Top Rated",
      description: "Essential for Farmers",
      rating: 5,
      availability: true,
      image: "",
    },
    {
      id: 7,
      name: "Water Pump",
      price: 199.99,
      tag: "Essential",
      description: "High Efficiency",
      rating: 4,
      availability: true,
      image: "",
    },
    {
      id: 8,
      name: "Farming Gloves",
      price: 19.99,
      tag: "Must Have",
      description: "Comfortable and Durable",
      rating: 3,
      availability: false,
      image: "",
    },
  ];

  return (
    <div className="w-full h-[1600px] mt-[200px] flex flex-col items-center justify-start gap-4">
      <div className="h-[64px] w-[64px] bg-green-200 rounded-full flex justify-center items-center mt-[50px]">
        <Tractor className="h-[24px] w-[24px] text-green-600" />
      </div>
      <h2 className="text-5xl font-bold">Featured Products</h2>
      <div className="h-1 w-20 bg-gradient-to-r from-green-600 to-amber-600 rounded-full my-4"></div>
      <p className="text-xl text-[#b3b3b3] mt-2">
        Explore our most popular agricultural tools and equipment.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
        {products.map((product, index) => (
          <CardProduct key={index} product={product} />
        ))}
      </div>
      <button className="flex flex-row items-center justify-center gap-2 bg-[#ffffff] mt-20 text-black rounded-full border-green-200 text-green-700 hover:bg-green-50 gap-2 w-[200px] h-[40px] border-2 group">
        View All Products
        <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </button>
    </div>
  );
}

export default ProductBody;
