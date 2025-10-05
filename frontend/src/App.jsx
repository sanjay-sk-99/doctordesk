import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import AdminPage from "./pages/AdminPage";
import DoctorPage from "./pages/DoctorPage";
import { FormProvider } from "./context/FormContext";
import { UserProvider } from "./context/UserContext";

function Root() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) return <Navigate to="/login" />;
  if (role === "admin") return <Navigate to="/admin" />;
  if (role === "doctor") return <Navigate to="/doctor" />;
  return <Navigate to="/login" />;
}

export default function App() {
  return (
    <UserProvider>
      <FormProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Root />} />
            <Route path="/login" element={<Login />} />
            {/* Admin pages */}
            <Route path="/admin/*" element={<AdminPage />} />
            {/* Doctor pages */}
            <Route path="/doctor/*" element={<DoctorPage />} />
          </Routes>
        </BrowserRouter>
      </FormProvider>
    </UserProvider>
  );
}
