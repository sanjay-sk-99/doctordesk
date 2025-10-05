import React, { useState, useEffect } from "react";

export default function DoctorForm({
  onSubmit,
  editingDoctor,
  onClose,
}) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    doctorProfile: {
      name: "",
      specialization: "",
      phone: "",
      category: "",
    },
    isActive: true,
  });

  // Prefill when editing
  useEffect(() => {
    if (editingDoctor) {
      setFormData({
        username: editingDoctor.username || "",
        email: editingDoctor.email || "",
        password: "",
        doctorProfile: {
          name: editingDoctor.doctorProfile?.name || "",
          specialization: editingDoctor.doctorProfile?.specialization || "",
          phone: editingDoctor.doctorProfile?.phone || "",
          category: editingDoctor.doctorProfile?.category || "",
        },
        isActive: editingDoctor.isActive ?? true,
      });
    }
  }, [editingDoctor]);

  // Handle form input
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes("doctorProfile.")) {
      const profileField = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        doctorProfile: {
          ...prev.doctorProfile,
          [profileField]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleActiveChange = () => {
    setFormData((prev) => ({ ...prev, isActive: !prev.isActive }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData, editingDoctor?._id);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 border p-4 rounded-lg shadow mt-4">
      <h3 className="text-lg font-semibold">
        {editingDoctor ? "Update Doctor" : "Create Doctor"}
      </h3>

      <input
        type="text"
        name="username"
        value={formData.username}
        onChange={handleChange}
        placeholder="Username"
        className="border p-2 w-full"
        required
      />

      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        className="border p-2 w-full"
        required
      />

      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder={editingDoctor ? "Enter new password (optional)" : "Password"}
        className="border p-2 w-full"
        required={!editingDoctor}
      />

      <input
        type="text"
        name="doctorProfile.name"
        value={formData.doctorProfile.name}
        onChange={handleChange}
        placeholder="Doctor Name"
        className="border p-2 w-full"
        required
      />

      <input
        type="text"
        name="doctorProfile.specialization"
        value={formData.doctorProfile.specialization}
        onChange={handleChange}
        placeholder="Specialization"
        className="border p-2 w-full"
        required
      />

      <input
        type="text"
        name="doctorProfile.phone"
        value={formData.doctorProfile.phone}
        onChange={handleChange}
        placeholder="Phone"
        className="border p-2 w-full"
        required
      />

      <select
        name="doctorProfile.category"
        value={formData.doctorProfile.category}
        onChange={handleChange}
        className="border p-2 w-full"
        required
      >
        <option value="">Select Category</option>
        <option value="Junior">Junior</option>
        <option value="Senior">Senior</option>
        <option value="Specialist">Specialist</option>
      </select>

      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={formData.isActive}
          onChange={handleActiveChange}
        />
        <span>Active</span>
      </label>

      <div className="flex space-x-2">
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {editingDoctor ? "Update Doctor" : "Create Doctor"}
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
