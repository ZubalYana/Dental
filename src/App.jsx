import './App.css';
import Header from './components/Header/Header';
import mainScreenImg from '/main screen img.png';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import abousUsimg from '/about us screen img.png';
library.add(faPlay);

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
          </div>

        </div>
      </div>
    </>
  );
}

export default App;
