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
                    <h3 className='appintmentName'>{appointment.name}</h3>
                    <p className='appointmentInfo'>Gender: <span className='info'>{appointment.gender}</span></p>
                    <p className='appointmentInfo'>Phone: <span className='info'>{appointment.phone}</span></p>
                    <p className='appointmentInfo'>Email: <span className='info'>{appointment.email}</span></p>
                    <p className='appointmentInfo'>Department: <span className='info'>{appointment.department}</span></p>
                    <p className='appointmentInfo'>Date: <span className='info'>{appointment.date}</span></p>
                    <p className='appointmentInfo'>Details: <span className='info'>{appointment.details}</span></p>
                </div>
            ))}
        </div>
    </div>
  )
}
