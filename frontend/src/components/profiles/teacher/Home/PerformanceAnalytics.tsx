// PerformanceAnalytics.tsx
import React from 'react';
import { Bar, Line } from 'react-chartjs-2';

interface ClassPerformanceData {
  classId: string;
  averageScore: number;
  trends: number[]; // Scores over terms or semesters
}

const PerformanceAnalytics: React.FC = () => {
  // Mock data
  const performanceData: ClassPerformanceData[] = [
    {
      classId: 'Class 10A',
      averageScore: 85,
      trends: [80, 82, 85, 87, 90]
    },
    {
      classId: 'Class 10B',
      averageScore: 78,
      trends: [75, 77, 78, 79, 78]
    },
    {
      classId: 'Class 10C',
      averageScore: 90,
      trends: [85, 87, 88, 90, 92]
    }
  ];

  const barData = {
    labels: performanceData.map(data => data.classId),
    datasets: [
      {
        label: 'Average Scores by Class',
        data: performanceData.map(data => data.averageScore),
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1
      }
    ]
  };

  const lineOptions = {
    scales: {
      y: {
        beginAtZero: true,
        suggestedMax: 100
      }
    },
    maintainAspectRatio: false
  };

  return (
    <div className="p-4 mt-4 shadow rounded bg-white">
      <h2 className="text-lg font-semibold text-center">Performance Analytics</h2>
      <div className="mb-4">
        <h3 className="text-center">Average Performance by Class</h3>
        <Bar data={barData} options={{ scales: { y: { beginAtZero: true } } }} />
      </div>
      {performanceData.map((data, index) => (
        <div key={index} className="mb-4">
          <h3 className="text-center">Trend Over Time for {data.classId}</h3>
          <Line data={{
            labels: ['Term 1', 'Term 2', 'Term 3', 'Term 4', 'Term 5'],
            datasets: [{
              label: `Scores for ${data.classId}`,
              data: data.trends,
              fill: false,
              borderColor: `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`,
              tension: 0.1
            }]
          }} options={lineOptions} />
        </div>
      ))}
    </div>
  );
}

export default PerformanceAnalytics;
