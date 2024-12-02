import './App.css';
import './Responsive.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import Homepage from './components/Homepage/Homepage';
import AdminPanel from './components/AdminPanel/AdminPanel';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

library.add(faPlay);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/admin/*" element={<AdminPanel />} />
        <Route path="*" element={<div>404 - Page Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;
