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

  // Remove medical history record
  const removeHistory = (index) => {
    if (formData.medicalHistory.length > 1) {
      const updatedHistory = formData.medicalHistory.filter((_, i) => i !== index);
      setFormData((prev) => ({ ...prev, medicalHistory: updatedHistory }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData, editingPatient?._id);
  };

  return (
    <div className="max-w-6xl mx-auto mb-6 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Form Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
        <h2 className="text-xl font-bold text-white">
          {editingPatient ? "Update Patient Record" : "Create New Patient"}
        </h2>
        <p className="text-blue-100 text-sm">
          {editingPatient ? "Modify patient information" : "Add new patient to the system"}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {/* Basic Information Section */}
        <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Basic Information
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {role === "admin" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Doctor ID
                </label>
                <input
                  type="text"
                  name="doctorId"
                  value={formData.doctorId}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter doctor ID"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Enter patient's full name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Age *
              </label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                min="0"
                max="150"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Enter age"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gender *
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Enter phone number"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows="3"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                placeholder="Enter complete address"
              />
            </div>
          </div>
        </div>

        {/* Medical History Section */}
        <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center">
              <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              Medical History
            </h3>
            <button
              type="button"
              onClick={addHistory}
              className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm font-medium"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Record
            </button>
          </div>

          <div className="space-y-4">
            {formData.medicalHistory.map((history, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-gray-700">Record #{index + 1}</h4>
                  {formData.medicalHistory.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeHistory(index)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Diagnosis
                    </label>
                    <input
                      type="text"
                      name="diagnosis"
                      value={history.diagnosis}
                      onChange={(e) => handleHistoryChange(index, e)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="Enter diagnosis"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Treatment
                    </label>
                    <input
                      type="text"
                      name="treatment"
                      value={history.treatment}
                      onChange={(e) => handleHistoryChange(index, e)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="Enter treatment"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={history.date ? new Date(history.date).toISOString().split("T")[0] : ""}
                      onChange={(e) => handleHistoryChange(index, e)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Prescription
                    </label>
                    <textarea
                      name="prescription"
                      value={history.prescription}
                      onChange={(e) => handleHistoryChange(index, e)}
                      rows="2"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                      placeholder="Enter prescription details"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Status Section */}
        <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <svg className="w-5 h-5 mr-2 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Status
          </h3>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="isActive"
              name="isActive"
              checked={formData.isActive}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, isActive: e.target.checked }))
              }
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="isActive" className="ml-2 text-sm font-medium text-gray-700">
              Patient is currently active and receiving treatment
            </label>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            {editingPatient ? "Update Patient" : "Create Patient"}
          </button>
        </div>
      </form>
    </div>
  );
}