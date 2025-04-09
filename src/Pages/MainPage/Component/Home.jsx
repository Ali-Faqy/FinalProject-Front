import style from "/src/Pages/MainPage/Style/Home.module.css";
import image from "/src/assets/image2.png";
import {Link} from 'react-router-dom'

function Home({scrollToService}) {
  return (
    <div className={style.home} >
        <div className={style.part1}>
            <h1>The Role of Technology <br></br>in Revolutionizing Agriculture <br></br>Revolutionizing</h1>
            <p>Li Europan lingues es membres del sam familie. Lor separat existentie es<br></br>un myth. Por scientie, musica, sport etc, litot Europa usa li sam vocabular.</p>
            <div className={style.buttons}>
                <Link to='/signIn'><button className={style.startBtn}>Get Started</button></Link>
                <button className={style.learnBtn} onClick={scrollToService}>Learn More</button>
            </div>
        </div>
        <div className={style.part2}>
          <div className={style.about}>
            <h1>Our Passion for<br></br> Agriculture <br></br> Nurturing <br></br> Growth and <br></br> Sustaining the <br></br> Future</h1>
            <p>Li Europan lingues es membres del sam familie. Lor separat existentie es un myth.<br></br>Por scientie, musica, sport etc, litot Europa usa li sam vocabular.</p>
            <Link to='/signIn'><button className={style.startBtn}>Get Started</button></Link>
          </div>
          <div className={style.about1}>
            <img src={image} className={style.img} alt="#"></img>
            <p className={style.caption}>Powered bu AI<br></br>for Smarter<br></br>Choices</p>
          </div>
        </div>
    </div>
  );
}
export default Home;