import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

function SocialMedia() {
  const userId = localStorage.getItem("userId");
    if (!userId) {
        <Link to="/signIn"></Link>
    }
  return (
    <div className="flex w-full h-[500px] justify-center items-center">
      <div className="w-[60%] h-[75%] rounded-3xl bg-white/10 backdrop-blur-md flex flex-col justify-start items-start gap-5 shadow-2xl shadow-black/50">
        <h2 className="text-3xl font-bold text-black/60 pl-[25px] pt-[25px] m-0">
          Join to Moedati Community
        </h2>
        <p className="md:text-xl text-black/60 text-start max-w-[700px] pl-[25px] m-0">
          Grow smarter with Moedati 🌾✨ Subscribe now to get exclusive offers,
          expert farming tips, and be the first to know when new gear drops.
          Don’t miss out — your farm deserves the best! 🚜🛠️
        </p>
        <button className="flex flex-row items-center justify-center gap-2 bg-[#ffffff] mt-5 ml-[25px] text-black rounded-full border-green-200 text-green-700 hover:bg-green-50 gap-2 w-[200px] h-[40px] border-2 group">
          Get Start
          <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </button>
        <p className="md:text-xl text-black/60 text-start max-w-[700px] pl-[25px] m-0">
        Enjoy the most beautiful experience of getting to know and exchanging experiences with people interested in this field.</p>
      </div>
    </div>
  );
}

export default SocialMedia;
