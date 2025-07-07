import Navication from "./Navication.jsx";
import Header from "./Header.jsx";
import ProductBody from "./ProductBody.jsx";
import CategoryBody from "./CategoryBody.jsx";
import SocialMedia from "./SocialMedia.jsx";
import ContactUs from "./ContactUs.jsx";

function HomePage() {
    const userId = localStorage.getItem("userId");
    if (!userId) {
        <Link to="/signIn"></Link>
    }
  return (
    <div className="h-screen w-screen">
        <Navication/>
        <Header />
        <ProductBody/>
        <CategoryBody/>
        <SocialMedia/>
        <ContactUs/>
    </div>
    );
}
export default HomePage;