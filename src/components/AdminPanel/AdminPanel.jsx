import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminHeader from '../AdminHeader/AdminHeader';
import FeedbackScreen from '../FeedbackScreen/FeedbackScreen';
import UsersScreen from '../UsersScreen/UsersScreen';
const DoctorsScreen = () => <div>Doctors Screen Content</div>;
const NewsletterScreen = () => <div>Newsletter Screen Content</div>;
const AppointmentsScreen = () => <div>Appointments Screen Content</div>;

export default function AdminPanel() {
  return (
    <div className="wrap adminWrap">
      <AdminHeader />
      <div style={{ flex: 1, padding: '20px' }}>
      <FeedbackScreen />
      <UsersScreen />
      <Routes>
  <Route path="/admin" element={<Navigate to="/admin/feedback" />} />
  <Route path="/admin/feedback" element={<FeedbackScreen />} />
  <Route path="/admin/users" element={<UsersScreen />} />
  <Route path="/admin/doctors" element={<DoctorsScreen />} />
  <Route path="/admin/newsletter" element={<NewsletterScreen />} />
  <Route path="/admin/appointments" element={<AppointmentsScreen />} />
  <Route path="*" element={<div>404 - Admin Screen Not Found</div>} />
</Routes>

      </div>
    </div>
  );
}
