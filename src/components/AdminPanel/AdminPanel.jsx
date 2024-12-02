import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminHeader from '../AdminHeader/AdminHeader';
import FeedbackScreen from '../FeedbackScreen/FeedbackScreen';

const UsersScreen = () => <div>Users Screen Content</div>;
const DoctorsScreen = () => <div>Doctors Screen Content</div>;
const NewsletterScreen = () => <div>Newsletter Screen Content</div>;
const AppointmentsScreen = () => <div>Appointments Screen Content</div>;

export default function AdminPanel() {
  return (
    <div className="wrap adminWrap">
      <AdminHeader />
      <div style={{ flex: 1, padding: '20px' }}>
        <Routes>
          <Route path="/" element={<Navigate to="/admin/feedback" />} />
          <Route path="feedback" element={<FeedbackScreen />} />
          <Route path="users" element={<UsersScreen />} />
          <Route path="doctors" element={<DoctorsScreen />} />
          <Route path="newsletter" element={<NewsletterScreen />} />
          <Route path="appointments" element={<AppointmentsScreen />} />
          <Route path="*" element={<div>404 - Admin Screen Not Found</div>} />
        </Routes>
      </div>
    </div>
  );
}
