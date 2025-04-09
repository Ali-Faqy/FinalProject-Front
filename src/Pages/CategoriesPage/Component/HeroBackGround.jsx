import { Leaf, Tractor, Cloud, Droplets } from "lucide-react";
import {Link} from "react-router-dom";
function HeroBackGround({ children }) {
  return (
    <div className="w-full h-[300px] relative bg-[#e6e6e6] flex justify-center items-center">
      {/* Blurred background circles */}
      <div className="absolute top-20 right-10 h-40 w-40 rounded-full bg-teal-500/10 blur-3xl" />
      <div className="absolute bottom-10 left-10 h-40 w-40 rounded-full bg-yellow-400/10 blur-3xl" />

      {/* Animated decorative icons */}
      <div className="absolute inset-0 transition-opacity duration-1000 opacity-100">
        <div className="absolute top-20 left-[10%] animate-bounce-slow">
          <Leaf className="h-16 w-16 text-teal-500/70" />
        </div>
        <div className="absolute top-40 right-[15%] animate-pulse">
          <Tractor className="h-20 w-20 text-yellow-400/70" />
        </div>
        <div className="absolute bottom-20 left-[20%] animate-bounce-slow">
          <Cloud className="h-16 w-16 text-teal-500/60" />
        </div>
        <div className="absolute bottom-40 right-[25%] animate-pulse">
          <Droplets className="h-14 w-14 text-teal-500/60" />
        </div>
      </div>

      {/* Page content */}
      <div className="absolute top-4 left-4 z-10 text-black">{children}</div>
    </div>
  );
}
export default HeroBackGround;
