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
  const [currentScreen, setCurrentScreen] = useState('feedback'); 
  const [reviewsToCheck, setReviewsToCheck] = useState([]);
  const [reviewsAccepted, setReviewsAccepted] = useState([]);
  const [users, setUsers] = useState([]);

  //get reviews to check
  useEffect(() => {
    axios.get('http://localhost:3000/api/feedbacks').then((res) => {
      const pendingReviews = res.data.filter((review) => !review.accepted);
      setReviewsToCheck(pendingReviews);
      console.log(res.data);
    });
  }, []);

  //get reviews accepted
  useEffect(() => {
    axios.get('http://localhost:3000/api/feedbacks').then((res) => {
      const pendingReviews = res.data.filter((review) => review.accepted);
      setReviewsAccepted(pendingReviews);
      console.log(pendingReviews);
    });
  }, []);

  //get users
  useEffect(() => {
    axios.get('http://localhost:3000/api/users').then((res) => {
      setUsers(res.data);
      console.log(res.data);
    });
  }, []);

  //render starts in the reviews
  const renderStars = (rate) => {
    return Array.from({ length: 5 }, (_, index) => (
      <FontAwesomeIcon
        key={index}
        icon={index < rate ? solidStar : regularStar}
        className="starIcon"
      />
    ));
  };

  //reject/delete a review
  function handleReject(id) {
    console.log(id)
    axios.delete(`http://localhost:3000/api/feedbacks/${id}`).then(() => {
      const updatedReviews = reviewsToCheck.filter((review) => review._id !== id);
      setReviewsToCheck(updatedReviews);
      alert('Review rejected');
    });
  }

  //accept a review
  function handleAccept(id) {
    console.log(id)
    axios.put(`http://localhost:3000/api/feedbacks/${id}`).then(() => {
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

  //delete a user
  function handleDelete(id) {
    console.log(id)
    axios.delete(`http://localhost:3000/api/users/${id}`).then(() => {
      const updatedUsers = users.filter((user) => user._id !== id);
      setUsers(updatedUsers);
      alert('User deleted');
    });
  }

  //screens rendering
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
        return (
        <div className="usersScreen screen">
          <h2>Registered users:</h2>
          <div className="usersCon">
            {users.map((user) => (
              <div className="user" key={user._id}>
                <div className="pictureAndName">
                  <img src={user.img || defaultUserPic} alt="User" className="userImg" />
                  <div className="userName">{user.name}</div>
                </div>
                <div className="userEmail">{user.email}</div>
                <FontAwesomeIcon icon={faTrashCan} className="deleteUser" onClick={() => handleDelete(user._id)} />
              </div>
            ))}
          </div>
        </div>
        )
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
