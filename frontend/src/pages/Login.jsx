import React, { useEffect, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import API_PATHS from "../utils/apiPath";
import { useUserContext } from "../context/UserContext";
import { toast } from "react-toastify";
import login from "../assets/login.png";
import { Stethoscope } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [redirectRole, setRedirectRole] = useState(null);
  const { setHasFetched, setDoctorDetails } = useUserContext();

  //for accesing the route in browser url and user logged in it will redirect

  if (redirectRole === "admin") return <Navigate to="/admin" />;
  if (redirectRole === "doctor") return <Navigate to="/doctor" />;

  useEffect(() => {
    const role = localStorage.getItem("role");
    const token = localStorage.getItem("token");
    if (role && token) {
      setRedirectRole(role);
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let errors = {};
    if (!formData.username) {
      errors.username = "Username is required";
    }
    if (!formData.password) {
      errors.password = "Password is required";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const res = await axiosInstance.post(API_PATHS.LOGIN, formData);

      // localStorage.setItem("token", res.data.token);
      // localStorage.setItem("role", res.data.role);
      // setDoctorDetails({ name: res.data?.name, docId: res.data?.docId });
      // setMessage({ type: "success", text: "Login successful!" });
      // toast.success("Login successfully!");
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      // 🩺 Save full doctor details to both context + localStorage
      const doctorInfo = {
        name: res.data?.name || res.data?.doctorProfile?.name,
        docId: res.data?.docId,
      };

      setDoctorDetails(doctorInfo);
      localStorage.setItem("doctorDetails", JSON.stringify(doctorInfo));

      setMessage({ type: "success", text: "Login successful!" });
      toast.success("Login successfully!");

      setFormData({ username: "", password: "" });

      setTimeout(() => {
        setHasFetched(false);
        if (res.data.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/doctor");
        }
      }, 1500);
    } catch (err) {
      setMessage({
        type: "error",
        text: err.response?.data?.error || "Login failed",
      });
      toast.error(err.response?.data?.error || "Login failed");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center bg-linear-to-br from-[#AEE0DC] to-[#E8F0EF]">
      {/* Left Side - Image Section */}
      <div className="w-full lg:w-1/2 flex justify-center items-center relative">
        <img
          src={login}
          alt="Doctor Illustration"
          // className="w-[85%] h-auto max-h-[520px] object-contain lg:translate-x-10 drop-shadow-xl ml-3 rounded-2xl"
          className="w-full h-[250px] sm:h-[350px] md:h-[400px] lg:h-screen object-cover"
        />
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 sm:px-10 py-0 lg:py-0">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-8 sm:p-10">
          {/* Centered Stethoscope Icon */}
          {/* <div className="flex justify-center mb-6">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                  <Stethoscope className="w-6 h-6 text-white" />
                </div>
              </div>
              <h1 className="text-2xl font-semibold text-center text-gray-800 mb-1">Doctor Desk</h1>
              <p className="text-gray-600 mt-1 text-sm">
                Enter your credentials to continue
              </p>
            </div> */}
          <div className="flex justify-center mb-6">
            <div className="w-12 h-12 rounded-xl bg-linear-to-r from-blue-500 to-purple-600 flex items-center justify-center">
              <Stethoscope className="w-6 h-6 text-white" />
            </div>
          </div>

          {/* TITLE */}
          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-1">
            Doctor Desk
          </h2>
          <p className="text-gray-500 text-center mb-8">
            Enter your credentials to continue
          </p>

          {message && (
            <div
              className={`p-2 rounded-lg mb-6 text-center border ${
                message.type === "success"
                  ? "bg-green-300 border-green-500/50 text-black"
                  : "bg-red-300 border-red-500/50 text-black"
              }`}
            >
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Username
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="username"
                  placeholder="Enter your username"
                  value={formData.username}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-gray-700/80 border rounded-lg focus:outline-none focus:ring-2 text-white placeholder-gray-400 transition-all ${
                    errors.username
                      ? "border-red-500 focus:ring-red-500/50"
                      : "border-gray-600/70 focus:ring-blue-500/50 focus:border-blue-400"
                  }`}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
              </div>
              {errors.username && (
                <p className="text-red-300 text-sm mt-2 flex items-center">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {errors.username}
                </p>
              )}
            </div>

            <div>
              <label className="block text-gray-800 text-sm font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-gray-700/80 border rounded-lg focus:outline-none focus:ring-2 text-white placeholder-gray-400 transition-all pr-12 ${
                    errors.password
                      ? "border-red-500 focus:ring-red-500/50"
                      : "border-gray-600/70 focus:ring-blue-500/50 focus:border-blue-400"
                  }`}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-200 transition-colors"
                >
                  {showPassword ? (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-300 text-sm mt-2 flex items-center">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {errors.password}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-linear-to-br from-[#33fae9] to-[#acd4cf] hover:from-[#38e4d5] hover:to-[#e097d8]  text-black font-bold py-3 rounded-lg transition-all duration-300 transform hover:scale-[1.02] focus:ring-4 focus:ring-blue-500/30 shadow-lg"
            >
              Login
            </button>
          </form>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
};

export default Login;
