import React, { useState, useEffect } from "react";

export default function PatientForm({
  onSubmit,
  editingPatient,
  onClose,
  role,
}) {
  const [formData, setFormData] = useState({
    patientId: "",
    doctorId: "",
    name: "",
    age: "",
    gender: "",
    phone: "",
    address: "",
    medicalHistory: [
      { diagnosis: "", treatment: "", prescription: "", date: "" },
    ],
    isActive: true,
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Prefill when editing
  useEffect(() => {
    if (editingPatient) {
      setFormData({
        patientId: editingPatient.patientId || "",
        doctorId: editingPatient.doctorId || "",
        name: editingPatient.name || "",
        age: editingPatient.age || "",
        gender: editingPatient.gender || "",
        phone: editingPatient.phone || "",
        address: editingPatient.address || "",
        medicalHistory: editingPatient.medicalHistory?.length
          ? editingPatient.medicalHistory.map((h) => ({
              diagnosis: h.diagnosis || "",
              treatment: h.treatment || "",
              prescription: h.prescription || "",
              date: h.date || "",
            }))
          : [{ diagnosis: "", treatment: "", prescription: "", date: "" }],
        isActive: editingPatient.isActive ?? true,
      });
    }
  }, [editingPatient]);

  // Handle medical history change
  const handleHistoryChange = (index, e) => {
    const { name, value } = e.target;
    const updatedHistory = [...formData.medicalHistory];
    updatedHistory[index][name] = value;
    setFormData((prev) => ({ ...prev, medicalHistory: updatedHistory }));
  };

  // Add new history record
  const addHistory = () => {
    setFormData((prev) => ({
      ...prev,
      medicalHistory: [
        ...prev.medicalHistory,
        { diagnosis: "", treatment: "", prescription: "", date: "" },
      ],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData, editingPatient?._id);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 bg-white rounded shadow"
    >
      {/* Basic Info */}
      {/* <div>
        <label className="block">Patient ID</label>
        <input
          type="text"
          name="patientId"
          value={formData.patientId}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />
      </div> */}

      {role === "admin" ? (
        <div>
          <label className="block">Doctor ID</label>
          <input
            type="text"
            name="doctorId"
            value={formData.doctorId}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />
        </div>
      ) : null}

      <div>
        <label className="block">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />
      </div>

      <div className="flex gap-4">
        <div>
          <label className="block">Age</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            min="0"
            max="150"
            required
            className="border p-2 w-full rounded"
          />        </div>

        <div>
          <label className="block">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          >
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block">Phone</label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />
      </div>

      <div>
        <label className="block">Address</label>
        <textarea
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />
      </div>

      {/* Medical History Section */}
      <div className="border-t pt-4">
        <h3 className="font-bold mb-2">Medical History</h3>
        {formData.medicalHistory.map((history, index) => (
          <div key={index} className="border p-3 mb-3 rounded bg-gray-50">
            <div>
              <label className="block">Diagnosis</label>
              <input
                type="text"
                name="diagnosis"
                value={history.diagnosis}
                onChange={(e) => handleHistoryChange(index, e)}
                className="border p-2 w-full rounded"
              />
            </div>

            <div>
              <label className="block">Treatment</label>
              <input
                type="text"
                name="treatment"
                value={history.treatment}
                onChange={(e) => handleHistoryChange(index, e)}
                className="border p-2 w-full rounded"
              />
            </div>

            <div>
              <label className="block">Prescription</label>
              <input
                type="text"
                name="prescription"
                value={history.prescription}
                onChange={(e) => handleHistoryChange(index, e)}
                className="border p-2 w-full rounded"
              />
            </div>

            <div>
              <label className="block">Date</label>
              <input
                type="date"
                name="date"
               value={history.date ? new Date(history.date).toISOString().split("T")[0] : ""}
                onChange={(e) => handleHistoryChange(index, e)}
                className="border p-2 w-full rounded"
              />            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={addHistory}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          + Add Medical Record
        </button>
      </div>

      {/* Active Status */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          name="isActive"
          checked={formData.isActive}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, isActive: e.target.checked }))
          }
        />
        <label>Active</label>
      </div>

      {/* Submit */}
      <div className="flex space-x-2">
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {editingPatient ? "Update Patient" : "Create Patient"}
        </button>
        <button
          type="button"
          onClick={onClose}
          className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
