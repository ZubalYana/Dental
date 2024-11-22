import React, { useState } from 'react'
import axios from 'axios'
import './Feedback.css'
export default function Feedback() {
  const [feedback, setFeedback] = useState({status: false})
  return (
    <div className='feedbackContainer'>
      <h2>Feedback</h2>
      <div className="nameRatingCon">
      <input type="text" placeholder='Name' id='name' value={feedback.name} onChange={(e) => setFeedback({ ...feedback, name: e.target.value })} />
      <select name="rating" id="rating" value={feedback.rating} onChange={(e) => setFeedback({ ...feedback, rating: parseInt(e.target.value) })}>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
      </div>

      <textarea name="" id="feedback" placeholder='Feedback' value={feedback.feedback} onChange={(e) => setFeedback({ ...feedback, feedback: e.target.value })}></textarea>

      <button className='feedback_btn' onClick={() => {
        alert('Feedback sent')
        axios.post('http://localhost:3000/feedback', feedback
        )}}>Send</button>
    </div>
  )
}
