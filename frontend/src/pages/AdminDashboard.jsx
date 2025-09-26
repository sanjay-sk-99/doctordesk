import React, { useState, useEffect } from "react";
import { Eye, EyeOff} from "lucide-react"
import axios from "axios";

const AdminDashboard = () => {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [filterCategory, setFilterCategory] = useState("All");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
    specialization: "",
    phone: "",
    category: "Senior",
  });
  const [showPassword, setShowPassword]= useState(false)

  // Fetch doctors
  const fetchDoctors = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:8000/api/v1/admin/getdoc", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDoctors(res.data || []);
      setFilteredDoctors(res.data || []);
    } catch (err) {
      console.error(
        "Error fetching doctors",
        err.response?.data || err.message
      );
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  // Filter doctors by category
  useEffect(() => {
    if (filterCategory === "All") {
      setFilteredDoctors(doctors);
    } else {
      setFilteredDoctors(
        doctors.filter((doc) => doc.doctorProfile?.category === filterCategory)
      );
    }
  }, [filterCategory, doctors]);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:8000/api/v1/admin/createdoc",
        {
          username: formData.username,
          email: formData.email,
          password: formData.password,
          role: "doctor",
          doctorProfile: {
            name: formData.name,
            specialization: formData.specialization,
            phone: formData.phone,
            category: formData.category,
          },
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Doctor created successfully!");
      setFormData({
        username: "",
        email: "",
        password: "",
        name: "",
        specialization: "",
        phone: "",
        category: "Senior",
      });
      fetchDoctors(); // Refresh doctor list
    } catch (err) {
      console.error("Error creating doctor", err.response?.data || err.message);
      alert(err.response?.data?.message || "Failed to create doctor");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2> 
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-10 px-4">
      <div className="max-w-3xl w-full bg-white shadow-2xl rounded-2xl p-8 border border-gray-100">
        <h2 className="text-3xl font-bold text-blue-600 mb-4 text-center">
          Create Doctor Profile
        </h2>
        <p className="text-gray-500 text-center mb-6">
          Fill in the details below to add a doctor.
        </p>
        <hr className="mb-6" />

        <form onSubmit={handleSubmit} autoComplete="off">
          <table className="w-full border-separate border-spacing-y-4">
            <tbody>
              {/* Username */}
              <tr>
                <td className="w-1/3 text-gray-700 font-medium">Username</td>
                <td>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none"
                    placeholder="Enter username"
                    required
                  />
                </td>
              </tr>

              {/* Email */}
              <tr>
                <td className="text-gray-700 font-medium">Email</td>
                <td>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none"
                    placeholder="Enter email"
                    required
                  />
                </td>
              </tr>

              {/* Password */}
              <tr>
                <td className="text-gray-700 font-medium">Password</td>
                <td className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none"
                    placeholder="Enter password"
                    autoComplete="new-password"
                    required
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 cursor-pointer"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </span>
                </td>
              </tr>

              {/* Full Name */}
              <tr>
                <td className="text-gray-700 font-medium">Full Name</td>
                <td>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none"
                    placeholder="Enter full name"
                    required
                  />
                </td>
              </tr>

              {/* Specialization */}
              <tr>
                <td className="text-gray-700 font-medium">Specialization</td>
                <td>
                  <input
                    type="text"
                    name="specialization"
                    value={formData.specialization}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none"
                    placeholder="Enter specialization"
                    required
                  />
                </td>
              </tr>

              {/* Phone */}
              <tr>
                <td className="text-gray-700 font-medium">Phone Number</td>
                <td>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none"
                    placeholder="Enter phone number"
                    required
                  />
                </td>
              </tr>

              {/* Category */}
              <tr>
                <td className="text-gray-700 font-medium">Category</td>
                <td>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none"
                  >
                    <option value="Senior">Senior</option>
                    <option value="Junior">Junior</option>
                    <option value="Intern">Intern</option>
                  </select>
                </td>
              </tr>
            </tbody>
          </table>

          {/* Submit Button */}
          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-lg font-semibold shadow-lg hover:from-indigo-600 hover:to-blue-500 transition duration-300"
            >
              Create Doctor
            </button>
          </div>
        </form>
      </div>
    </div>



      {/* Filter */}
      <h3 className="text-xl font-semibold mb-2">Doctors List</h3>
      <select
        value={filterCategory}
        onChange={(e) => setFilterCategory(e.target.value)}
        className="border p-2 mb-4"
      >
        <option value="All">All</option>
        <option value="Senior">Senior</option>
        <option value="Junior">Junior</option>
        <option value="Intern">Intern</option>
      </select>

      {/* Doctors Table */}
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Name</th>
            <th className="border p-2">Specialization</th>
            <th className="border p-2">Phone</th>
            <th className="border p-2">Category</th>
          </tr>
        </thead>
        <tbody>
          {filteredDoctors.length > 0 ? (
            filteredDoctors.map((doc) => (
              <tr key={doc._id} className="hover:bg-gray-100">
                <td className="border p-2">{doc.doctorProfile?.name}</td>
                <td className="border p-2">
                  {doc.doctorProfile?.specialization}
                </td>
                <td className="border p-2">{doc.doctorProfile?.phone}</td>
                <td className="border p-2">{doc.doctorProfile?.category}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center p-4 text-gray-500">
                No doctors found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
