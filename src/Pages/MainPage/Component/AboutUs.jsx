import Style from "/src/Pages/MainPage/Style/AboutUs.module.css";
import Experience from "/src/assets/Experience.png";
import Product from "/src/assets/Product.png";
import check from "/src/assets/check.png";
import member from "/src/assets/member.png";
import Ellipse from "/src/assets/Ellipse.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import React, {useState} from 'react';
import AliImage from "/src/assets/AliImage.jpg";
import NoImage from "/src/assets/NoImage.jpg";
import {Link} from 'react-router-dom'

function AboutUs({scrollToContact}){
    const owners = [
        { name: "Ali Faqy", specialty: "Computer Engineering", aboutIt: "He studies at BZU University", image: AliImage },
        { name: "Amer Daghlis", specialty: "Software Engineering", aboutIt: "He studies at BZU University", image: NoImage },
        { name: "Tasnim Ayed", specialty: "Software Engineering", aboutIt: "She studies at BZU University", image: NoImage }
    ];
    
    const [index, setIndex] = useState(0);

    const nextOwner = () => {
        setIndex((prevIndex) => (prevIndex + 1) % owners.length);
    };

    const prevOwner = () => {
        setIndex((prevIndex) => (prevIndex - 1 + owners.length) % owners.length);
    };

    return (
        <div className={Style.container}>
            <div className={Style.aboutUs}>
                <div className={Style.part1}>
                    <h1>The Benefits<br></br>of Choosing<br></br>Our Expertise</h1>
                    <p>Li Europan lingues es membres del sam familie.<br></br>Lor separat existentie es un myth. Por scientie,<br></br>musica, sport etc, litot Europa usa li sam vocabular.</p>
                    <Link to='/signIn'><button className={Style.learnMoreBtn} onClick={scrollToContact}>Learn More <i className="fas fa-arrow-right"></i></button></Link>
                    
                </div>
                <div className={Style.part2}>
                    <div className={Style.card}>
                        <div className={Style.image}>
                            <img src={Experience} alt="Experience"></img>
                            <img src={Product} alt="Product"></img>
                            <div className={Style.ellipseContainer}>
                                <img src={Ellipse} alt="Ellipse" className={Style.ellipse} />
                                <img src={check} alt="check" className={Style.check} />
                            </div>
                            <img src={member} alt="member"></img>
                        </div>
                        <div className={Style.text}>
                            <div className={Style.experience}>
                                <h1>15+</h1>
                                <p>Years of Experience</p>
                            </div>
                            <div className={Style.product}>
                                <h1>70+</h1>
                                <p>Product</p>
                            </div>
                            <div className={Style.client}>
                                <h1>2,568+</h1>
                                <p>Satisfied Clients</p>
                            </div>
                            <div className={Style.member}>
                                <h1>20</h1>
                                <p>Local Team Members</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={Style.owners}>
            <h1>Who are the owners</h1>
            <div className={Style.owner}>
                <button className={Style.previous} onClick={prevOwner}><FontAwesomeIcon icon={faArrowLeft} /></button>
                <div>
                    <img className={Style.ownerImage} src={owners[index].image}></img>
                    <div className={Style.ownerInfo}>
                        <h1>{owners[index].name}</h1>
                        <p>{owners[index].specialty}</p>
                        <p>{owners[index].aboutIt}</p>
                    </div>
                </div>
                <button className={Style.next} onClick={nextOwner}><FontAwesomeIcon icon={faArrowRight} /></button>
            </div>
            </div>
        </div>
    )
}
export default AboutUs;