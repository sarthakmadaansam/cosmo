import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

// Register Chart.js components
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

// Utility function to get session data for the chart
const getSessionDataForChart = () => {
  // Retrieve weekly hours from localStorage or use default values
  const weeklyHours = JSON.parse(localStorage.getItem('weeklyHours')) || [0, 0, 0, 0];
  const weeks = ['Week 1', 'Week 2', 'Week 3', 'Week 4']; // Adjust as necessary

  return {
    labels: weeks,
    datasets: [{
      label: 'Hours Spent',
      data: weeklyHours,
      backgroundColor: 'rgba(75, 192, 192, 0.6)', // Light color for bars
      borderColor: 'rgba(75, 192, 192, 1)', // Darker color for bar borders
      borderWidth: 1,
    }],
  };
};

const UsageBarChart = () => {
  const data = getSessionDataForChart();

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Usage Over the Month', // Chart title
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default UsageBarChart;
