import React, { useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";
import API_PATHS from "../utils/apiPath";
import DoctorForm from "./DoctorForm";
import PatientForm from "./PatientForm";
import { Trash2, Edit } from "lucide-react";
import { useFormContext } from "../context/FormContext";
import { useUserContext } from "../context/UserContext";

export default function Dashboard({ role }) {
  const [editingItem, setEditingItem] = useState(null);
  const [filter, setFilter] = useState("");
  const [filteredDoctors,setFilteredDoctors]=useState([])
  const { showForm, setShowForm, type  } = useFormContext();
  const {doctorData,setDoctorData,patientData,setPatientData,hasFetched,setHasFetched} = useUserContext()

    // Filter whenever doctorData or filter changes
  useEffect(() => {
    if (!doctorData || doctorData.length === 0) return;

    if (filter === "") {
      setFilteredDoctors(doctorData); // show all
      console.log(doctorData)
    } else {
      const filtered = doctorData.filter(
        (doc) => doc.doctorProfile?.category?.toLowerCase() === filter.toLowerCase()
      );
      console.log(filtered)
      setFilteredDoctors(filtered);
    }
  }, [filter, doctorData]); 

    useEffect(() => {
      if (!hasFetched) {
        fetchData();
        setHasFetched(true);
      }
    }, []);

  const fetchData = async () => {
    try {
      // Determine the correct API URL based on role and type

      if (role === "admin") {
    
           const params = filter ? { category: filter } : {};
        const [doctorsRes,patientRes] = await Promise.all([
          axiosInstance.get(API_PATHS.GET_DOCTORS, { params }),
          axiosInstance.get(API_PATHS.GET_PATIENTS, { params })
        ])
        setDoctorData(doctorsRes.data);
        setPatientData(patientRes.data);
      } else {
        
        const response = await axiosInstance.get(API_PATHS.GET_MY_PATIENTS);
        setPatientData(response.data)
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
        <div className="overflow-x-auto mt-4">
          <header className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <h1 className="text-xl font-bold">
                {type === "doctor" ? "Doctors" : "Patients"}
              </h1>
              <div className="ps-5">
                <label>Filter: </label>
                <select
                  className="border p-2 ml-2"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                >
                  <option value="">All</option>
                  <option value="Junior">Junior</option>
                  <option value="Senior">Senior</option>
                  <option value="Specialist">Intern</option>
                </select>
              </div>
            </div>

            <button
              onClick={() => setShowForm(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Add {type === "doctor" ? "Doctor" : "Patient"}
            </button>
          </header>
          <table className="w-full border border-gray-300 rounded-lg shadow-md">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-3">Doctor Id</th>
                <th className="border p-3">Name</th>
                <th className="border p-3">Specialization</th>
                <th className="border p-3">Phone</th>
                <th className="border p-3">Category</th>
                <th className="border p-3">Status</th>
                <th className="border p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDoctors.length > 0 ? (
                filteredDoctors.map((item) => (
                  <tr key={item._id} className="hover:bg-gray-50">
                    <td className="border p-3">{item.doctorId || ""}</td>
                    <td className="border p-3">
                      {item.doctorProfile?.name || item.name}
                    </td>
                    <td className="border p-3">
                      {item.doctorProfile?.specialization ||
                        item.specialization}
                    </td>
                    <td className="border p-3">
                      {item.doctorProfile?.phone || item.phone}
                    </td>
                    <td className="border p-3">
                      {item.doctorProfile?.category || item.category}
                    </td>
                    <td className="border p-3">
                      {item.isActive ? "✅ Active" : "❌ Inactive"}
                    </td>
                    <td className="border p-3 flex space-x-2 justify-center">
                      <button
                        onClick={() => handleEdit(item)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center p-4 text-gray-500">
                    No doctors found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ) : (
        /* Patient Table */
        <div className="overflow-x-auto mt-4">
          <header className="flex justify-between items-center mb-6">
            <h1 className="text-xl font-bold">
              {type === "doctor" ? "Doctors" : "Patients"}
            </h1>

            <button
              onClick={() => setShowForm(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Add {type === "doctor" ? "Doctor" : "Patient"}
            </button>
          </header>
          <table className="w-full border border-gray-300 rounded-lg shadow-md">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-3">Patient ID</th>
                <th className="border p-3">Doctor ID</th>
                <th className="border p-3">Name</th>
                <th className="border p-3">Age</th>
                <th className="border p-3">Gender</th>
                <th className="border p-3">Phone</th>
                <th className="border p-3">Address</th>
                <th className="border p-3">Medical Records</th>
                <th className="border p-3">Status</th>
                <th className="border p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {patientData.length > 0 ? (
                patientData.map((patient) => (
                  <tr key={patient._id} className="hover:bg-gray-50">
                    <td className="border p-3">{patient.patientId}</td>
                    <td className="border p-3">{patient.doctorId}</td>
                    <td className="border p-3">{patient.name}</td>
                    <td className="border p-3">{patient.age}</td>
                    <td className="border p-3">{patient.gender}</td>
                    <td className="border p-3">{patient.phone}</td>
                    <td className="border p-3">{patient.address}</td>
                    <td className="border p-3 text-center">
                      {patient.medicalHistory?.length || 0}
                    </td>
                    <td className="border p-3">
                      {patient.isActive ? "✅ Active" : "❌ Inactive"}
                    </td>
                    <td className="border p-3 flex space-x-2 justify-center">
                      <button
                        onClick={() => handleEdit(patient)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(patient._id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="10" className="text-center p-4 text-gray-500">
                    No patients found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
