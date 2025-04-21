import { Link } from "react-router-dom";
import Navication from "../../HomePage/Component/Navication.jsx";
import HeroBackGround from "./HeroBackGround.jsx";
import { ChevronRight } from "lucide-react";
import CardProduct from "../../HomePage/Component/CardProduct.jsx";
import getAllCategoriesWithProducts from "/src/Pages/CategoriesPage/code/data.js";
import { useEffect, useState } from "react";

function CategoriesPage() {
  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllCategoriesWithProducts();
      setApiData(data);
    };
    fetchData();
  }, []);

  const categories = apiData.map((category) => ({
    categoryId: category.category_id,
    name: category.category_name,
    tools: (category.products).map((product) => ({
      id: product.product_id,
      name: product.product_name,
      price: product.selling_price,
      tag: product.company_name,
      description: product.description,
      rating: product.product_rating,
      availability: product.availability_status,
      image: product.attachments?.[0],
    })),
  }));

  return (
    <div className="min-h-screen w-full flex flex-col">
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
            to="/categories"
            className="text-[#a4a4a4] hover:text-teal-600 transition-colors pt-[100px]"
          >
            Categories
          </Link>
        </div>
        <h2 className="text-3xl font-bold text-black">Categories</h2>
        <p className="text-[#a4a4a4] m-0 py-[30px]">
          High-quality tools for all your farming needs
        </p>
      </HeroBackGround>

      {categories.map((category, index) => (
        <div key={index}>
          <h2 className="text-2xl font-bold text-black/60 pl-[25px] pt-[25px] m-0">
            {category.name}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 p-5">
            {category.tools.map((tool, toolIndex) => (
              <CardProduct key={toolIndex} product={tool} />
            ))}
          </div>

          <div className="flex justify-center my-8">
            <button className="group flex items-center gap-2 px-4 py-2 rounded-full border border-green-500 bg-white text-sm font-medium text-green-600 shadow-sm transition-all hover:bg-gray-50 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2">
              Show more
              <ChevronRight className="text-green-400 transition-transform group-hover:text-gray-600 group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CategoriesPage;
