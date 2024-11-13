import React, { useState } from 'react';
import axios from 'axios';
import './AuthForm.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faXmark } from '@fortawesome/free-solid-svg-icons';

export default function AuthForm({ isFormOpen, formType, closeForm, setFormType }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post('http://localhost:3000/register', { name, email, password });
        console.log('User registered successfully:', response);
        setName('');
        setEmail('');
        setPassword('');
    } catch (error) {
        console.log('Error registering user:', error);
    }
};

  const handleLogin = async () => {
    try {
        const response = await axios.post('http://localhost:3000/login', { email, password });
        console.log("logged in");
        const token = response.data.token;
        setToken(token);
        localStorage.setItem('token', token);
    } catch (err) {
        console.log('User not found');
        setToken(null);
        localStorage.setItem('token', null);
    }
};

  return (
    <div
      className="authFormCon"
      style={{
        display: isFormOpen ? 'flex' : 'none',
      }}
    >
      <div className="authForm">
        <FontAwesomeIcon icon={faXmark} id='authForm_xmark' onClick={closeForm} />

        {formType === 'signup' ? (
          <div className="registrationForm">
            <h2>Registration</h2>
<input
  type="text"
  placeholder="Name"
  id="registration_name"
  value={name}
  onChange={(e) => setName(e.target.value)}
/>
<input
  type="text"
  placeholder="Email"
  id="registration_email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>
<div className="passwordCon">
  <input
    type="password"
    placeholder="Password"
    id="registration_password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
  />
  <FontAwesomeIcon icon={faEye} className="password_eye" />
</div>

            <button id="registerBtn" onClick={handleSubmit}>Register</button>
            <p 
              id='alreadyHaveAnAccount' 
              onClick={() => setFormType('login')}
            >
              Already have an account?
            </p>
          </div>
        ) : (
          <div className="logInForm">
            <h2>Log in</h2>
            <input type="text" placeholder='Email' id='logInEmail' />
            <input type="password" placeholder='Password' id='logInPassword' />
            <button id="logInBtn" onClick={handleLogin}>Log in</button>
            <p 
              id='doNotHaveAnAccount' 
              onClick={() => setFormType('signup')}
            >
              Don't have an account yet?
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
