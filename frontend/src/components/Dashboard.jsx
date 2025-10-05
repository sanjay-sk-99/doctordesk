import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import API_PATHS from "../utils/apiPath";
import DoctorForm from "./DoctorForm";
import PatientForm from "./PatientForm";
import { Trash2, Edit } from "lucide-react";
import { useFormContext } from "../context/FormContext";
import { useUserContext } from "../context/UserContext";
import DataTable from "./DataTable";

export default function Dashboard({ role }) {
  const [editingItem, setEditingItem] = useState(null);
  const [filter, setFilter] = useState("");
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const location = useLocation()
  const { showForm, setShowForm, type,setType } = useFormContext();
  const {
    doctorData,
    setDoctorData,
    patientData,
    setPatientData,
    hasFetched,
    setHasFetched,
  } = useUserContext();

  // Filter whenever doctorData or filter changes
  useEffect(() => {
    if (!doctorData || doctorData.length === 0) return;

    if (filter === "") {
      setFilteredDoctors(doctorData); // show all
      console.log(doctorData);
    } else {
      const filtered = doctorData.filter(
        (doc) =>
          doc.doctorProfile?.category?.toLowerCase() === filter.toLowerCase()
      );
      console.log(filtered);
      setFilteredDoctors(filtered);
    }
  }, [filter, doctorData]);

  useEffect(() => {
    if (!hasFetched) {
      fetchData();
      setHasFetched(true);
    }
  }, []);

    // Set type based on current URL on component mount
  useEffect(() => {
    if (location.pathname.includes('/doctors')) {
      setType('doctor');
    } else if (location.pathname.includes('/patients')) {
      setType('patient');
    } else {
      setType('dashboard');
    }
  }, [location.pathname]);

  const fetchData = async () => {
    try {
      // Determine the correct API URL based on role and type

      if (role === "admin") {
        const params = filter ? { category: filter } : {};
        const [doctorsRes, patientRes] = await Promise.all([
          axiosInstance.get(API_PATHS.GET_DOCTORS, { params }),
          axiosInstance.get(API_PATHS.GET_PATIENTS, { params }),
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

  // In Dashboard.jsx

  const handleSubmit = async (formData, id) => {
    try {
      if (role === "admin") {
        if (type === "doctor") {
          if (id) {
            // Update existing doctor
            await axiosInstance.put(API_PATHS.UPDATE_DOCTOR(id), formData);
            alert("Doctor updated successfully");
          } else {
            // Create new doctor
            await axiosInstance.post(API_PATHS.CREATE_DOCTOR, formData);
            alert("Doctor created successfully");
          }
        } else {
          // type === "patient"
          if (id) {
            // Update existing patient
            await axiosInstance.put(API_PATHS.UPDATE_PATIENT(id), formData);
            alert("Patient updated successfully");
          } else {
            // Create new patient
            await axiosInstance.post(API_PATHS.CREATE_PATIENT, formData);
            alert("Patient created successfully");
          }
        }
      } else {
        // role !== admin
        if (id) {
          // Update existing patient
          await axiosInstance.put(API_PATHS.UPDATE_MY_PATIENT(id), formData);
          alert("Patient updated successfully");
        } else {
          // Create new patient
          await axiosInstance.post(API_PATHS.CREATE_MY_PATIENT, formData);
          alert("Patient created successfully");
        }
      }

      setShowForm(false); // Close the form
      fetchData(); // Refresh the table
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Something went wrong. Check console for details.");
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await axiosInstance.delete(
        type === "doctor"
          ? API_PATHS.DELETE_DOCTOR(id)
          : API_PATHS.DELETE_PATIENT(id)
      );
      fetchData();
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  const handleFormClose = () => {
    setEditingItem(null);
    setShowForm(false);
    fetchData();
  };

  return (
    <div>
      {showForm &&
        (type === "doctor" ? (
          <DoctorForm
            editingDoctor={editingItem}
            onClose={handleFormClose}
            onSubmit={handleSubmit}
          />
        ) : (
          <PatientForm
            role={role}
            editingPatient={editingItem}
            onClose={handleFormClose}
            onSubmit={handleSubmit}
          />
        ))}

      {/* Doctor Table */}
      {type === "doctor" ? (
        <DataTable
          type="doctor"
          data={filteredDoctors}
          filter={filter}
          setFilter={setFilter}
          onShowForm={setShowForm}
          onEdit={handleEdit}
          onDelete={handleDelete}
          showAddButton={true}
          showFilter={true}
        />
      ) : (
        /* Patient Table */
        <DataTable
          type="patient"
          data={patientData}
          onShowForm={setShowForm}
          onEdit={handleEdit}
          onDelete={handleDelete}
          showAddButton={true}
          showFilter={false}
        />
      )}
    </div>
  );
}
