import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import StartPage from './pages/StartPages'; // Make sure the import path is correct
import ChatPage from './pages/ChatPages'; // Make sure the import path is correct
import Dashboard from './pages/Dashboard';
import { startSession, endSession } from './pages/SessionManager';

function App() {
  const location = useLocation();

  useEffect(() => {
    // Start session when navigating to /chat
    if (location.pathname === '/chat') {
      startSession();
    }

    // End session when navigating away from /chat
    return () => {
      if (location.pathname === '/chat') {
        endSession();
      }
    };
  }, [location.pathname]);

  return (
    <>
      <Routes>
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/" element={<StartPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
}

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
