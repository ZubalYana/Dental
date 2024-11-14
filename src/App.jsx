import './App.css';
import './Responsive.css'
import { useState, useEffect, useRef } from 'react';
import Header from './components/Header/Header';
import mainScreenImg from '/main screen img.png';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
library.add(faPlay);
import abousUsimg from '/about us screen img.png';
import teethSvg from './assets/teeth.svg';
import moneySvg from './assets/money.svg';
import ServisesCard from './components/servicesCard/servicesCard';
import teethGlassSvg from './assets/teethGlass.svg';
import teethNailSvg from './assets/teethNail.svg';
import teethShieldSvg from './assets/teethShield.svg';
import DoctorCard from './components/doctorCard/doctorCard'; 
import doctor1 from '/doctor 1.png';
import doctor2 from '/doctor 2.png';
import doctor3 from '/doctor 3.png';
import stepsImg from '/easy steps img.png';
import makeAnAppointmentImg from '/make an appointment img.png'
import Review from './components/Review/Review';
import reviewerImg1 from '/review img 1.png';
import reviewerImg2 from '/review img 2.png';
import reviewerImg3 from '/review img 3.png';
import MailForm from './components/MailForm/MailForm';
import AuthForm from './components/AuthForm/AuthForm';
function App() {
  //numbers animation
  const [statsInView, setStatsInView] = useState(false);
  const statsRef = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsInView(true);
          observer.disconnect(); 
        }
      },
      { threshold: 0.5 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current);
      }
    };
  }, []);
  const animateCount = (target) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (statsInView) {
        let start = 0;
        const duration = 1000;
        const step = Math.ceil((target / duration) * 10);

        const counter = setInterval(() => {
          start += step;
          if (start >= target) {
            start = target;
            clearInterval(counter);
          }
          setCount(start);
        }, 10);
      }
    }, [statsInView, target]);

    return count;
  };

  //auth form 
  const [isFormOpen, setFormOpen] = useState(false);
  const [formType, setFormType] = useState('login');
  const openFormToggle = (type) => {
    setFormType(type);
    setFormOpen(true);
  };
  const closeForm = () => {
    setFormOpen(false);
  };


  return (
    <>
      <div className="wrap">
        <div className="videoPopupCon">
          <div className="videoPopup">
          <iframe width="560" height="315" src="https://www.youtube.com/embed/-hVy_jxeMeA?si=28y5iH8RwhMjgq1f" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
          </div>
        </div>
      <AuthForm 
        isFormOpen={isFormOpen} 
        formType={formType} 
        closeForm={closeForm} 
        setFormType={setFormType}
      />
        <Header openFormToggle={openFormToggle} />
        <div className="mainScreen">
          <div className="mainScreenDecoration"></div>
          <img src={mainScreenImg} alt="mainScreenImg" className="mainScreenImg" data-aos="fade-up-left" />
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
                    <FontAwesomeIcon icon={faPlay} className="playIcon" />
                  </span>
                  <span className="button-text">Watch Video</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="aboutUsScreen">
          <img src={abousUsimg} alt="abousUsimg" className="abousUsimg" data-aos="fade-down-right" />
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
        <div ref={statsRef} className="statisticScreen">
          <div className="statisticEl">
            <div className="statisticNumber">{animateCount(20)}</div>
            <div className="statisticDescription">Course Published</div>
          </div>
          <div className="statisticEl">
            <div className="statisticNumber">{animateCount(120)}</div>
            <div className="statisticDescription">Qualified Staff</div>
          </div>
          <div className="statisticEl">
            <div className="statisticNumber">{animateCount(550)}</div>
            <div className="statisticDescription">Happy Patient</div>
          </div>
          <div className="statisticEl">
            <div className="statisticNumber">{animateCount(20)}</div>
            <div className="statisticDescription">Years Of Experience</div>
          </div>
        </div>
        <div className="stepsScreen">
          <div className="steps_textCon">
            <div className="title">Easy Steps</div>
            <div className="subtitle">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.</div>

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
          <img src={stepsImg} alt="stepsImg" className="stepsImg" />
        </div>
        <div className="makeAnAppointmentScreen">
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
        <div className="reviewsScreen">
          <div className="title">Reviews From Our Patient.</div>
          <div className="subtitle">We believe that focus and our associated programs are most instrumental in reducing readmissions and managing. </div>
          <div className="reviewsCon">
          {[
              { img: reviewerImg1, name: "Andrew Smith ", text: "Lorem ipsum dolor sit amet, consec adipis. Cursus ultricies sit sit ultricies sit sit dolo", rate:4  },
              { img: reviewerImg2, name: "Andrew Smith ", text: "Lorem ipsum dolor sit amet, consec adipis. Cursus ultricies sit sit ultricies sit sit dolo", rate:5  },
              { img: reviewerImg3, name: "Andrew Smith ", text: "Lorem ipsum dolor sit amet, consec adipis. Cursus ultricies sit sit ultricies sit sit dolo", rate:5  },
            ].map(({ img, name, text, rate }, index) => (
              <Review key={index} img={img} name={name} text={text} rate={rate} />
            ))}
          </div>
        </div>
        <div className="newsLetter">
        <MailForm/>
        </div>
        <div className="copyright">Copyright © 2020 All rights Reserved - Dental</div>
      </div>
    </>
  );
}

export default App;
