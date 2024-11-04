import './App.css';
import Header from './components/Header/Header';
import mainScreenImg from '/main screen img.png';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
library.add(faPlay);
import abousUsimg from '/about us screen img.png';
import teethSvg from './assets/teeth.svg';
import moneySvg from './assets/money.svg';
import ServisesCard from './components/servicesCard/servicesCard'

function App() {
  return (
    <>
      <div className="wrap">
        <Header />
        <div className="mainScreen">
          <div className="mainScreenDecoration"></div>
          <img src={mainScreenImg} alt="mainScreenImg" className="mainScreenImg" />
          <div className="mainScreen_text">
            <div className="title">
              We Care About Your <br /> Dental Health.
            </div>
            <div className="subtitle">
              Dental or oral health is concerned with your teeth, gums, and mouth. A healthy mouth is free of infections, injuries, and other problems.
            </div>
            <div className="button_video_con">
              <div className="mainScreen_btn">Appointment</div>
              <div id="container">
                <button className="learn-more">
                <span className="circle" aria-hidden="true">
                  <FontAwesomeIcon icon={faPlay} className='playIcon' />
                </span>
                <span className="button-text">Watch Video</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="aboutUsScreen">

          <img src={abousUsimg} alt="abousUsimg" className="abousUsimg" />

          <div className="aboutUs_text">
            <div className="beforeTitle">About Us</div>
            <div className="title">
            Best Dental Clinic You Can Trust.
            </div>
            <div className="subtitle">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Molesed erat tortor quis. Enim id lobortis massa egestas tortor ac ultrices semper. 
            </div>
            <div className="advantageCon" id='teethAdvantageCon'>
              <div className="advantageIcon" id='teethIcon'>
                <img src={teethSvg} alt="teethSvg" className="teethSvg" />
              </div>
              <div className="advantageText">
                <div className="advantageTitle">Complete Dental Care</div>
                <div className="advantageSubtitle">Lorem ipsum dolor sit amet, consect
                etur adipiscing elit cursus.  </div>
              </div>
            </div>

            <div className="advantageCon" id='moneyAdvantageCon'>
              <div className="advantageIcon" id='moneyIcon'>
                <img src={moneySvg} alt="moneySvg" className="moneySvg" />
              </div>
              <div className="advantageText">
                <div className="advantageTitle">Affordable Price</div>
                <div className="advantageSubtitle">Lorem ipsum dolor sit amet, consect
                etur adipiscing elit cursus.  </div>
              </div>
            </div>
          </div>

        </div>
        <div className="outServicesScreen">
          <div className="title">Our Dental Services</div>
          <div className="subtitle">​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​Dental or oral health is concerned with your teeth, gums and mouth. healthy mouth, free of infections, injuries and other problems with</div>
          <div className="cardsContainer">
          {['Teeth Checkup', 'Dental Crown', 'Teeth Implants'].map((title, index) => (
            <ServisesCard key={index} title={title} />
          ))}
          </div>
          
        </div>
      </div>
    </>
  );
}

export default App;
