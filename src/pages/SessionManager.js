// src/pages/SessionManager.js

let activeSessions = 0;
let endedSessions = 0;
let totalHours = 0;
let sessionStartTime = null;

// Load session data from localStorage
const loadSessionData = () => {
  activeSessions = parseInt(localStorage.getItem('activeSessions') || '0', 10);
  endedSessions = parseInt(localStorage.getItem('endedSessions') || '0', 10);
  totalHours = parseFloat(localStorage.getItem('totalHours') || '0', 10);
};

loadSessionData();

// Start a new session
export const startSession = () => {
  activeSessions += 1;
  sessionStartTime = new Date().getTime(); // Record session start time
  localStorage.setItem('activeSessions', activeSessions);
};

// End the current session
export const endSession = () => {
  if (sessionStartTime) {
    const sessionEndTime = new Date().getTime();
    const sessionDuration = (sessionEndTime - sessionStartTime) / (1000 * 60 * 60); // Convert to hours
    totalHours += sessionDuration;
    sessionStartTime = null;
  }
  activeSessions = Math.max(activeSessions - 1, 0); // Ensure it doesn't go negative
  endedSessions += 1;
  localStorage.setItem('activeSessions', activeSessions);
  localStorage.setItem('endedSessions', endedSessions);
  localStorage.setItem('totalHours', totalHours);
};

// Retrieve session data
export const getSessionData = () => ({
  activeSessions: parseInt(localStorage.getItem('activeSessions') || '0', 10),
  endedSessions: parseInt(localStorage.getItem('endedSessions') || '0', 10),
  totalHours: parseFloat(localStorage.getItem('totalHours') || '0', 10)
});
