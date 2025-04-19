import Navication from "./Navication.jsx";
import Header from "./Header.jsx";
import ProductBody from "./ProductBody.jsx";
import CategoryBody from "./CategoryBody.jsx";
import SocialMedia from "./SocialMedia.jsx";
import Contact from "../../MainPage/Component/Contact.jsx";
import { useLocation } from "react-router-dom";

function HomePage() {
  const location = useLocation();
  const userId = location.state?.userId;
  return (
    <div className="bg-[#f8f5f0] h-screen w-screen">
        <Navication userId={userId}/>
        <Header />
        <ProductBody userId={userId}/>
        <CategoryBody userId={userId}/>
        <SocialMedia userId={userId}/>
        <Contact userId={userId}/>
    </div>
    );
}
export default HomePage;