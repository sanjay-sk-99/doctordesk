import React, { useState } from "react";
import Layout from "../layout/Layout";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../components/dashboard/Dashboard"; // Dynamic dashboard
import MainDashboard from "../components/dashboard/MainDashboard";

export default function AdminPage() {
  return (
    <Routes>
      <Route element={<Layout role="admin" />}>
        {/* Default route */}
        <Route index element={<MainDashboard role="admin" />} />

        <Route path="/dashboard" element={<MainDashboard role="admin" />} />

        <Route
          path="doctors"
          element={<Dashboard type="doctor" role="admin" />}
        />

        <Route
          path="patients"
          element={<Dashboard type="patient" role="admin" />}
        />
      </Route>
    </Routes>
  );
}
