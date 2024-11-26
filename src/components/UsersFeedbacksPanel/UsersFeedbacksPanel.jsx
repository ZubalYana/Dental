import React, { useState, useEffect } from 'react';
import './UsersFeedbacksPanel.css'
import axios from 'axios'
export default function UsersFeedbacksPanel() {
  const [reviewsToCheck, setReviewsToCheck] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3000/api/feedbacks').then(res => { 
        setReviewsToCheck(res.data);
        console.log(res.data);
    })
  }, [])

  console.log(reviewsToCheck)

  return (
    <>
    <div id="usersFeedbacksCon"></div>
    </>
  )
}
