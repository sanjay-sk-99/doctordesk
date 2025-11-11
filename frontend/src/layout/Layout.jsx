import React, { useState, useRef, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";
import Sidebar from "../components/dashboard/Sidebar";
import { useUserContext } from "../context/UserContext";
import ShowConfirmToast from "../utils/ShowConfirmToast";

export default function Layout({ role }) {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);
  const { doctorDetails } = useUserContext();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    ShowConfirmToast("Are you sure you want to Logout ?", () => {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      navigate("/login");
    });
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar Overlay for Mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-opacity-50 z-20 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        role={role}
        handleLogout={handleLogout}
        closeSidebar={() => setIsSidebarOpen(false)}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 z-10">
          <div className="flex items-center justify-between p-4 sm:p-5 md:p-3">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="lg:hidden p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <Menu className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-sm sm:text-xl md:text-xl font-bold text-gray-800 leading-tight">
                  {role === "admin"
                    ? "Welcome back, Admin! 👋"
                    : `Welcome back, ${doctorDetails?.name || "Doctor"} 👨‍⚕️`}
                </h1>
                <p className="text-gray-600 text-xs sm:text-sm md:text-sm mt-1">
                  {role === "admin"
                    ? "Manage your healthcare system efficiently"
                    : "Take care of your patients with ease"}
                </p>
              </div>
            </div>

            {/* User Info */}
            <div className="flex items-center space-x-4">
              <div className="text-right hidden md:block">
                <p className="font-semibold text-gray-800 capitalize">{role}</p>
              </div>
              <div ref={dropdownRef}>
              <div
                className="w-9 h-9 sm:w-10 sm:h-10 bg-linear-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
              >
                <span className="text-white font-bold text-xs sm:text-sm">
                  {role === "admin" ? "A" : "D"}
                </span>
              </div>
              {/* Dropdown */}
              {isOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-white shadow-lg rounded-lg py-2 z-10">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
          </div>
        </header>
        {/* Page Content */}
        <main className="flex-1 overflow-auto bg-gray-50 p-6">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
