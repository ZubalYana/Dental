import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';
import { faXmark, faCheck, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import defaultUserPic from '/default user picture.png';
import axios from 'axios';

import './FeedbackScreen.css';

export default function FeedbackScreen() {
  const [reviewsToCheck, setReviewsToCheck] = useState([]);
  const [reviewsAccepted, setReviewsAccepted] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/feedbacks').then((res) => {
      setReviewsToCheck(res.data.filter((review) => !review.accepted));
      setReviewsAccepted(res.data.filter((review) => review.accepted));
    });
  }, []);

  const renderStars = (rate) =>
    Array.from({ length: 5 }, (_, index) => (
      <FontAwesomeIcon key={index} icon={index < rate ? solidStar : regularStar} />
    ));

  const handleReject = (id) => {
    axios.delete(`http://localhost:3000/api/feedbacks/${id}`).then(() => {
      setReviewsToCheck((prev) => prev.filter((review) => review._id !== id));
      alert('Review rejected');
    });
  };

  const handleAccept = (id) => {
    axios.put(`http://localhost:3000/api/feedbacks/${id}`).then(() => {
      setReviewsToCheck((prev) =>
        prev.map((review) => (review._id === id ? { ...review, accepted: true } : review))
      );
      alert('Review accepted');
    });
  };

  return (
        <div>
                      <div className="feedbackScreen">
              <div className="feedbacksToCheckCon">
                <h2>New reviews to check:</h2>
                <div className="feedbacksToCheck">
                  {reviewsToCheck.map(({ _id, name, img, feedback, rating }) => (
                    <div className="reviewCon" key={_id}>
                      <div className="review">
                        <img 
                          src={img || defaultUserPic}
                          alt="Reviewer" 
                          className="reviewerImg" 
                        />
                        <div className="reviewActions">
                          <div className='reviewAction rejectReview' onClick={() => handleReject(_id)}>
                            <FontAwesomeIcon icon={faXmark} />
                          </div>
                          <div className='reviewAction acceptReview' onClick={() => handleAccept(_id)}>
                            <FontAwesomeIcon icon={faCheck} />
                          </div>
                        </div>
                        <div className="reviewerName">{name}</div>
                        <div className="reviewerText">{feedback}</div>
                        <div className="stars">{renderStars(rating)}</div>
                      </div>
                    </div>
                  ))}
                </div>
    
                <h2>Accepted reviews:</h2>
                <div className="acceptedReviews">
                  {reviewsAccepted.map(({ _id, name, img, feedback, rating }) => (
                    <div className="reviewCon" key={_id}>
                      <div className="review">
                        <img 
                          src={img || defaultUserPic}
                          alt="Reviewer" 
                          className="reviewerImg" 
                        />
                          <div className='reviewAction deleteReview' onClick={() => handleReject(_id)}>
                            <FontAwesomeIcon icon={faTrashCan} />
                          </div>
                        <div className="reviewerName">{name}</div>
                        <div className="reviewerText">{feedback}</div>
                        <div className="stars">{renderStars(rating)}</div>
                      </div>
                    </div>
                  ))}
                </div>
    
              </div>
            </div>
        </div>
  );
}
