import React from 'react';
import './AdminHeader.css';
import logoSvg from '../../assets/logo.svg';

export default function AdminHeader({ setCurrentScreen }) {
  return (
    <header className="adminHeader">
      <div className="logo">
        <img src={logoSvg} alt="logo" className="logoSvg" />
        Dental Admin
      </div>
      <ul className="nav">
        <li
          className="nav_item"
          id="feedback_li"
          onClick={() => setCurrentScreen('feedback')}
        >
          Feedback<div className="animatedLine"></div>
        </li>
        <li
          className="nav_item"
          id="users_li"
          onClick={() => setCurrentScreen('users')}
        >
          Users<div className="animatedLine"></div>
        </li>
        <li
          className="nav_item"
          id="doctors_li"
          onClick={() => setCurrentScreen('doctors')}
        >
          Doctors<div className="animatedLine"></div>
        </li>
        <li
          className="nav_item"
          id="newsletter_li"
          onClick={() => setCurrentScreen('newsletter')}
        >
          NewsLetter<div className="animatedLine"></div>
        </li>
        <li
          className="nav_item"
          id="appointments_li"
          onClick={() => setCurrentScreen('appointments')}
        >
          Appointments<div className="animatedLine"></div>
        </li>
      </ul>
    </header>
  );
}
