import React from 'react';
import { useNavigate } from 'react-router-dom';
import './StylingStartPage.css'; // Import your CSS file

const StartPage = () => {
  const navigate = useNavigate();

  const handleStartChat = () => {
    navigate('/chat');
  };

  const handleViewDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <div className="start-page-container">
      <div className="start-page-content">
        <h1>Hii, I am RX </h1>
        <button onClick={handleStartChat}>Start Chat</button>
        <button onClick={handleViewDashboard}>View Dashboard</button>
      </div>
    </div>
  );
};

export default StartPage;
