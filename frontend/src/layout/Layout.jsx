import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  Users,
  User,
  LogOut,
  LayoutDashboard,
  Stethoscope,
  Menu,
} from "lucide-react";
import { useFormContext } from "../context/FormContext";
import Sidebar from "../components/Sidebar";

export default function Layout({ role }) {
  const { setType } = useFormContext();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar Overlay for Mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        role={role}
        setType={setType}
        handleLogout={handleLogout}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 z-10">
          <div className="flex items-center justify-between p-6">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="lg:hidden p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <Menu className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  {role === "admin"
                    ? "Welcome back, Admin! 👋"
                    : "Welcome back, Doctor! 👨‍⚕️"}
                </h1>
                <p className="text-gray-600 text-sm mt-1">
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
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow">
                <span className="text-white font-bold text-sm">
                  {role === "admin" ? "A" : "D"}
                </span>
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
