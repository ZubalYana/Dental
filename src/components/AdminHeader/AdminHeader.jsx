import React from 'react';
import { NavLink } from 'react-router-dom';
import './AdminHeader.css';
import logoSvg from '../../assets/logo.svg';

export default function AdminHeader() {
  const menuItems = [
    { name: 'Feedback', path: '/feedback' },
    { name: 'Users', path: '/users' },
    { name: 'Doctors', path: '/doctors' },
    { name: 'Newsletter', path: '/newsletter' },
    { name: 'Appointments', path: '/appointments' },
  ];

  return (
    <header className="adminHeader">
      <div className="logo">
        <img src={logoSvg} alt="logo" className="logoSvg" />
        Dental Admin
      </div>
      <ul className="nav">
        {menuItems.map((item, index) => (
          <li key={index} className="nav_item">
            <NavLink
              to={item.path}
              style={({ isActive }) => ({
                textDecoration: 'none',
                color: isActive ? 'blue' : 'black',
              })}
            >
              {item.name}
            </NavLink>
            <div className="animatedLine"></div>
          </li>
        ))}
      </ul>
    </header>
  );
}
