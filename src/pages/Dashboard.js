import React, { useState, useEffect } from 'react';
import { getSessionData } from './SessionManager';
import '../pages/StylingDashboard.css';
import UsageBarChart from './UsageBarChart';

function Dashboard() {
  const [sessionData, setSessionData] = useState({
    activeSessions: 0,
    endedSessions: 0,
    totalHours: 0
  });

  useEffect(() => {
    // Function to fetch and set session data
    const fetchSessionData = () => {
      const data = getSessionData();
      setSessionData(data);
    };

    // Fetch data initially
    fetchSessionData();

    // Optionally, you can set up polling here if needed

  }, []);

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Dashboard</h1>
      </header>
      <main className="dashboard-main">
        <section className="session-manager">
          <h2>Session Summary</h2>
          <p>Active Sessions: {sessionData.activeSessions}</p>
          <p>Ended Sessions: {sessionData.endedSessions}</p>
          <p>Total Hours Spent: {sessionData.totalHours.toFixed(2)} Hours</p>
        </section>
        <section className="dashboard-charts">
          <div className="chart-container">
            <h3>Usage Over the Month</h3>
            <UsageBarChart />
          </div>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
