import { Link } from "react-router-dom";
import imagee from "/src/assets/image10.png";
import { Star } from "lucide-react";

function CardProduct({ product }) {
  const { id, name, price, tag, description, rating, availability, image } =
    product;

  const stars = [];

  // Whole stars
  for (let i = 0; i < Math.floor(rating); i++) {
    stars.push(<Star key={`full-${i}`} className="text-amber-400" />);
  }

  if (rating % 1 !== 0) {
    stars.push(<Star key="half" className="text-amber-400 opacity-50" />);
  }

  for (let i = stars.length; i < 5; i++) {
    stars.push(<Star key={`empty-${i}`} className="text-gray-400" />);
  }

  return (
    <div className="h-[520px] w-[300px] rounded-xl shadow-2xl">
      <div
        className="w-full h-[320px] pt-[15px] rounded-t-xl bg-cover bg-center hover:shadow-2xl transition-all relative group"
        style={{
          backgroundImage: `url(${
            image && image.trim() !== "" ? image : imagee
          })`,
        }}
      >
        <span className="bg-gradient-to-r from-green-600 to-amber-600 text-white border-0 rounded-2xl ml-[15px] pl-[10px] pr-[10px]">
          {tag}
        </span>
        <p className="text-transparent group-hover:text-white transition-all duration-300 text-center w-full max-w-[90%]">
          {description}
        </p>
      </div>
      <div className="flex flex-col justify-start items-start pl-[15px] pt-[15px] gap-3">
        <h3 className="text-lg font-semibold m-0">
          {name}
          {availability ? (
            <span className="text-green-400 ml-2 text-[10px]">(Available)</span>
          ) : (
            <span className="text-red-500 ml-2 text-[10px]">(Not Available)</span>
          )}
        </h3>
        <p className="text-sm text-[#6B7280] m-0">
          High-quality farming equipment
        </p>
        <div className="flex items-center m-0 gap-10">
          <p className="text-black font-bold text-xl m-0">
            ${price.toFixed(2)}
          </p>
          <div className="flex items-center gap-1">{stars}</div>
        </div>
        <button  className="text-xl mt-5 w-[270px] h-[40px] bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 rounded-full">
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default CardProduct;
