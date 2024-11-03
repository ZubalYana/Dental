import './App.css';
import Header from './components/Header/Header';
import mainScreenImg from '/main screen img.png';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
      </div>
    </>
  );
}

export default App;
