import { Link } from "react-router-dom";
import image from "/src/assets/image10.png";
import {
    Tractor,
  } from "lucide-react";
  
function Header(){
    let numberOfProduct = 1000;
    return(
        <div className="mt-[80px] w-full h-[500px] flex flex-row items-center justify-center pt-[70px]">
            <div className="h-full w-1/2  flex flex-col pl-8">
                <span className="text-5xl font-bold text-black-500 block mt-2">Cultivate<br></br>Success</span>
                <p className="md:text-xl max-w-[600px] text-start block pt-8 text-[#999999]">Discover our wide range of high-quality agricultural tools and
                equipment designed to enhance your farming 
                experience and maximize productivity.</p>
                <div className="flex flex-row gap-10 justify-start items-center pt-12 mt-10">
                    <button className="w-[150px] h-[50px] bg-green-600 hover:from-[#006666] hover:to-green-800 text-white rounded-full hover:shadow-xl transition-all">Shop Now</button>
                    <button className="w-[200px] h-[50px] bg-white border-2 border-green-200 text-[#008080] hover:bg-green-50 hover:text-black rounded-full">View Categories</button>
                </div>
            </div>
            <div className="h-full w-1/2 flex justify-center items-start">
            <div className="w-[75%] h-[75%] rounded-2xl shadow-2xl bg-cover bg-center" style={{ backgroundImage: `url(${image})` }}>
                <div className="bg-white h-[70px] w-[200px] rounded-xl flex flex-row justify-center items-center mt-[280px] ml-[-40px] shadow-2xl gap-2">
                    <div className="h-[36px] w-[36px] rounded-full bg-[#f8f5f0] flex items-center justify-center">
                        <Tractor className="text-black h-[24px] w-[24px]"/>
                    </div>
                    <div className="flex flex-col justify-center items-start">
                        <p className="text-black text-sm font-medium m-0">Premium Tools</p>
                        <p className="text-[#cccccc] text-xs m-0">{numberOfProduct}+ Products</p>
                    </div>
                </div>
            </div>

            </div>


        </div>
    );
}
export default Header;