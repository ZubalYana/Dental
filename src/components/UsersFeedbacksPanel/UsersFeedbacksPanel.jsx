import React from 'react'
import './UsersFeedbacksPanel.css'
import axios from 'axios'
export default function UsersFeedbacksPanel() {
    axios.get('/feedbacks').then(res => {
        console.log(res)
    })
  return (
    <div>UsersFeedbacksPanel</div>
  )
}
