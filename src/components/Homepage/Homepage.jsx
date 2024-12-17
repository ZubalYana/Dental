import React, { useState, useRef, useEffect } from 'react';
import "../../App.css"; 
import axios from "axios";
import AuthForm from '../AuthForm/AuthForm';
import Header from '../Header/Header';
import ServicesCard from '../servicesCard/servicesCard';
import DoctorCard from '../doctorCard/DoctorCard';
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
import Feedback from '../Feedback/Feedback'
import mainScreenImg from '/main screen img.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faXmark } from '@fortawesome/free-solid-svg-icons';
import ReviewsSlider from '../ReviewsSlider/ReviewsSlider';
import AppointmentForm from '../AppointmentForm/AppointmentForm';
function Homepage() {
  // State for video popup, form, and scrolling
  const [isVideoPopupOpen, setVideoPopupOpen] = useState(false);
  const [isFormOpen, setFormOpen] = useState(false);
  const [formType, setFormType] = useState('login');
  const [feedbacks, setFeedbacks] = useState([]);
  const [isFeedbackOpen, setFeedbackOpen] = useState(false);
  const openFeedbackPopup = () => setFeedbackOpen(true);
  const closeFeedbackPopup = () => setFeedbackOpen(false);
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
  useEffect(() => {
    axios.get('http://localhost:3000/api/feedbacks').then(res => { 
      setFeedbacks(res.data)
    })
  }, [])
  console.log(feedbacks)

  //numbers animation
  const statsRef = useRef(null);
  const [startAnimation, setStartAnimation] = useState(false);
  const stats = [
    { id: 1, value: 20, description: 'Course Published' },
    { id: 2, value: 120, description: 'Qualified Staff' },
    { id: 3, value: 550, description: 'Happy Patients' },
    { id: 4, value: 20, description: 'Years Of Experience' },
  ];
  const [currentValues, setCurrentValues] = useState(stats.map(() => 0));
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStartAnimation(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (startAnimation) {
      stats.forEach((stat, index) => {
        const increment = Math.ceil(stat.value / 100);
        let current = 0;

        const interval = setInterval(() => {
          current += increment;
          if (current >= stat.value) {
            current = stat.value;
            clearInterval(interval);
          }
          setCurrentValues((prev) => {
            const newValues = [...prev];
            newValues[index] = current;
            return newValues;
          });
        }, 30);
      });
    }
  }, [startAnimation]);


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
      <div className="statisticScreen" ref={statsRef}>
      {stats.map((stat, index) => (
        <div className="statisticEl" key={stat.id}>
          <div className="statisticNumber">{currentValues[index]}</div>
          <div className="statisticDescription">{stat.description}</div>
        </div>
      ))}
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
      <div className="makeAnAppointmentScreen" id="makeAnAppointmentScreen">
      <div className="title">Make An Appointment</div>
      <div className="subtitle">
        Dental or oral health is concerned with your teeth, gums and mouth. healthy mouth free of infections, injuries and other problems with.
      </div>
      <AppointmentForm />
    </div>

      {/* Reviews */}
      <div className="reviewScreen">
  <div className="title">What Our Clients Say</div>
  <div className="subtitle">
    We believe that focus and our associated programs are most instrumental in reducing readmissions and managing.
  </div>
  <div className="reviewCardsContainer">
    <ReviewsSlider />
  </div>
  <div className="giveFeedbackBtn" onClick={openFeedbackPopup}><span className='plus'>+</span> Leave my review</div>
      </div>

      {/* Feedback popup */}
      <div className="feedbackPopupCon" style={{ display: isFeedbackOpen ? 'flex' : 'none' }}>
        <div className="feedbackPopup">
          <FontAwesomeIcon icon={faXmark} id="closeFeedback" onClick={closeFeedbackPopup} />
          <Feedback />
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
