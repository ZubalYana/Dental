import React from 'react';
import './DoctorsScreen.css';
import axios from 'axios';

export default function DoctorsScreen() {
  const registerDoctor = async () => {
    const imageFile = document.getElementById('doctorImage').files[0];
    const name = document.getElementById('doctorName').value;
    const specialty = document.getElementById('doctorSpecialty').value;

    if (!imageFile || !name || !specialty) {
      alert("All fields are required!");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Image = reader.result;

      const payload = {
        name,
        specialty,
        image: base64Image,
      };

      console.log('Payload:', payload);

      try {
        const response = await axios.post('http://localhost:3000/api/registerDoctor', payload, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        alert("Doctor registered successfully!");
        console.log(response.data);
      } catch (error) {
        console.error("Error registering doctor:", error);
        alert("Failed to register doctor.");
      }
    };

    reader.onerror = (error) => {
      console.error("Error reading file:", error);
      alert("Failed to process the image file.");
    };

    reader.readAsDataURL(imageFile); 
  };

  return (
    <>
      <h2>Register a new doctor:</h2>
      <div className="doctorForm">
        <div className="doctorInfo">
          <input type="file" placeholder="Doctor image" id="doctorImage" name="image" />
          <div className="nameAndSpecialityCon">
            <input type="text" placeholder="Name" id="doctorName" />
            <input type="text" placeholder="Specialty" id="doctorSpecialty" />
          </div>
        </div>
        <button className="registerDoctor" onClick={registerDoctor}>
          Register
        </button>
      </div>
    </>
  );
}
