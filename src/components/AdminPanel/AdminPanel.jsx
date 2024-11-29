import React, { useEffect, useState } from 'react';
import './AdminPanel.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';  
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import defaultUserPic from "/default user picture.png";
import AdminHeader from '../AdminHeader/AdminHeader';
import axios from 'axios';

export default function AdminPanel() {
  const [currentScreen, setCurrentScreen] = useState('feedback'); // Default screen
  const [reviewsToCheck, setReviewsToCheck] = useState([]);
  const [reviewsAccepted, setReviewsAccepted] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/feedbacks').then((res) => {
      const pendingReviews = res.data.filter((review) => !review.accepted);
      setReviewsToCheck(pendingReviews);
      console.log(res.data);
    });
  }, []);

  useEffect(() => {
    axios.get('http://localhost:3000/api/feedbacks').then((res) => {
      const pendingReviews = res.data.filter((review) => review.accepted);
      setReviewsAccepted(pendingReviews);
      console.log(pendingReviews);
    });
  }, []);

  const renderStars = (rate) => {
    return Array.from({ length: 5 }, (_, index) => (
      <FontAwesomeIcon
        key={index}
        icon={index < rate ? solidStar : regularStar}
        className="starIcon"
      />
    ));
  };

  function handleReject(id) {
    console.log(id)
    axios.delete("http://localhost:3000/api/feedbacks/${id}").then(() => {
      const updatedReviews = reviewsToCheck.filter((review) => review._id !== id);
      setReviewsToCheck(updatedReviews);
      alert('Review rejected');
    });
  }

  function handleAccept(id) {
    console.log(id)
    axios.put("http://localhost:3000/api/feedbacks/${id}").then(() => {
      const updatedReviews = reviewsToCheck.map((review) => {
        if (review._id === id) {
          return { ...review, accepted: true };
        }
        return review;
      });
      setReviewsToCheck(updatedReviews);
      alert('Review accepted');
    });
  }
  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case 'feedback':
        return (
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
        );
      case 'users':
        return <div className="usersScreen screen">Users Screen Content</div>;
      case 'doctors':
        return <div className="doctorsScreen screen">Doctors Screen Content</div>;
      case 'newsletter':
        return <div className="newsLetterScreen screen">Newsletter Screen Content</div>;
      case 'appointments':
        return <div className="appointmentsScreen screen">Appointments Screen Content</div>;
      default:
        return <div>404 - Screen Not Found</div>;
    }
  };

  return (
    <div className="wrap adminWrap">
      <AdminHeader setCurrentScreen={setCurrentScreen} />
      {renderCurrentScreen()}
    </div>
  );
}
