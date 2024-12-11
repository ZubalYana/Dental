import React, { useState, useEffect } from 'react'
import './AppointmentsScreen.css'
import axios from 'axios'
export default function AppointmentsScreen() {
    const [appointments, setAppointments] = useState([]);

    function getAppointments() {
        axios.get('http://localhost:3000/api/appointments').then((res) => {
            setAppointments(res.data);
            console.log(res.data);
        }); 
    }

    useEffect(() => {
        getAppointments();
    }, []);


  return (
    <div>
        <h2>New Appointments:</h2>
        <div className="appointmentsCon">
            {appointments.map((appointment) => (
                <div className="appointment" key={appointment._id}>
                    <h3>{appointment.name}</h3>
                    <p>Gender: {appointment.gender}</p>
                    <p>Age: {appointment.age}</p>
                    <p>Phone: {appointment.phone}</p>
                    <p>Email: {appointment.email}</p>
                    <p>Department: {appointment.department}</p>
                    <p>Date: {appointment.date}</p>
                    <p>Details: {appointment.details}</p>
                </div>
            ))}
        </div>
    </div>
  )
}
