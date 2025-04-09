import logo from "/src/assets/StoreLogo.png";
import style from "/src/Pages/MainPage/Style/NavBar.module.css";
import {Link} from 'react-router-dom'
function NavBar({scrollToSection}){
     return(
        <>
            <div className={style.navBar}>
                <a href="" className={style.logo}> Maeadati <img src={logo} className={style.logoImg} alt="Maeadati Logo"></img> </a>
                    <nav className={style.navigation}>
                    <button className={style.navItem} onClick={() => scrollToSection("home")}>Home</button>
                    <button className={style.navItem} onClick={() => scrollToSection("service")}>Service</button>
                    <button className={style.navItem} onClick={() => scrollToSection("products")}>Products</button>
                    <button className={style.navItem} onClick={() => scrollToSection("about-us")}>About Us</button>
                    <button className={style.navItem} onClick={() => scrollToSection("contact")}>Contact</button>
                    </nav>

                <div className={style.buttonContainer}>
                    <Link to='/signIn'><button className={style.login}>Login</button></Link>
                    <Link to='/signUp'><button className={style.signup}>Sign Up</button></Link>
                </div>
            </div>
        </>
     );
}
export default NavBar;