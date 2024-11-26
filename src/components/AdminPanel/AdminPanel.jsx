import React, { useEffect, useState } from 'react';
import './AdminPanel.css';
import Feedback from '../Feedback/Feedback';
import AdminHeader from '../AdminHeader/AdminHeader';
import axios from 'axios';

export default function AdminPanel() {
  const [reviewsToCheck, setReviewsToCheck] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/feedbacks').then((res) => {
      const pendingReviews = res.data.filter((review) => !review.accepted);
      setReviewsToCheck(pendingReviews);
    });
  }, []);

  return (
    <>
      <div className="wrap">
        <AdminHeader />
        <div className="feedbackScreen">
          <div className="feedbacksToCheckCon">
            {reviewsToCheck.map(({ id, name, rating, img, feedback }) => (
              <div key={id}>
                <h2>{name}</h2>
                <p>{rating}</p>
                <p>{feedback}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
