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
      setIsPopupOpen(false);
      setCurrentReviewId(null);
      showFeedbackMessage('Review rejected');
    });
  };
  

  const handleAccept = (id) => {
    axios.put(`http://localhost:3000/api/feedbacks/${id}`).then(() => {
      setReviewsToCheck((prev) =>
        prev.filter((review) => review._id !== id)
      );
      setReviewsAccepted((prev) => [
        ...prev,
        reviewsToCheck.find((review) => review._id === id),
      ]);
      showFeedbackMessage('Review accepted'); 
    });
  };
  

  function showFeedbackMessage(feedbackMessageText) {
    const message = document.querySelector('.feedbackMessage');
    message.textContent = feedbackMessageText;
    message.style.display = 'flex';
    setTimeout(() => {
      message.style.display = 'none'; 
    }, 3000);
  }
  

  return (
    <div>
      <div className="feedbackScreen">
        <div className="feedbackMessage"></div>
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
            width: '600px',
            height: '200px',
            margin: 'auto',
            padding: '30px',
            textAlign: 'center',
            borderRadius: '8px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          },
        }}
      >
        <h2 className='popupTitle'>Are you sure you want to reject this review?</h2>
        <div className='popupButtons'>
          <button onClick={handleReject} style={{ marginRight: '10px' }}>Yes</button>
          <button onClick={() => setIsPopupOpen(false)}>Cancel</button>
        </div>
      </Modal>
    </div>
  );
}
