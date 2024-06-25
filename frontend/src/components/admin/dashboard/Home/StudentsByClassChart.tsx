import React from 'react';
import { Bar } from 'react-chartjs-2';

interface StudentsByClassChartProps {
  data: any;
}

const StudentsByClassChart: React.FC<StudentsByClassChartProps> = ({ data }) => {
  return (
    <div className="p-4 md:p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-lg md:text-xl font-semibold text-gray-700 mb-3 md:mb-4">Students by Classes</h2>
      <div style={{ height: '300px' }}>
        <Bar data={data} options={{ maintainAspectRatio: false }} />
      </div>
    </div>
  );
};

export default StudentsByClassChart;
