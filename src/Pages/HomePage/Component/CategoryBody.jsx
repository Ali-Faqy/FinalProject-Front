import { Link } from "react-router-dom";
import { Leaf, ChevronRight } from "lucide-react";
import CardCategory from "./CardCategory.jsx";
import { useState, useEffect } from "react";
import {getAllCategories} from "../Code/Category_data.js";

function CategoryBody() {
    const [categorys, setCategories] = useState([]);
    const fetchCategories = async () => {
      const data = await getAllCategories();
      if(data) {
        const mappedCategories = data.map((category) => ({
          id: category.category_id,
          name: category.category_name,
          description: category.description,
          image: category.photo,
          items: category.product_count,
        }));
        setCategories(mappedCategories);
      }
    };
    useEffect(() => {
      fetchCategories();
    }
    , []);
  return (
    <div className="w-full h-[1200px] mt-[50px] flex flex-col items-center justify-start gap-4">
      <div className="h-[64px] w-[64px] bg-amber-200 rounded-full flex justify-center items-center mt-[50px]">
        <Leaf className="h-[24px] w-[24px] text-amber-600" />
      </div>
      <h2 className="text-5xl font-bold">Shop by Category</h2>
      <div className="h-1 w-20 bg-gradient-to-r from-green-600 to-amber-600 rounded-full my-4"></div>
      <p className="text-xl text-[#b3b3b3] mt-2">
        Find the perfect tools for your specific agricultural needs.
      </p>
      <div className="grid grid-cols-2 gap-8 mt-8 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
        {categorys.map((category, index) => (
          <CardCategory key={index} category={category} />
        ))}
      </div>
      <Link to="/categories"><button className="flex flex-row items-center justify-center gap-2 bg-[#ffffff] mt-20 text-black rounded-full border-green-200 text-green-700 hover:bg-green-50 gap-2 w-[200px] h-[40px] border-2 group">
        View All Categories
        <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </button></Link>
    </div>
  );
}
export default CategoryBody;
