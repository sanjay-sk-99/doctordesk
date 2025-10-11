import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login";
import AdminPage from "./pages/AdminPage";
import DoctorPage from "./pages/DoctorPage";
import axiosInstance from "./utils/axiosInstance";
import API_PATHS from "./utils/apiPath";
import { useUserContext } from "./context/UserContext";
import { toast } from "react-toastify";
import ProtectedRoute from "./components/ProtectedRoute";

function Root() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) return <Navigate to="/login" />;
  if (role === "admin") return <Navigate to="/admin" />;
  if (role === "doctor") return <Navigate to="/doctor" />;
  return <Navigate to="/login" />;
}

export default function App() {
  const role = localStorage.getItem("role");

  const { setDoctorData, setPatientData, hasFetched, setHasFetched } =
    useUserContext();

  const fetchData = async () => {
    console.log("from app");
    try {
      if (role === "admin") {
        const [doctorsRes, patientRes] = await Promise.allSettled([
          axiosInstance.get(API_PATHS.GET_DOCTORS),
          axiosInstance.get(API_PATHS.GET_PATIENTS),
        ]);
        const doctors =
          doctorsRes.status === "fulfilled" ? doctorsRes.value.data : [];
        const patients =
          patientRes.status === "fulfilled" ? patientRes.value.data : [];
        setDoctorData(doctors);
        setPatientData(patients);
      } else {
        const response = await axiosInstance.get(API_PATHS.GET_MY_PATIENTS);
        const patients =
          response.status === "fulfilled" ? response.value.data : [];
        setPatientData(patients);
      }
    } catch (err) {
      console.error(err.response?.data || err.message);
      toast.error("Unexpected error occurred");
    }
  };

  useEffect(() => {
    if (!hasFetched) {
      fetchData();
      setHasFetched(true);
    }
  }, []);

  return (
    <>
      {" "}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Root />} />
          <Route path="/login" element={<Login />} />
          {/* Admin pages */}
          <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
            <Route path="/admin/*" element={<AdminPage />} />
          </Route>
          {/* Doctor pages */}
          <Route element={<ProtectedRoute allowedRoles={["doctor"]} />}>
            <Route path="/doctor/*" element={<DoctorPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        pauseOnHover
        theme="light"
      />
    </>
  );
}
