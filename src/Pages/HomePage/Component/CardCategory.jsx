import { Link } from "react-router-dom";
import imagee from "/src/assets/image10.png";
import { ChevronRight } from "lucide-react";

function CardCategory({ category }) {
  const getDriveThumbnail = (url) => {
      const match = url.match(/\/d\/([^/]+)\//);
      return match ? `https://drive.google.com/thumbnail?id=${match[1]}` : NoImage;
    };

  const { id, name, description, image, items } = category;
  return (
    <div
      className="h-[300px] w-[600px] rounded-2xl shadow-xl hover:shadow-2xl transition-all relative group"
      style={{
        backgroundImage: `url(${
          image && image.trim() !== "" ? getDriveThumbnail(image) : imagee
        })`,
      }}
    >
      <div className="w-full h-full flex flex-col justify-start items-start gap-5">
        <h3 className="text-white font-bold text-2xl m-0 pt-[150px] pl-[15px]">
          {name}
        </h3>
        <p className="text-white/80 max-w-[80%] m-0 pl-[15px]">{description}</p>
        <div className="flex justify-between items-center pl-[15px] ">
          <p className="bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm m-0 w-[125px] rounded-xl">
            {items} Products
          </p>
          \
          <div className="ml-[410px] flex items-center justify-center text-white group-hover:translate-x-2 transition-transform hover:bg-white w-[30px] h-[30px] rounded-full hover:text-black">
            <ChevronRight className="h-5 w-5" />
          </div>
        </div>
      </div>
    </div>
  );
}
export default CardCategory;
