import Style from "/src/Pages/MainPage/Style/Contact.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faTwitter, faInstagram, faYoutube } from "@fortawesome/free-brands-svg-icons";

function Contact({ scrollToSection }) {
    return (
        <>
            <div className={Style.Contact}>
                <div className={Style.part1}>
                    <div className={Style.part11}>
                        <h1>Maeadati</h1>
                        <p>Providing high-quality agricultural equipment to support farmers<br></br>since 1998.</p>
                    </div>
                    <div className={Style.part12}>
                        <button className={Style.facebook}>
                            <FontAwesomeIcon icon={faFacebookF} style={{ color: "#1877F2", fontSize: "24px" }} />
                        </button>
                        <button className={Style.twitter}>
                            <FontAwesomeIcon icon={faTwitter} style={{ color: "#1DA1F2", fontSize: "24px" }} />
                        </button>
                        <button className={Style.instagram}>
                            <FontAwesomeIcon icon={faInstagram} style={{ color: "#E1306C", fontSize: "24px" }} />
                        </button>
                        <button className={Style.youtube}>
                            <FontAwesomeIcon icon={faYoutube} style={{ color: "#FF0000", fontSize: "24px" }} />
                        </button>
                    </div>
                    <div className={Style.part13}>
                        <h1>Contact Info</h1>
                        <p>PO Box 14, Birzeit<br></br>West Bank, Palestine</p>
                        <p>info@Maeadati.com</p>
                        <p>(+972) 59-9999999</p>
                        <p>Saturday - Thursday: 8am - 6pm</p>
                        <p>Friday: 9am - 4pm</p>
                    </div>
                </div>
                <div className={Style.part2}>
                    <div className={Style.part21}>
                        <h1>Quick Links</h1>
                        <ul>
                            <li onClick={() => scrollToSection("home")}>Home</li>
                            <li onClick={() => scrollToSection("service")}>Service</li>
                            <li onClick={() => scrollToSection("products")}>Product</li>
                            <li onClick={() => scrollToSection("about-us")}>About Us</li>
                            <li onClick={() => scrollToSection("contact")}>Contact</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className={Style.footer}>
                <hr style={{ margin: "20px 0", border: "1px solid #ccc" }} />
                <div style={{ textAlign: "center", fontSize: "14px", color: "#" }}>
                    <p>© {new Date().getFullYear()} Maeadati. All rights reserved.</p>
                </div>
            </div>
        </>
    );
}

export default Contact;
