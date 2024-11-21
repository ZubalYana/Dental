import './App.css';
import './Responsive.css'
import { useState, useEffect, useRef } from 'react';
import Header from './components/Header/Header';
import mainScreenImg from '/main screen img.png';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
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
import Homepage from './components/Homepage/Homepage';
import AdminPanel from './components/AdminPanel/AdminPanel';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
function App() {
  // State for video popup, form, and scrolling
  const [isVideoPopupOpen, setVideoPopupOpen] = useState(false);
  const [isFormOpen, setFormOpen] = useState(false);
  const [formType, setFormType] = useState('login');
  const makeAnAppointmentRef = useRef(null);

  // Scroll functionality
  const scrollToAppointment = () => {
    makeAnAppointmentRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
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
    <Router>
      <Routes>
        {/* Homepage Route */}
        <Route path="/" element={<Homepage openFormToggle={openFormToggle} closeForm={closeForm} openVideoPopup={openVideoPopup} closeVideoPopup={closeVideoPopup} />} />
        
        {/* Admin Panel Route */}
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </Router>
  );
}

export default App;