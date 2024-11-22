import React, { useState, useRef } from 'react';
import "../../App.css"; 
import AuthForm from '../AuthForm/AuthForm';
import Header from '../Header/Header';
import ServicesCard from '../servicesCard/servicesCard';
import DoctorCard from '../doctorCard/doctorCard';
import Review from '../Review/Review';
import MailForm from '../MailForm/MailForm';
import aboutUsImg from '/about us screen img.png';
import teethSvg from '../../assets/teeth.svg';
import moneySvg from '../../assets/money.svg';
import teethGlassSvg from '../../assets/teethGlass.svg';
import teethNailSvg from '../../assets/teethNail.svg';
import teethShieldSvg from '../../assets/teethShield.svg';
import doctor1 from '/doctor 1.png';
import doctor2 from '/doctor 2.png';
import doctor3 from '/doctor 3.png';
import stepsImg from '/easy steps img.png';
import makeAnAppointmentImg from '/make an appointment img.png';
import reviewerImg1 from '/review img 1.png';
import reviewerImg2 from '/review img 2.png';
import reviewerImg3 from '/review img 3.png';
import mainScreenImg from '/main screen img.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faXmark } from '@fortawesome/free-solid-svg-icons';

function Homepage() {
  // State for video popup, form, and scrolling
  const [isVideoPopupOpen, setVideoPopupOpen] = useState(false);
  const [isFormOpen, setFormOpen] = useState(false);
  const [formType, setFormType] = useState('login');
  const makeAnAppointmentRef = useRef(null);

  // Scroll functionality
  const scrollToAppointment = () => {
    makeAnAppointmentRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  // Open and close auth form
  const openFormToggle = (type) => {
    setFormType(type);
    setFormOpen(true);
  };
  const closeForm = () => setFormOpen(false);

  // Open and close video popup
  const openVideoPopup = () => setVideoPopupOpen(true);
  const closeVideoPopup = () => setVideoPopupOpen(false);

  return (
    <div>
      {/* Video Popup */}
      <div className="videoPopupCon" style={{ display: isVideoPopupOpen ? 'flex' : 'none' }}>
        <div className="videoPopup">
          <FontAwesomeIcon icon={faXmark} id="closeVideo" onClick={closeVideoPopup} />
          <h3>Watch Video</h3>
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/-hVy_jxeMeA?si=28y5iH8RwhMjgq1f"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      </div>

      {/* AuthForm Component */}
      <AuthForm isFormOpen={isFormOpen} formType={formType} closeForm={closeForm} setFormType={setFormType} />

      {/* Header */}
      <Header openFormToggle={openFormToggle} />

      {/* Main Screen */}
      <div className="mainScreen">
        <div className="mainScreenDecoration"></div>
        <img src={mainScreenImg} alt="mainScreenImg" className="mainScreenImg" data-aos="fade-up-left" />
        <div className="mainScreen_text">
          <div className="title">We Care About Your <br /> Dental Health.</div>
          <div className="subtitle">
            Dental or oral health is concerned with your teeth, gums, and mouth. A healthy mouth is free of infections, injuries, and other problems.
          </div>
          <div className="button_video_con">
            <div className="mainScreen_btn" id="mainScreen_btn" onClick={scrollToAppointment}>
              Appointment
            </div>
            <div id="container">
              <button className="learn-more">
                <span className="circle" aria-hidden="true">
                  <FontAwesomeIcon icon={faPlay} className="playIcon" />
                </span>
                <span className="button-text" onClick={openVideoPopup}>
                  Watch Video
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* About Us Section */}
      <div className="aboutUsScreen">
        <img src={aboutUsImg} alt="aboutUsImg" className="aboutUsimg" data-aos="fade-down-right" style={{ width: '470px' }} />
        <div className="aboutUs_text">
          <div className="beforeTitle">About Us</div>
          <div className="title">Best Dental Clinic You Can Trust.</div>
          <div className="subtitle">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Molesed erat tortor quis. Enim id lobortis massa egestas tortor ac ultrices semper.
          </div>
          <div className="advantageCon" id="teethAdvantageCon" data-aos="fade-down-left">
            <div className="advantageIcon" id="teethIcon">
              <img src={teethSvg} alt="teethSvg" className="teethSvg" />
            </div>
            <div className="advantageText">
              <div className="advantageTitle">Complete Dental Care</div>
              <div className="advantageSubtitle">Lorem ipsum dolor sit amet, consect etur adipiscing elit cursus.</div>
            </div>
          </div>
          <div className="advantageCon" id="moneyAdvantageCon" data-aos="fade-down-left">
            <div className="advantageIcon" id="moneyIcon">
              <img src={moneySvg} alt="moneySvg" className="moneySvg" />
            </div>
            <div className="advantageText">
              <div className="advantageTitle">Affordable Price</div>
              <div className="advantageSubtitle">Lorem ipsum dolor sit amet, consect etur adipiscing elit cursus.</div>
            </div>
          </div>
        </div>
      </div>

      {/* Our Services */}
      <div className="outServicesScreen">
        <div className="title">Our Dental Services</div>
        <div className="subtitle">
          Dental or oral health is concerned with your teeth, gums and mouth. A healthy mouth, free of infections, injuries, and other problems.
        </div>
        <div className="cardsContainer">
          {[
            { title: 'Teeth Checkup', icon: teethGlassSvg },
            { title: 'Dental Crown', icon: teethNailSvg },
            { title: 'Teeth Implants', icon: teethShieldSvg },
          ].map(({ title, icon }, index) => (
            <ServicesCard key={index} title={title} img={icon} />
          ))}
        </div>
      </div>

      {/* Our Doctors */}
      <div className="ourDoctorsScreen">
        <div className="beforeTitle">Our Doctors</div>
        <div className="title">Team Of Professionals</div>
        <div className="subtitle">
          Dental or oral health is concerned with your teeth, gums and mouth. A healthy mouth free of infections, injuries and other problems.
        </div>
        <div className="doctorsCardsCon">
          {[
            { img: doctor1, name: 'Dr. Rana Roy', position: 'Dental Crown' },
            { img: doctor2, name: 'Dr. John Roy', position: 'Teeth Checkup' },
            { img: doctor3, name: 'Dr. Michel Roy', position: 'Teeth Implants' },
          ].map(({ img, name, position }, index) => (
            <DoctorCard key={index} name={name} img={img} position={position} />
          ))}
        </div>
      </div>

      {/* Statistics */}
      <div className="statisticScreen">
        <div className="statisticEl">
          <div className="statisticNumber">{20}</div>
          <div className="statisticDescription">Course Published</div>
        </div>
        <div className="statisticEl">
          <div className="statisticNumber">{120}</div>
          <div className="statisticDescription">Qualified Staff</div>
        </div>
        <div className="statisticEl">
          <div className="statisticNumber">{550}</div>
          <div className="statisticDescription">Happy Patients</div>
        </div>
        <div className="statisticEl">
          <div className="statisticNumber">{20}</div>
          <div className="statisticDescription">Years Of Experience</div>
        </div>
      </div>

      {/* Easy Steps */}
      <div className="stepsScreen">
        <div className="steps_textCon">
          <div className="title">Easy Steps</div>
          <div className="subtitle">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </div>
          <div className="step" data-aos="fade-down-right">
              <div className="stepNumber">1</div>
              <div className="stepTextCon">
                <div className="stepTitle">Select Your Doctor</div>
                <div className="stepDescription">Lorem ipsum dolor sit amet,sectetur adipiselit sed temp incididunt ut labore.</div>
              </div>
            </div>

            <div className="step" data-aos="fade-down-right">
              <div className="stepNumber">2</div>
              <div className="stepTextCon">
                <div className="stepTitle">Make an Appoinment</div>
                <div className="stepDescription">Lorem ipsum dolor sit amet,sectetur adipiselit sed temp incididunt ut labore.</div>
              </div>
            </div>

            <div className="step" data-aos="fade-down-right">
              <div className="stepNumber">3</div>
              <div className="stepTextCon">
                <div className="stepTitle">Meet your Doctor</div>
                <div className="stepDescription">Lorem ipsum dolor sit amet,sectetur adipiselit sed temp incididunt ut labore.</div>
              </div>
            </div>
        </div>
        <div className="stepsImgCon">
          <img src={stepsImg} alt="stepsImg" style={{ width: '470px', marginLeft: '30px' }} />
        </div>
      </div>

      {/* Make An Appointment */}
      <div className="makeAnAppointmentScreen" ref={makeAnAppointmentRef} id="makeAnAppointmentScreen">
          <div className="title">Make An Appointment</div>
          <div className="subtitle">​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​Dental or oral health is concerned with your teeth, gums and mouth. healthy mouth free of infections, injuries and other problems with.</div>
          <div className="makeAnAppointment_con">
            <form action="submit">
              <h4>Appointment</h4>
              <div className="inputContainer">
                <input type="text" placeholder="Patient Name" id='name' />
                <select name="gender" id="gender" placeholder="Gender">
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="inputContainer">
              <input type="text" placeholder="Phone number" id='phone' />
              <input type="text" placeholder="Email" id='appointmentEmail' />
              </div>
              <div className="inputContainer">
              <select name="department" id="department">
                <option value="department">Department 1</option>
                <option value="department">Department 2</option>
                <option value="department">Department 3</option>
              </select>
              <input type="date" id="date" placeholder="Date" />
              </div>
              <textarea name="details" id="details" placeholder='More details'></textarea>
              <button type="submit">Send Massage</button>
            </form>
            <img src={makeAnAppointmentImg} alt="makeAnAppointmentImg" className='makeAnAppointmentImg' />
          </div>
        </div>

      {/* Reviews */}
      <div className="reviewScreen">
  <div className="title">What Our Clients Say</div>
  <div className="subtitle">
    We believe that focus and our associated programs are most instrumental in reducing readmissions and managing.
  </div>
  <div className="reviewCardsContainer">
    {[
      { name: 'Andrew Smith', position: 'Patient', img: reviewerImg1, text: 'Best dental clinic experience!', rate: 5 },
      { name: 'Mikie Dave', position: 'Patient', img: reviewerImg2, text: 'Highly recommend this clinic!', rate: 4 },
      { name: 'Barbara Johnson', position: 'Patient', img: reviewerImg3, text: 'Wonderful service and staff!', rate: 5 },
    ].map(({ name, position, img, text }, index) => (
      <Review key={index} name={name} position={position} img={img} text={text} />
    ))}
  </div>
      </div>


      {/* Contact Form */}
      <div className="newsLetter">
        <MailForm />
      </div>

      <div className="copyright">Copyright © 2020 All rights Reserved - Dental</div>
    </div>
  );
}

export default Homepage;
