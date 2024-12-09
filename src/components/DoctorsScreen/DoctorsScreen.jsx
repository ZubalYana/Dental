import React from 'react'
import './DoctorsScreen.css'
export default function DoctorsScreen() {
  return (
    <>
        <h2>Register a new doctor:</h2>
        <div className="doctorForm">
        <div className="doctorInfo">
          <input type="file" placeholder='Doctor image' id='doctorImage' />
          <div className="nameAndSpecialityCon">
            <input type="text" placeholder='Name' id='doctorName' />
            <input type="text" placeholder='Specialty' id='doctorSpecialty' />

          </div>
        </div>
          <button className='registerDoctor'>Register</button>
        </div>
        
    </>
  )
}
