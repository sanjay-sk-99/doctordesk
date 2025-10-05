import React, { useEffect, useState } from "react";
import { useUserContext } from "../context/UserContext";
import axiosInstance from "../utils/axiosInstance";
import API_PATHS from "../utils/apiPath";
import { useRef } from "react";

export default function MainDashboard({ role }) {
  //   const { doctorData, patientData } = useUserContext();
  const {
    doctorData,
    setDoctorData,
    patientData,
    setPatientData,
    hasFetched,
    setHasFetched,
  } = useUserContext();
  const fetchData = async () => {
    try {
      // Determine the correct API URL based on role and type

      if (role === "admin") {
        // const params = filter ? { category: filter } : {};
        const [doctorsRes, patientRes] = await Promise.all([
          axiosInstance.get(API_PATHS.GET_DOCTORS),
          axiosInstance.get(API_PATHS.GET_PATIENTS),
        ]);
        setDoctorData(doctorsRes.data);
        setPatientData(patientRes.data);
      } else {
        const response = await axiosInstance.get(API_PATHS.GET_MY_PATIENTS);
        setPatientData(response.data);
      }
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  useEffect(() => {
    if (!hasFetched) {
      fetchData();
      setHasFetched(true);
    }
  }, []);

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Doctor Count Card */}
      {role === "admin" ? (
        <div className="bg-white shadow-lg rounded-2xl p-6 text-center hover:shadow-xl transition">
          <h2 className="text-xl font-semibold text-gray-700">Doctors</h2>
          <p className="text-4xl font-bold text-blue-600 mt-2">
            {doctorData.length}
          </p>
        </div>
      ) : null}

      {/* Patient Count Card */}
      <div className="bg-white shadow-lg rounded-2xl p-6 text-center hover:shadow-xl transition">
        <h2 className="text-xl font-semibold text-gray-700">Patients</h2>
        <p className="text-4xl font-bold text-green-600 mt-2">
          {patientData.length}
        </p>
      </div>

      {/* Active Patient Count Card */}
      <div className="bg-white shadow-lg rounded-2xl p-6 text-center hover:shadow-xl transition">
        <h2 className="text-xl font-semibold text-gray-700">Active Patients</h2>
        <p className="text-4xl font-bold text-red-600 mt-2"> 0</p>
      </div>
    </div>
  );
}
