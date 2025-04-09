import Style from "/src/Pages/MainPage/Style/Product.module.css";
import image6 from "/src/assets/image6.png";
import image7 from "/src/assets/image7.png";
import image8 from "/src/assets/image8.png";
import image9 from "/src/assets/image9.png";


function Product(){
    return(
        <div className={Style.product}>
                <h1>Our Featured Product</h1>
                <p>Discover our selection of premium organic products, harvested and prepared with care</p>
                <div className={Style.productsBox}>
                    <div className={Style.productBox}>
                        <img src={image6} alt="Tractor"/><br></br><br></br>
                        <h2>Tractor</h2><br></br>
                        <p>Li Europan lingues es membres del sam familie. Lor separat existentie es un myth.</p>
                        </div>
                    <div className={Style.productBox}>
                    <img src={image7} alt="Tillage"/><br></br><br></br>
                    <h2>Tillage</h2><br></br>
                    <p>Li Europan lingues es membres del sam familie. Lor separat existentie es un myth.</p>
                    </div>
                    <div className={Style.productBox}>
                    <img src={image8} alt="Aeration"/><br></br><br></br>
                    <h2>Aeration</h2><br></br>
                    <p>Li Europan lingues es membres del sam familie. Lor separat existentie es un myth.</p>
                    </div>
                    <div className={Style.productBox}>
                    <img src={image9} alt="Orchard Cap"/><br></br><br></br>
                    <h2>Orchard Cap</h2><br></br>
                    <p>Li Europan lingues es membres del sam familie. Lor separat existentie es un myth.</p>
                    </div>
                </div>
                <h4>View All Products</h4>
            </div>
    )
}
export default Product;