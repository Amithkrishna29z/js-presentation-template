
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import './styles/ChartSlide.css'; 

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function ChartSlide({ data, darkMode }) {
  const valuesArray = Array.isArray(data.values) ? data.values : [];
  const numericValues = valuesArray.map(value => parseFloat(value));
  const labelsArray = Array.isArray(data.labels) ? data.labels : [];

  const chartData = {
    labels: labelsArray,
    datasets: [
      {
        label: data.label || 'Dataset',
        data: numericValues,
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: darkMode ? '#fff' : '#333', 
          font: {
            size: 16, 
          },
        },
      },
      title: {
        display: true,
        text: data.title || 'Chart Title',
        color: darkMode ? '#fff' : '#333', 
        font: {
          size: 20, 
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: darkMode ? '#fff' : '#333', 
          font: {
            size: 18, 
          },
        },
        grid: {
          color: darkMode ? '#fff' : '#000000', 
        },
      },
      y: {
        ticks: {
          color: darkMode ? '#fff' : '#333', 
          font: {
            size: 18, 
          },
        },
        grid: {
          color: darkMode ? '#fff' : '#000000', 
        },
      },
    },
  };

  return (
    <div className={`chart-slide ${darkMode ? 'dark-mode' : ''}`}>
      <h2>Chart Slide</h2>
      <div className="chart-container">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
}

export default ChartSlide;
