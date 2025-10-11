import Layout from "../layout/Layout";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../components/dashboard/Dashboard"; // Dynamic dashboard
import MainDashboard from "../components/dashboard/MainDashboard";

export default function DoctorPage() {
  return (
    <Routes>
      <Route element={<Layout role="doctor" />}>
        {/* Default route */}
        <Route index element={<MainDashboard role="doctor" />} />

        <Route path="dashboard" element={<MainDashboard role="doctor" />} />

        <Route path="patients" element={<Dashboard type="patient" />} />
      </Route>
    </Routes>
  );
}
