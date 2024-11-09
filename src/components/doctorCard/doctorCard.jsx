import React from "react";
import './doctorCard.css'
import stethoscopeSvg from '../../assets/stethoscope.svg'
const DoctorCard = (props) => {
    return (
        <div className="doctorCard" data-aos="flip-right" data-aos-duration="1200">
            <div className="doctorCard_imgCon">
                <img src={props.img} alt="teethImg" className="doctorCard_img" />
            </div>
            <div className="doctorCard_text">
                <img src={stethoscopeSvg} alt="stethoscope" className="stethoscopeSvg" />
                <div className="doctorInfoCon">
                <h4 className="doctorName">{props.name}</h4>
                <p className="possition">{props.position}</p>
                </div>
            </div>
        </div>
    )
}

export default DoctorCard