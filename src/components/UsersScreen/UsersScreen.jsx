import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import defaultUserPic from '/default user picture.png';
import axios from 'axios';
import './UsersScreen.css';
import Modal from 'react-modal';

Modal.setAppElement('#root');

export default function UsersScreen() {
  const [users, setUsers] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3000/api/users').then((res) => {
      setUsers(res.data);
      console.log(res.data);
    });
  }, []);

  const openDeleteModal = (id) => {
    setSelectedUserId(id);
    setIsPopupOpen(true);
  };

  const closeDeleteModal = () => {
    setSelectedUserId(null);
    setIsPopupOpen(false);
  };

  const handleDelete = () => {
    if (!selectedUserId) return;

    axios
      .delete(`http://localhost:3000/api/users/${selectedUserId}`)
      .then(() => {
        const updatedUsers = users.filter((user) => user._id !== selectedUserId);
        setUsers(updatedUsers);
        closeDeleteModal();
      })
      .catch((error) => {
        console.error('Error deleting user:', error);
        alert('Failed to delete user. Please try again.');
      });
  };

  return (
    <div className="usersScreen screen">
      <h2>Registered users:</h2>
      <div className="usersCon">
        {users.map((user) => (
          <div className="user" key={user._id}>
            <div className="pictureAndName">
              <img
                src={user.img || defaultUserPic}
                alt="User"
                className="userImg"
              />
              <div className="userName">{user.name}</div>
            </div>
            <div className="userEmail">{user.email}</div>
            <FontAwesomeIcon
              icon={faTrashCan}
              className="deleteUser"
              onClick={() => openDeleteModal(user._id)}
            />
          </div>
        ))}
      </div>
      
      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isPopupOpen}
        onRequestClose={closeDeleteModal}
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
        <h2 className="popupTitle">
          Are you sure you want to delete this user?
        </h2>
        <div className="popupButtons">
          <button
            onClick={handleDelete}
            style={{ marginRight: '10px' }}
          >
            Yes
          </button>
          <button onClick={closeDeleteModal}>Cancel</button>
        </div>
      </Modal>
    </div>
  );
}
