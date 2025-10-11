import { NavLink, useLocation } from "react-router-dom";
import {
  Stethoscope,
  LayoutDashboard,
  User,
  Users,
  LogOut,
} from "lucide-react";
import { useFormContext } from "../../context/FormContext";

const Sidebar = ({ isSidebarOpen, role, handleLogout }) => {
  const { setType } = useFormContext();
  const location = useLocation();
  const isDashboardActive =
    location.pathname === "/admin" ||
    location.pathname === "/admin/dashboard" ||
    location.pathname === "/doctor" ||
    location.pathname === "/doctor/dashboard";

  return (
    <div
      className={`
      fixed lg:static inset-y-0 left-0 z-30
      w-64 bg-white text-gray-700 
      transform transition-transform duration-300 ease-in-out
      flex flex-col shadow-lg border-r border-gray-200
      ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
    `}
    >
      {/* Sidebar Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow">
            <Stethoscope className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800">DoctorDesk</h1>
            <p className="text-gray-500 text-xs">Medical Management</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col p-4 space-y-1">
        {role === "admin" && (
          <>
            <NavLink
              to="/admin/dashboard"
              className={`flex items-center p-3 rounded-xl transition-all duration-200 group ${
                isDashboardActive
                  ? "bg-blue-50 text-blue-600 border-l-3 border-blue-500 shadow-sm"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
              onClick={() => setType("dashboard")}
            >
              <LayoutDashboard className="w-4 h-4 mr-3" />
              <span className="font-medium text-sm">Dashboard</span>
            </NavLink>
            <NavLink
              to="/admin/doctors"
              className={({ isActive }) =>
                `flex items-center p-3 rounded-xl transition-all duration-200 group ${
                  isActive
                    ? "bg-green-50 text-green-600 border-l-3 border-green-500 shadow-sm"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`
              }
              onClick={() => setType("doctor")}
            >
              <User className="w-4 h-4 mr-3" />
              <span className="font-medium text-sm">Doctors</span>
            </NavLink>
            <NavLink
              to="/admin/patients"
              className={({ isActive }) =>
                `flex items-center p-3 rounded-xl transition-all duration-200 group ${
                  isActive
                    ? "bg-purple-50 text-purple-600 border-l-3 border-purple-500 shadow-sm"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`
              }
              onClick={() => setType("patient")}
            >
              <Users className="w-4 h-4 mr-3" />
              <span className="font-medium text-sm">Patients</span>
            </NavLink>
          </>
        )}
        {role === "doctor" && (
          <>
            <NavLink
              to="/doctor/dashboard"
              className={`flex items-center p-3 rounded-xl transition-all duration-200 group ${
                isDashboardActive
                  ? "bg-blue-50 text-blue-600 border-l-3 border-blue-500 shadow-sm"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
              onClick={() => setType("dashboard")}
            >
              <LayoutDashboard className="w-4 h-4 mr-3" />
              <span className="font-medium text-sm">Dashboard</span>
            </NavLink>
            <NavLink
              to="/doctor/patients"
              className={({ isActive }) =>
                `flex items-center p-3 rounded-xl transition-all duration-200 group ${
                  isActive
                    ? "bg-purple-50 text-purple-600 border-l-3 border-purple-500 shadow-sm"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`
              }
            >
              <Users className="w-4 h-4 mr-3" />
              <span className="font-medium text-sm">My Patients</span>
            </NavLink>
          </>
        )}

        {/* Spacer */}
        <div className="flex-1"></div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center p-3 rounded-xl text-gray-600 hover:bg-red-50 hover:text-red-600 hover:border-l-3 hover:border-red-500 transition-all duration-200 group mt-auto border-t border-gray-200 pt-4"
        >
          <LogOut className="w-4 h-4 mr-3 group-hover:text-red-600" />
          <span className="font-medium text-sm">Logout</span>
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;
