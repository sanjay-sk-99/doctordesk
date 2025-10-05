import React, { useState } from "react";
import Layout from "../layout/Layout";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../components/Dashboard"; // Dynamic dashboard
import MainDashboard from "../components/MainDashboard";

export default function AdminPage() {
  return (
    <Routes>
      <Route element={<Layout role="admin" />}>
        {/* Default route */}
        <Route index element={<MainDashboard role="admin"/>} />

        <Route path="maindashboard" element={<MainDashboard role="admin" />} />
        {/* Doctors */}
        <Route
          path="doctors"
          element={<Dashboard type="doctor" role="admin" />}
        />

        {/* Patients */}
        <Route
          path="patients"
          element={<Dashboard type="patient" role="admin" />}
        />
      </Route>
    </Routes>
  );
}
