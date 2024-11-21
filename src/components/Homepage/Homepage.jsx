import React from 'react';
import AuthForm from '../AuthForm/AuthForm';
import Header from '../Header/Header';
import ServisesCard from '../servicesCard/servicesCard';
import DoctorCard from '../doctorCard/doctorCard';
import Review from '../Review/Review';
import MailForm from '../MailForm/MailForm';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faXmark } from '@fortawesome/free-solid-svg-icons';
import mainScreenImg from '/main screen img.png'; // Your image paths

function Homepage({ openFormToggle, closeForm, openVideoPopup, closeVideoPopup }) {
  return (
    <div>
      {/* Authentication Form */}
      <AuthForm isFormOpen={false} formType="login" closeForm={closeForm} setFormType={() => {}} />

      {/* Header */}
      <Header openFormToggle={openFormToggle} />
      
      {/* Main Screen */}
      <div className="mainScreen">
        <img src={mainScreenImg} alt="Main Screen" className="mainScreenImg" />
        <div className="mainScreen_text">
          <div className="title">We Care About Your Dental Health.</div>
          <div className="subtitle">Dental or oral health is concerned with your teeth, gums, and mouth...</div>
          <div className="button_video_con">
            <button onClick={openVideoPopup}>
              <FontAwesomeIcon icon={faPlay} />
              Watch Video
            </button>
            <div id="container">
              <button className="learn-more">
                <span className="circle" aria-hidden="true">
                  <FontAwesomeIcon icon={faPlay} className="playIcon" />
                </span>
                <span className="button-text">Learn More</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Sections like About Us, Services, etc. */}
      {/* Example of Services Cards */}
      <div className="outServicesScreen">
        <div className="title">Our Dental Services</div>
        <div className="cardsContainer">
          {[{ title: 'Teeth Checkup' }, { title: 'Dental Crown' }, { title: 'Teeth Implants' }].map(({ title }, index) => (
            <ServisesCard key={index} title={title} />
          ))}
        </div>
      </div>

      {/* Doctors */}
      <div className="ourDoctorsScreen">
        <div className="title">Our Doctors</div>
        <div className="doctorsCardsCon">
          {[{ name: 'Dr. John', position: 'Dental Crown' }].map(({ name, position }, index) => (
            <DoctorCard key={index} name={name} position={position} />
          ))}
        </div>
      </div>

      {/* Reviews */}
      <Review reviewerImg="/review img 1.png" />
      
      {/* Mail Form */}
      <MailForm />
      
      {/* Video Popup */}
      <div className="videoPopupCon" style={{ display: openVideoPopup ? "flex" : "none" }}>
        <div className="videoPopup">
          <FontAwesomeIcon icon={faXmark} id="closeVideo" onClick={closeVideoPopup} />
          <h3>Watch Video</h3>
          <iframe width="560" height="315" src="https://www.youtube.com/embed/-hVy_jxeMeA" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
