import Style from "/src/Pages/MainPage/Style/Service.module.css";
import chatBotImage from "/src/assets/image3.png";
import knowledgmant from "/src/assets/knowledgmant.png";
import image4 from "/src/assets/image4.png";
import image5 from "/src/assets/image5.png";

function Service() {
  return (
    <div className={Style.service}>
        <h1>Our service</h1>
        <p>Li Europan lingues es membres del sam familie.<br></br>Lor separat existentie es un myth Por scientie, musica.</p>
        <div className={Style.servicesBox}>
            <div className={Style.serviceBox}>
                <img src={chatBotImage} alt="Chat Bot"/><br></br><br></br>
                <p>AI Chat Bot</p>
                </div>
            <div className={Style.serviceBox}>
            <img src={knowledgmant} alt="knowledgement"/><br></br><br></br>
            <p>Knowledgement</p>
            </div>
            <div className={Style.serviceBox}>
            <img src={image4} alt="Content Strategy and Consulting"/><br></br><br></br>
            <p>Content Strategy and Consulting</p>
            </div>
            <div className={Style.serviceBox}>
            <img src={image5} alt="Social MediaManagement"/><br></br><br></br>
            <p>Social Media<br></br>Management</p>
            </div>
        </div> 
    </div>
  );
}

export default Service;