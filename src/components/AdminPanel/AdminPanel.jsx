import React from 'react'
import './AdminPanel.css'
import Feedback from '../Feedback/Feedback'
import AdminHeader from '../AdminHeader/AdminHeader'
import UsersFeedbacksPanel from '../UsersFeedbacksPanel/UsersFeedbacksPanel'
export default function AdminPanel() {
  return (
    <>
    <div className="wrap">
      <AdminHeader />
      <div className="feedbackScreen">
      <UsersFeedbacksPanel />
      </div>
    </div>
    </>
  )
}
