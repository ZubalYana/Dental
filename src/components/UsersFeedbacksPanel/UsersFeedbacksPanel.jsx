import React from 'react'
import './UsersFeedbacksPanel.css'
import axios from 'axios'
export default function UsersFeedbacksPanel() {
    axios.get('/api/feedbacks').then(res => {
        console.log(res)
        // const feedbacks = res.data
        // console.log(feedbacks)
        // const usersFeedbacksCon = document.getElementById('usersFeedbacksCon')
        // usersFeedbacksCon.innerHTML = ''
        // feedbacks.map(feedback => {
        //     const userFeedback = document.createElement('div')
        //     userFeedback.className = 'userFeedback'
        //     userFeedback.innerHTML = `
        //     <div class="userFeedback_name">${feedback.name}</div>
        //     <div class="userFeedback_rating">${feedback.rating}</div>
        //     <div class="userFeedback_feedback">${feedback.feedback}</div>`
        //     usersFeedbacksCon.appendChild(userFeedback)
        // })
    })
  return (
    <>
    <div id="usersFeedbacksCon"></div>
    </>
  )
}
