import React from "react";
import './Header.css'
import logoSvg from '../../assets/logo.svg'
export default function Header() {
    return (
        <header>
            <div className="logo">
                <img src={logoSvg} alt="logo" className="logoSvg"/>
                Dental
            </div>
            <ul className="nav">
                <li className="nav_item">Home <div className="animatedLine"></div></li>
                <li className="nav_item">About <div className="animatedLine"></div></li>
                <li className="nav_item">Blog <div className="animatedLine"></div></li>
                <li className="nav_item">Contact Us <div className="animatedLine"></div></li>
            </ul>
            <div className="burger" id="burger">
                <div className="burger_line"></div>
                <div className="burger_line"></div>
                <div className="burger_line"></div>
            </div>
            <div className="header_buttons">
                <button className="header_btn" id="loginBtn">Login</button>
                <button className="header_btn" id="signUpBtn">Sign Up</button>
            </div>
        </header>
    )
}