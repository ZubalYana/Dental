import React from 'react'
import './MailForm.css'
import axios from 'axios'
import { useState } from 'react'
export default function MailForm() {
    const [email, setEmail] = useState('')

    const sendMail = () => {
        axios.post('http://localhost:3000/send', {
            email
        }).then(res => {
            console.log(res)
        }).catch(err => {
            console.log(err)
        })
    }

    return(
        <div className="newsLetterBox">
        <div className="newsLetter_title">Our Newsletter</div>
        <div className="newsLetter_subtitle">​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​Dental or oral health is concerned with your teeth, gums and mouth. healthy mouth free of infections, injuries and other problems with.</div>
        <div className="inputCon">
          <input placeholder="Enter your email" required type="email" value={email} onChange={(e) => setEmail(e.target.value)} name='email' id='email' />
          <div className='subscribeBtn' onClick={sendMail}>Subscribe</div>
        </div>
        </div>
    )
}
