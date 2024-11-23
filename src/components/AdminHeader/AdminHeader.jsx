import React from 'react'
import './AdminHeader.css'
import logoSvg from '../../assets/logo.svg'
export default function AdminHeader() {
  return (
    <>
    <header className='adminHeader'>
    <div className="logo">
        <img src={logoSvg} alt="logo" className="logoSvg"/>
        Dental Admin
    </div>
    <li className='nav'>
        <li className='nav_item' id='feedback_li'>Feedback<div className="animatedLine"></div></li>
        <li className='nav_item' id='doctors_li'>Doctors<div className="animatedLine"></div></li>
        <li className='nav_item' id='newsletter_li'>NewsLetter<div className="animatedLine"></div></li>
        <li className='nav_item' id='appointments_li'>Appointments<div className="animatedLine"></div></li>
    </li>
    </header>

    </>
  )
}
