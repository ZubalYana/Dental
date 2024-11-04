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
import teethGlassSvg from './assets/teethGlass.svg'
import teethNailSvg from './assets/teethNail.svg'
import teethShieldSvg from './assets/teethShield.svg'
import DoctorCard from './components/doctorCard/doctorCard' 
import doctor1 from '/doctor 1.png'
import doctor2 from '/doctor 2.png'
import doctor3 from '/doctor 3.png'
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
          {[
            { title: 'Teeth Checkup', icon: teethGlassSvg },
            { title: 'Dental Crown', icon: teethNailSvg },
            { title: 'Teeth Implants', icon: teethShieldSvg },
          ].map(({ title, icon }, index) => (
            <ServisesCard key={index} title={title} img={icon} />
          ))}
          </div>
          
        </div>
        <div className="ourDoctorsScreen">
          <div className="beforeTitle">Our Doctors</div>
          <div className="title">Team Of Professionals</div>
          <div className="subtitle">​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​Dental or oral health is concerned with your teeth, gums and mouth. healthy mouth free of infections, injuries and other problems with.</div>
          <div className="doctorsCardsCon">
          {[
            { img: doctor1, name: 'Dr.Rana Roy', position: 'Dental Crown' },
            { img: doctor2, name: 'Dr.John Roy', position: 'Teeth Checkup' },
            { img: doctor3, name: 'Dr.Michel Roy', position: 'Teeth Implants' },
          ].map(({ img, name, position }, index) => (
            <DoctorCard key={index} name={name} img={img} position={position} />
          ))}
          </div>
        </div>
        <div className="statisticScreen">
          <div className="statisticEl">
            <div className="statisticNumber">20</div>
            <div className="statisticDescription">Course Published</div>
          </div>
          <div className="statisticEl">
            <div className="statisticNumber">120</div>
            <div className="statisticDescription">Qualified Staff</div>
          </div>
          <div className="statisticEl">
            <div className="statisticNumber">550</div>
            <div className="statisticDescription">Happy Patient</div>
          </div>
          <div className="statisticEl">
            <div className="statisticNumber">20</div>
            <div className="statisticDescription">Years Of Experience</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
