import { Users } from "lucide-react";
 
 export default function DoctorPatientsTable  ({ doctorId ,doctorPatients,loadingPatients,getCellValue}) {
    const patients = doctorPatients[doctorId] || [];
    const isLoading = loadingPatients[doctorId];

    if (isLoading) {
      return (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="text-sm text-gray-500 mt-2">Loading patients...</p>
        </div>
      );
    }

    if (patients.length === 0) {
      return (
        <div className="text-center py-8 text-gray-500">
          <Users className="mx-auto mb-2 h-12 w-12 text-gray-300" />
          <p className="text-sm">No patients assigned to this doctor</p>
        </div>
      );
    }

    return (
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase">
                Patient ID
              </th>
              <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase">
                Name
              </th>
              <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase">
                Age
              </th>
              <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase">
                Gender
              </th>
              <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase">
                Phone
              </th>
              <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {patients.map((patient, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm text-gray-700">
                  {getCellValue(patient, "patientId")}
                </td>
                <td className="px-4 py-3 text-sm text-gray-700 font-medium">
                  {getCellValue(patient, "name")}
                </td>
                <td className="px-4 py-3 text-sm text-gray-700">
                  {getCellValue(patient, "age")}
                </td>
                <td className="px-4 py-3 text-sm text-gray-700">
                  {getCellValue(patient, "gender")}
                </td>
                <td className="px-4 py-3 text-sm text-gray-700">
                  {getCellValue(patient, "phone")}
                </td>
                <td className="px-4 py-3 text-sm">
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      getCellValue(patient, "status")
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {getCellValue(patient, "status") ? "Active" : "Inactive"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };