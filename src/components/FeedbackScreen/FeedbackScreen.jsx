import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';
import { faXmark, faCheck, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import defaultUserPic from '/default user picture.png';
import axios from 'axios';
import './FeedbackScreen.css';
import Modal from 'react-modal';

Modal.setAppElement('#root');

export default function FeedbackScreen() {
  const [reviewsToCheck, setReviewsToCheck] = useState([]);
  const [reviewsAccepted, setReviewsAccepted] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentReviewId, setCurrentReviewId] = useState(null);

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

  const openRejectModal = (id) => {
    setCurrentReviewId(id); 
    setIsPopupOpen(true);
  };

  const handleReject = () => {
    axios.delete(`http://localhost:3000/api/feedbacks/${currentReviewId}`).then(() => {
      setReviewsToCheck((prev) => prev.filter((review) => review._id !== currentReviewId));
      alert('Review rejected');
      setIsPopupOpen(false); 
      setCurrentReviewId(null); 
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
                    <div className='reviewAction rejectReview' onClick={() => openRejectModal(_id)}>
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
                  <div className='reviewAction deleteReview' onClick={() => openRejectModal(_id)}>
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

      {/* Reject Modal */}
      <Modal
        isOpen={isPopupOpen}
        onRequestClose={() => setIsPopupOpen(false)}
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            zIndex: 1000,
          },
          content: {
            color: 'black',
            width: '300px',
            margin: 'auto',
            padding: '20px',
            textAlign: 'center',
            borderRadius: '8px',
          },
        }}
      >
        <h2>Are you sure you want to reject this review?</h2>
        <div>
          <button onClick={handleReject} style={{ marginRight: '10px' }}>Yes</button>
          <button onClick={() => setIsPopupOpen(false)}>Cancel</button>
        </div>
      </Modal>
    </div>
  );
}
