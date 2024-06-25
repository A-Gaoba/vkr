import React from 'react';
import { Routes, Route } from 'react-router-dom';
import TeacherDashboard from './teacher/teacherProfile/TeacherDashboard';

const ProfilesRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/:teacherId" element={<TeacherDashboard />} />
      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  );
};

export default ProfilesRoutes;
