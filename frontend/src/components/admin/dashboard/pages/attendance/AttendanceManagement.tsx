import React, { useState } from 'react';
import AttendanceForm from './AttendanceForm';
import AttendanceList from './AttendanceList';

const AttendanceManagement: React.FC = () => {
  const [refresh, setRefresh] = useState(false);

  const handleRefresh = () => {
    setRefresh(prev => !prev);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Attendance Management</h1>
      <AttendanceForm onSuccess={handleRefresh} />
      <AttendanceList key={refresh ? 'refresh-true' : 'refresh-false'} />
    </div>
  );
};

export default AttendanceManagement;
