import React from "react";
import "./servicesCard.css";
import arrowRightSvg from "../../assets/arrowRight.svg";

const ServicesCard = (props) => {
    return (
        <div className="servicesCard">
            <div className="servicesCard_img">
                <img src={props.img} alt="" />
            </div>
            <div className="servicesCard_text">
                <h3>{props.title}</h3>
                <p>​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​Dental or oral health is concerned with your teeth, gums and mouth. healthy mouth, free of infections. </p>
            </div>
            <div className="readMore">
                <div className="buttonText">Read More <div className="readMore_underline"></div></div>
                <img src={arrowRightSvg} alt="" />
            </div>
        </div>
    )
}

export default ServicesCard