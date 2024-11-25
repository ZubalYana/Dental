import React, { useEffect, useState } from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from 'axios';
import Review from '../Review/Review';
export default function ReviewsSlider() {

    const [slides, setSlides] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/api/feedbacks').then(res => { 
            setSlides(res.data);
            console.log(res.data);
        })
      }, [])

    const settigs = {
        dots: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        adaptiveHeight: true,
    };
    return (
        <Slider {...settigs}>
   {slides.map(({ name, rating, img, feedback }, index) => (
      <Review key={index} name={name} rate={rating} img={img} text={feedback} />
    ))}
        </Slider>
    )
}
  
