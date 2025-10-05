import React from "react";
import { Edit, Trash2 } from "lucide-react";

const DataTable = ({
  type = "doctor", // "doctor" or "patient"
  data = [],
  filter,
  setFilter,
  onShowForm,
  onEdit,
  onDelete,
  showAddButton = true,
  showFilter = true,
}) => {
  // Determine columns based on type
  const isDoctor = type === "doctor";

  const columns = isDoctor
    ? [
        { key: "doctorId", label: "Doctor ID" },
        { key: "name", label: "Name" },
        { key: "specialization", label: "Specialization" },
        { key: "phone", label: "Phone" },
        { key: "category", label: "Category" },
        { key: "status", label: "Status" },
        { key: "actions", label: "Actions" },
      ]
    : [
        { key: "patientId", label: "Patient ID" },
        { key: "doctorId", label: "Doctor ID" },
        { key: "name", label: "Name" },
        { key: "age", label: "Age" },
        { key: "gender", label: "Gender" },
        { key: "phone", label: "Phone" },
        { key: "address", label: "Address" },
        { key: "medicalRecords", label: "Medical Records" },
        { key: "status", label: "Status" },
        { key: "actions", label: "Actions" },
      ];

  // Get cell value based on type
  const getCellValue = (item, key) => {
    switch (key) {
      case "doctorId":
        return item.doctorId || item.doctor?.doctorId || "N/A";
      case "patientId":
        return item.patientId || "N/A";
      case "name":
        return (
          item.doctorProfile?.name ||
          item.patientProfile?.name ||
          item.name ||
          "N/A"
        );
      case "specialization":
        return (
          item.doctorProfile?.specialization || item.specialization || "N/A"
        );
      case "age":
        return item.patientProfile?.age || item.age || "N/A";
      case "gender":
        return item.patientProfile?.gender || item.gender || "N/A";
      case "phone":
        return (
          item.doctorProfile?.phone ||
          item.patientProfile?.phone ||
          item.phone ||
          "N/A"
        );
      case "address":
        return item.patientProfile?.address || item.address || "N/A";
      case "medicalRecords":
        const records =
          item.patientProfile?.medicalHistory || item.medicalHistory;
        return records && records.length > 0
          ? `${records.length} record(s)`
          : "No records";
      case "category":
        return item.doctorProfile?.category || item.category || "N/A";
      case "status":
        return item.isActive ? "✅ Active" : "❌ Inactive";
      default:
        return "";
    }
  };

  return (
    <div className="overflow-x-auto mt-4">
      <header className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <h1 className="text-xl font-bold">
            {isDoctor ? "Doctors" : "Patients"}
          </h1>
          {showFilter && (
            <div className="ps-5">
              <label>Filter: </label>
              <select
                className="border p-2 ml-2 rounded"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="">All</option>
                <option value="Junior">Junior</option>
                <option value="Senior">Senior</option>
                <option value="Intern">Intern</option>
              </select>
            </div>
          )}
        </div>

        {showAddButton && onShowForm && (
          <button
            onClick={() => onShowForm(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add {isDoctor ? "Doctor" : "Patient"}
          </button>
        )}
      </header>

      <table className="w-full border border-gray-300 rounded-lg shadow-md">
        <thead className="bg-gray-100">
          <tr>
            {columns.map((col) => (
              <th key={col.key} className="border p-3">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item) => (
              <tr key={item._id} className="hover:bg-gray-50">
                {columns.map((col) => (
                  <td key={col.key} className="border p-3">
                    {col.key === "actions" ? (
                      <div className="flex space-x-2 justify-center">
                        {onEdit && (
                          <button
                            onClick={() => onEdit(item)}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <Edit size={18} />
                          </button>
                        )}
                        {onDelete && (
                          <button
                            onClick={() => onDelete(item._id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 size={18} />
                          </button>
                        )}
                      </div>
                    ) : (
                      getCellValue(item, col.key)
                    )}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length}
                className="text-center p-4 text-gray-500"
              >
                No {isDoctor ? "doctors" : "patients"} found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
