import React from "react";
import "./servicesCard.css";
import arrowRightSvg from "../../assets/arrowRight.svg";

const ServicesCard = (props) => {
    return (
        <div className="servicesCard" data-aos="flip-right" data-aos-duration="1200">
            <div className="servicesCard_img">
                <img src={props.img} alt="teethImg" className="servicesCard_img" />
            </div>
            <div className="servicesCard_text">
                <h3>{props.title}</h3>
                <p>​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​Dental or oral health is concerned with your teeth, gums and mouth. healthy mouth, free of infections. </p>
            </div>
            <div className="readMore">
                <div className="buttonText">Read More <img src={arrowRightSvg} alt="" />
                </div>
                <div className="readMore_underline"></div>
            </div>
        </div>
    )
}

export default ServicesCard