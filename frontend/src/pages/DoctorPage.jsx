import React, { useState } from "react";
import Layout from "../layout/Layout";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../components/Dashboard"; // Dynamic dashboard
import { useFormContext } from "../context/FormContext";
import MainDashboard from "../components/MainDashboard";

export default function DoctorPage() {
  return (
    <Routes>
      <Route element={<Layout role="doctor" />}>
        {/* Default route */}
        <Route index element={<MainDashboard role="doctor"/>} />

        <Route path="maindashboard" element={<MainDashboard role="doctor" />} />

        {/* Patients */}
        <Route path="patients" element={<Dashboard type="patient" />} />
      </Route>
    </Routes>
  );
}
