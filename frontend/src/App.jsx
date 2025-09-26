import React from 'react'
import Login from './pages/Login'

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import AdminDashboard from './pages/AdminDashboard';
import DoctorDashboard from './pages/DoctorDashboard';

const Root = () => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role"); // Make sure you store role at login

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (role === "admin") {
    return <Navigate to="/admin-dashboard" />;
  } else if (role === "doctor") {
    return <Navigate to="/doctor-dashboard" />;
  } else {
    return <Navigate to="/login" />; // Default fallback
  }
};

function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Root />} />
        <Route path='/login' element={<Login />} />
        <Route path='/admin-dashboard' element={<AdminDashboard />} />
        <Route path='/doctor-dashboard' element={<DoctorDashboard />} />
      </Routes>
      </BrowserRouter>
    </div>
    
  )
}

export default App