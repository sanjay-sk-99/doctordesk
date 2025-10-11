import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import API_PATHS from "../../utils/apiPath";
import DoctorForm from "../form/DoctorForm";
import PatientForm from "../form/PatientForm";
import ShowConfirmToast from "../../utils/ShowConfirmToast";
import { useFormContext } from "../../context/FormContext";
import { useUserContext } from "../../context/UserContext";
import DataTable from "../Table/DataTable";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";

export default function Dashboard({ role }) {
  const [editingItem, setEditingItem] = useState(null);
  const [filter, setFilter] = useState("");
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const location = useLocation();
  const { showForm, setShowForm, type, setType } = useFormContext();
  const { doctorData, patientData } = useUserContext();

  // Filter whenever doctorData or filter changes
  useEffect(() => {
    if (!doctorData || doctorData.length === 0) return;

    if (filter === "") {
      setFilteredDoctors(doctorData); 
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

  // Set type based on current URL on component mount
  useEffect(() => {
    if (location.pathname.includes("/doctors")) {
      setType("doctor");
      setShowForm(false);
    } else if (location.pathname.includes("/patients")) {
      setType("patient");
      setShowForm(false);
    } else {
      setType("dashboard");
    }
  }, [location.pathname]);

  const fetchDoctorPatients = async (doctorId) => {
    try {
      const res = await axiosInstance.get(API_PATHS.GET_PATIENTS, {
        params: { doctorId },
      });
      return res.data;
    } catch (err) {
      console.error(err.response?.data || err.message);
      return [];
    }
  };

  const handleSubmit = async (formData, id) => {
    try {
      if (role === "admin") {
        if (type === "doctor") {
          if (id) {
            // Update existing doctor
            await axiosInstance.put(API_PATHS.UPDATE_DOCTOR(id), formData);
            toast.success("Doctor updated successfully");
          } else {
            // Create new doctor
            await axiosInstance.post(API_PATHS.CREATE_DOCTOR, formData);
            toast.success("Doctor created successfully");
          }
        } else {
          // type === "patient"
          if (id) {
            // Update existing patient
            await axiosInstance.put(API_PATHS.UPDATE_PATIENT(id), formData);
            toast.success("Patient updated successfully");
          } else {
            // Create new patient
            await axiosInstance.post(API_PATHS.CREATE_PATIENT, formData);
            toast.success("Patient created successfully");
          }
        }
      } else {
        // role !== admin
        if (id) {
          // Update existing patient
          await axiosInstance.put(API_PATHS.UPDATE_MY_PATIENT(id), formData);
          toast.success("Patient updated successfully");
        } else {
          // Create new patient
          await axiosInstance.post(API_PATHS.CREATE_MY_PATIENT, formData);
          toast.success("Patient created successfully");
        }
      }

      setShowForm(false); 
      fetchData(); 
    } catch (err) {
      console.error(err.response?.data || err.message);
      toast.error("Something went wrong");
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setShowForm(true);
  };

const handleDelete = (id) => {
  ShowConfirmToast("Are you sure you want to delete this?", async () => {
    try {
      await axiosInstance.delete(
        type === "doctor"
          ? API_PATHS.DELETE_DOCTOR(id)
          : API_PATHS.DELETE_PATIENT(id)
      );


      fetchData();
      toast.success("Deleted successfully!");
    } catch (err) {
      console.error(err.response?.data || err.message);
      toast.error("Failed to delete!");
    }
  });
};

  const handleFormClose = () => {
    setEditingItem(null);
    setShowForm(false);
    fetchData();
  };

  return (
    <div>
      <AnimatePresence mode="wait">
        {showForm && (
          <motion.div
            key={type} // helps reset animation when switching doctor/patient
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {type === "doctor" ? (
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
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Doctor Table */}
      {type === "doctor" ? (
        <DataTable
          type="doctor"
          fetchDoctorPatients={fetchDoctorPatients}
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
