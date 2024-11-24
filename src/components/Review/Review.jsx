import React from "react";
import "./Review.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import defaultUserPic from "/default user picture.png";

library.add(solidStar, regularStar);

const Review = (props) => {
    const { rate, img, name, text } = props;

    const renderStars = () => {
        return Array.from({ length: 5 }, (_, index) => (
            <FontAwesomeIcon
                key={index}
                icon={index < rate ? solidStar : regularStar}
                className="starIcon"
            />
        ));
    };

    return (
        <div className="review" data-aos="flip-down">
            <img 
                src={img || defaultUserPic}
                alt="Reviewer" 
                className="reviewerImg" 
            />
            <div className="reviewerName">{name}</div>
            <div className="reviewerText">{text}</div>
            <div className="stars">{renderStars()}</div>
        </div>
    );
};

export default Review;
