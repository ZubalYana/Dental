import React from 'react'
import './AdminPanel.css'
import Feedback from '../Feedback/Feedback'
import AdminHeader from '../AdminHeader/AdminHeader'
export default function AdminPanel() {
  return (
    <>
    <div className="wrap">
      <AdminHeader />
      <Feedback />
    </div>
    </>
  )
}
