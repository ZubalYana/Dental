import React, { useState } from 'react';
import axios from 'axios';
import './AppointmentForm.css';
import makeAnAppointmentImg from '/make an appointment img.png';

export default function AppointmentForm() {
  const [formData, setFormData] = useState({
    name: '',
    gender: 'male',
    phone: '',
    email: '',
    department: '',
    date: '',
    details: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/appointments', formData);
      alert('Appointment created successfully!');
      setFormData({
        name: '',
        gender: 'male',
        phone: '',
        email: '',
        department: '',
        date: '',
        details: '',
      });
    } catch (error) {
      console.error(error);
      alert('Error submitting the form');
    }
  };

  return (
    <div className="makeAnAppointment_con">
      <form onSubmit={handleSubmit}>
        <h4>Appointment</h4>
        <div className="inputContainer">
          <input
            type="text"
            placeholder="Patient Name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <select id="gender" value={formData.gender} onChange={handleChange} required>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="inputContainer">
          <input
            type="text"
            placeholder="Phone number"
            id="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            placeholder="Email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="inputContainer">
          <select id="department" value={formData.department} onChange={handleChange} required>
            <option value="" disabled>
              Select Department
            </option>
            <option value="department1">Department 1</option>
            <option value="department2">Department 2</option>
            <option value="department3">Department 3</option>
          </select>
          <input
            type="date"
            id="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>
        <textarea
          id="details"
          placeholder="More details"
          value={formData.details}
          onChange={handleChange}
        ></textarea>
        <button type="submit">Send Message</button>
      </form>
      <img className='makeAnAppointmentImg' src={makeAnAppointmentImg} alt="" />
    </div>
  );
}
