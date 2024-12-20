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

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });
    };

    function handleArchive(id) {
        axios.delete(`http://localhost:3000/api/appointments/${id}`).then(() => {
          const updatedAppointments = appointments.filter((appointment) => appointment._id !== id);
          setAppointments(updatedAppointments);
          alert('Appointment deleted');
        }).catch((error) => {
          console.error("Error deleting appointment:", error);
          alert('Failed to delete appointment. Please try again.');
        });
      }


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
                    <p className='appointmentInfo'>Date: <span className='info'>{formatDate(appointment.date)}</span></p>
                    <p className='appointmentInfo'>Details: <span className='info'>{appointment.details}</span></p>
                    <button className='archiveBtn' onClick={() => handleArchive(appointment._id)}>Archieve</button>
                </div>
            ))}
        </div>
    </div>
  )
}
