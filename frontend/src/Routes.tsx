import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminRoutes from './components/admin/AdminRoutes';
import LandingRoutes from './components/landing/LandingRoutes';
import ProfilesRoutes from './components/profiles/ProfilesRoutes';
import Login from './components/Login';
import Register from './components/Register';
import ProtectedRoute from './components/ProtectedRoutes';

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/*" element={<LandingRoutes />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/admin/*" element={<ProtectedRoute element={AdminRoutes} roleRequired="ADMIN" />} />
      <Route path="/teacher/*" element={<ProtectedRoute element={ProfilesRoutes} roleRequired="TEACHER" />} />
    </Routes>
  );
};

export default AllRoutes;
