import React, { useState } from 'react';
import './AdminPanel.css';
import AdminHeader from '../AdminHeader/AdminHeader';
import FeedbackScreen from '../FeedbackScreen/FeedbackScreen';

export default function AdminPanel() {
  const [currentScreen, setCurrentScreen] = useState('feedback'); // Define state

  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case 'feedback':
        return <FeedbackScreen />;
      case 'users':
        return <div>Users Screen Content</div>;
      case 'doctors':
        return <div>Doctors Screen Content</div>;
      case 'newsletter':
        return <div>Newsletter Screen Content</div>;
      case 'appointments':
        return <div>Appointments Screen Content</div>;
      default:
        return <div>404 - Screen Not Found</div>;
    }
  };

  return (
    <div className="wrap adminWrap">
      <AdminHeader setCurrentScreen={setCurrentScreen} />
      {renderCurrentScreen()}
    </div>
  );
}
