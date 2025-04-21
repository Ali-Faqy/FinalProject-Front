import Navication from "./Navication.jsx";
import Header from "./Header.jsx";
import ProductBody from "./ProductBody.jsx";
import CategoryBody from "./CategoryBody.jsx";
import SocialMedia from "./SocialMedia.jsx";
import Contact from "../../MainPage/Component/Contact.jsx";

function HomePage() {
    const userId = localStorage.getItem("userId");
    if (!userId) {
        <Link to="/signIn"></Link>
    }
  return (
    <div className="bg-[#f8f5f0] h-screen w-screen">
        <Navication/>
        <Header />
        <ProductBody/>
        <CategoryBody/>
        <SocialMedia/>
        <Contact/>
    </div>
    );
}
export default HomePage;