import { NavLink, useLocation } from "react-router-dom";
import {
  Stethoscope,
  LayoutDashboard,
  User,
  Users,
  LogOut,
} from "lucide-react";
import { useFormContext } from "../../context/FormContext";

const Sidebar = ({ isSidebarOpen, role, handleLogout, closeSidebar }) => {
  const { setType } = useFormContext();
  const location = useLocation();
  const isDashboardActive =
    location.pathname === "/admin" ||
    location.pathname === "/admin/dashboard" ||
    location.pathname === "/doctor" ||
    location.pathname === "/doctor/dashboard";

    const handleNavClick = () => {
  // Close sidebar only in mobile view
  if (window.innerWidth < 1024) {
    closeSidebar();
  }
};


  return (
    <div
      className={`
      fixed lg:static inset-y-0 left-0 z-30
      w-56 sm:w-60 md:w-64 bg-white text-gray-700 
      transform transition-transform duration-300 ease-in-out
      flex flex-col shadow-lg border-r border-gray-200
      ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      ${window.innerWidth < 1024 ? "fixed top-[75px]" : "fixed"}  
    `}
    >
      {/* Sidebar Header */}
      <div className="p-3 sm:p-4 md:p-4 border-b border-gray-200">
        <div className="flex items-center space-x-3 sm:space-x-4">
          <div className="w-9 h-9 sm:w-10 sm:h-10 bg-linear-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow">
            <Stethoscope className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </div>
          <div>
            <h1 className="text-md sm:text-lg md:text-lg font-bold text-gray-800">DoctorDesk</h1>
            <p className="text-gray-500 text-[10px] sm:text-xs md:text-sm">Medical Management</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col p-3 sm:p-4 space-y-1">
        {role === "admin" && (
          <>
            <NavLink
              to="/admin/dashboard"
              className={`flex items-center p-2 sm:p-3 rounded-xl transition-all duration-200 group ${
                isDashboardActive
                  ? "bg-blue-50 text-blue-600 border-l-3 border-blue-500 shadow-sm"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
              onClick={() => {
                setType("dashboard")
                handleNavClick();                
              } }
            >
              <LayoutDashboard className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3" />
              <span className="font-medium text-xs sm:text-sm md:text-base">Admin Dashboard</span>
            </NavLink>
            <NavLink
              to="/admin/doctors"
              className={({ isActive }) =>
                `flex items-center p-2 sm:p-3 rounded-xl transition-all duration-200 group ${
                  isActive
                    ? "bg-green-50 text-green-600 border-l-3 border-green-500 shadow-sm"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`
              }
              onClick={() => {
                setType("doctor")
                handleNavClick(); 
              }}
            >
              <User className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3" />
              <span className="font-medium text-xs sm:text-sm md:text-base">Doctors Dashboard</span>
            </NavLink>
            <NavLink
              to="/admin/patients"
              className={({ isActive }) =>
                `flex items-center p-2 sm:p-3 rounded-xl transition-all duration-200 group ${
                  isActive
                    ? "bg-purple-50 text-purple-600 border-l-3 border-purple-500 shadow-sm"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`
              }
              onClick={() => {
                setType("patient")
                handleNavClick(); 
              }}
            >
              <Users className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3" />
              <span className="font-medium text-xs sm:text-sm md:text-base">Patients Dashboard</span>
            </NavLink>
          </>
        )}
        {role === "doctor" && (
          <>
            <NavLink
              to="/doctor/dashboard"
              className={`flex items-center p-2 sm:p-3 rounded-xl transition-all duration-200 group ${
                isDashboardActive
                  ? "bg-blue-50 text-blue-600 border-l-3 border-blue-500 shadow-sm"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
              onClick={() => {
                setType("dashboard")  
                handleNavClick(); 
              }}
            >
              <LayoutDashboard className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3" />
              <span className="font-medium text-xs sm:text-sm md:text-sm">Doctor Dashboard</span>
            </NavLink>
            <NavLink
              to="/doctor/patients"
              className={({ isActive }) =>
                `flex items-center p-2 sm:p-3 rounded-xl transition-all duration-200 group ${
                  isActive
                    ? "bg-purple-50 text-purple-600 border-l-3 border-purple-500 shadow-sm"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`
              }
              onClick={() => handleNavClick()}
            >
              <Users className="w-4 h-4 sm:w-5 sm:h-5 mr-3 sm:mr-3" />
              <span className="font-medium text-xs sm:text-sm md:text-sm">My Patients Dashboard</span>
            </NavLink>
          </>
        )}

        {/* Spacer */}
        <div className="flex-1"></div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center p-2 sm:p-3 rounded-xl text-gray-600 hover:bg-red-50 hover:text-red-600 hover:border-l-3 hover:border-red-500 transition-all duration-200 group mt-auto border-t border-gray-200 pt-4"
        >
          <LogOut className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 group-hover:text-red-600" />
          <span className="font-medium text-xs sm:text-sm md:text-base">Logout</span>
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;
