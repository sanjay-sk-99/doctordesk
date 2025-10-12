import { useUserContext } from "../../context/UserContext";

export default function MainDashboard({ role }) {
  const { doctorData, patientData, doctorDetails } = useUserContext();

  //For doctor dashboard
  const doctorPatients = patientData.filter(
    (pat) => pat.doctorId != doctorDetails.docId
  );

  const activePatientForDoctor = doctorPatients.filter(
    (pat) => pat.isActive === true
  );

  //For admin dashboard
  const activePatientForAdmin = patientData.filter(
    (pat) => pat.isActive === true
  );

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-5">
      {/* Doctor Count Card */}
      {role === "admin" ? (
        <div className="bg-white border border-blue-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-0.5 relative group">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold text-gray-600 mb-1">
                Total Doctors
              </h2>
              <p className="text-3xl font-bold text-blue-600 mb-1">
                {doctorData.length}
              </p>
              <p className="text-xs text-gray-500">Registered professionals</p>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center group-hover:bg-blue-100 transition-colors">
              <svg
                className="w-6 h-6 text-blue-500"
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
        </div>
      ) : null}

      {/* Patient Count Card */}
      <div className="bg-white border border-green-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-0.5 relative group">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold text-gray-600 mb-1">
              Total Patients
            </h2>
            <p className="text-3xl font-bold text-green-600 mb-1">
              {role === "admin"
                ? patientData.length || 0
                : doctorPatients.length || 0}
            </p>
            <p className="text-xs text-gray-500">Patients under care</p>
          </div>
          <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center group-hover:bg-green-100 transition-colors">
            <svg
              className="w-6 h-6 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Active Patient Count Card */}
      <div className="bg-white border border-purple-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-0.5 relative group">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold text-gray-600 mb-1">
              Active Patients
            </h2>
            <p className="text-3xl font-bold text-purple-600 mb-1">
              {role === "admin"
                ? activePatientForAdmin.length || 0
                : activePatientForDoctor.length || 0}
            </p>
            <p className="text-xs text-gray-500">Currently in treatment</p>
          </div>
          <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center group-hover:bg-purple-100 transition-colors">
            <svg
              className="w-6 h-6 text-purple-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
