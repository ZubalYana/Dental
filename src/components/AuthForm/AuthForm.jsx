import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

export default function AuthForm() {
  return (
    <div className='authForm'>
      <div className="registrationForm">
        <h2>Registration</h2>
        <input type="text" placeholder='Name' id='registration_name' />
        <input type="email" placeholder='Email' id='registration_email' />
        <div className="passwordCon">
          <input type="password" placeholder='Password' id='registration_password' />
          <FontAwesomeIcon icon={faEye} />
        </div>
        <button id='registerBtn'>Register</button>
        <p>Already have an account?</p>
      </div>
      <div className="logInForm">
        <h2>Log in</h2>
        <input type="text" placeholder='Email' id='logInEmail' />
        <input type="text" placeholder='Password' id='logInPassword' />
        <button id='logInBtn'>Log in</button>
        <p>Don't have an account yet?</p>
      </div>
    </div>
  );
}
