import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from 'axios';
import Review from '../Review/Review';

export default function ReviewsSlider() {
    const [slides, setSlides] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/api/feedbacks')
            .then(res => {
                const acceptedReviews = res.data.filter(review => review.accepted === true);
                setSlides(acceptedReviews);
            })
            .catch(err => console.error('Error fetching feedbacks:', err));
    }, []);

    const settings = {
        className: "center",
        centerMode: true,
        infinite: true,
        centerPadding: "60px",
        slidesToShow: 3,
        speed: 500,
    };

    return (
        <Slider {...settings}>
            {slides.map(({ name, rating, img, feedback }, index) => (
                <Review key={index} name={name} rate={rating} img={img} text={feedback} />
            ))}
        </Slider>
    );
}
