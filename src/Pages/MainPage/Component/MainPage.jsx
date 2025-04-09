import { useRef } from "react";
import NavBar from "./NavBar.jsx";
import Home from "./Home.jsx";
import Service from "./Service.jsx";
import Product from "./Product.jsx";
import AboutUs from "./AboutUs.jsx";
import Contact from "./Contact.jsx";

function MainPage() {
    const homeRef = useRef(null);
    const serviceRef = useRef(null);
    const productsRef = useRef(null);
    const aboutRef = useRef(null);
    const contactRef = useRef(null);

    const scrollToSection = (section) => {
        if (section === "home") homeRef.current.scrollIntoView({ behavior: "smooth" });
        if (section === "service") serviceRef.current.scrollIntoView({ behavior: "smooth" });
        if (section === "products") productsRef.current.scrollIntoView({ behavior: "smooth" });
        if (section === "about-us") aboutRef.current.scrollIntoView({ behavior: "smooth" });
        if (section === "contact") contactRef.current.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <>
            <NavBar scrollToSection={scrollToSection} />
            <div ref={homeRef}><Home scrollToService={() => scrollToSection("service")} /></div>
            <div ref={serviceRef}><Service /></div>
            <div ref={productsRef}><Product /></div>
            <div ref={aboutRef}><AboutUs scrollToContact={() => scrollToSection("contact")} /></div>
            <div ref={contactRef}><Contact scrollToSection={scrollToSection} /></div>
        </>
    );
}

export default MainPage;
