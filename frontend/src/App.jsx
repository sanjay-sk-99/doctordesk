import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login";
import AdminPage from "./pages/AdminPage";
import DoctorPage from "./pages/DoctorPage";
import ProtectedRoute from "./components/ProtectedRoute";
import axiosInstance from "./utils/axiosInstance";
import API_PATHS from "./utils/apiPath";
import { useUserContext } from "./context/UserContext";

function RootRedirect() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) return <Navigate to="/login" replace />;
  if (role === "admin") return <Navigate to="/admin" replace />;
  if (role === "doctor") return <Navigate to="/doctor" replace />;

  return <Navigate to="/login" replace />;
}

export default function App() {
  const {
    setDoctorData,
    setPatientData,
    hasFetched,
    setHasFetched,
  } = useUserContext();

  const [loading, setLoading] = useState(true);
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  const fetchData = async () => {
    try {
      if (role === "admin") {
        const [doctorsRes, patientsRes] = await Promise.allSettled([
          axiosInstance.get(API_PATHS.GET_DOCTORS),
          axiosInstance.get(API_PATHS.GET_PATIENTS),
        ]);

        const doctors =
          doctorsRes.status === "fulfilled" ? doctorsRes.value.data : [];
        const patients =
          patientsRes.status === "fulfilled" ? patientsRes.value.data : [];

        setDoctorData(doctors);
        setPatientData(patients);
      } else if (role === "doctor") {
        const response = await axiosInstance.get(API_PATHS.GET_MY_PATIENTS);
        setPatientData(response.data || []);
      }
    } catch (err) {
      console.error(err.response?.data || err.message);
      toast.error("Unexpected error occurred while fetching data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token && role && !hasFetched) {
      fetchData();
      setHasFetched(true);
    } else {
      setLoading(false);
    }
  }, [role, token, hasFetched]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-600">
        Loading...
      </div>
    );
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RootRedirect />} />
          <Route path="/login" element={<Login />} />

          {/* Admin Routes */}
          <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
            <Route path="/admin/*" element={<AdminPage />} />
          </Route>

          {/* Doctor Routes */}
          <Route element={<ProtectedRoute allowedRoles={["doctor"]} />}>
            <Route path="/doctor/*" element={<DoctorPage />} />
          </Route>

          {/* Catch all unknown routes */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>

      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="light"
      />
    </>
  );
}
