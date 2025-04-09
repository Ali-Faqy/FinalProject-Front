import { Link } from "react-router-dom";
import { Leaf, ChevronRight } from "lucide-react";
import CardCategory from "./CardCategory.jsx";
function CategoryBody() {
  const categorys = [
    {
      id: 1,
      name: "Gardening Tools",
      description: "Essential tools for garden maintenance and plant care",
      image: "",
      items: 42,
    },
    {
      id: 2,
      name: "Irrigation Systems",
      description: "Water management solutions for all farm sizes",
      image: "",
      items: 28,
    },
    {
      id: 3,
      name: "Harvesting Equipment",
      description: "Tools designed for efficient crop collection",
      image: "",
      items: 35,
    },
    {
      id: 4,
      name: "Farming Machinery",
      description: "Heavy-duty equipment for large-scale farming",
      image: "",
      items: 19,
    },
  ];
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
      <button className="flex flex-row items-center justify-center gap-2 bg-[#ffffff] mt-20 text-black rounded-full border-green-200 text-green-700 hover:bg-green-50 gap-2 w-[200px] h-[40px] border-2 group">
        View All Categories
        <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </button>
    </div>
  );
}
export default CategoryBody;
