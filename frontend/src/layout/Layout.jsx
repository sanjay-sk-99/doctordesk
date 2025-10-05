import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Users, User, LogOut } from "lucide-react";
import { useFormContext } from "../context/FormContext";

export default function Layout({ role }) {
  const { setType } = useFormContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white flex flex-col">
        <div className="p-6 text-2xl font-bold">DoctorDesk</div>

        <nav className="flex flex-col space-y-2 p-4">
          {role === "admin" && (
            <>
              <NavLink
                to="/admin/maindashboard"
                className={({ isActive }) =>
                  `flex items-center p-2 rounded hover:bg-gray-700 ${
                    isActive ? "bg-gray-700" : ""
                  }`
                }
                onClick={() => setType("dashboard")}
              >
                <User className="mr-2" /> Dashboard
              </NavLink>
              <NavLink
                to="/admin/doctors"
                className={({ isActive }) =>
                  `flex items-center p-2 rounded hover:bg-gray-700 ${
                    isActive ? "bg-gray-700" : ""
                  }`
                }
                onClick={() => setType("doctor")}
              >
                <User className="mr-2" /> Doctors
              </NavLink>
              <NavLink
                to="/admin/patients"
                className={({ isActive }) =>
                  `flex items-center p-2 rounded hover:bg-gray-700 ${
                    isActive ? "bg-gray-700" : ""
                  }`
                }
                onClick={() => setType("patient")}
              >
                <Users className="mr-2" /> Patients
              </NavLink>
            </>
          )}
          {role === "doctor" && (
            <>
              {" "}
              <NavLink
                to="/doctor/maindashboard"
                className={({ isActive }) =>
                  `flex items-center p-2 rounded hover:bg-gray-700 ${
                    isActive ? "bg-gray-700" : ""
                  }`
                }
                onClick={() => setType("dashboard")}
              >
                <User className="mr-2" /> Dashboard
              </NavLink>
              <NavLink
                to="/doctor/patients"
                className={({ isActive }) =>
                  `flex items-center p-2 rounded hover:bg-gray-700 ${
                    isActive ? "bg-gray-700" : ""
                  }`
                }
              >
                <Users className="mr-2" /> My Patients
              </NavLink>
            </>
          )}

          {/* Spacer */}
          <div className="flex-1"></div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="flex items-center p-2 rounded hover:bg-red-600 text-red-500 mt-auto"
          >
            <LogOut className="mr-2" /> Logout
          </button>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 bg-gray-100 p-6 overflow-auto">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold">{role === "admin" ? "Hello, Admin !" : "Hello, Doctor !"}</h1>
        </header>
        <Outlet />
      </div>
    </div>
  );
}
