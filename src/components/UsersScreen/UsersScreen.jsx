import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import defaultUserPic from '/default user picture.png';
import axios from 'axios';
import "./UsersScreen.css"
export default function UsersScreen() {
    const [users, setUsers] = useState([]);
    
    useEffect(() => {
        axios.get('http://localhost:3000/api/users').then((res) => {
          setUsers(res.data);
          console.log(res.data);
        });
      }, []);

      function handleDelete(id) {
        console.log(id);
        axios.delete(`http://localhost:3000/api/users/${id}`).then(() => {
          const updatedUsers = users.filter((user) => user._id !== id);
          setUsers(updatedUsers);
          alert('User deleted');
        }).catch((error) => {
          console.error("Error deleting user:", error);
          alert('Failed to delete user. Please try again.');
        });
      }
      

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
}
