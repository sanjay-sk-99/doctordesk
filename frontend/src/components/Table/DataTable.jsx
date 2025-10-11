import React, { useEffect, useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  flexRender,
} from "@tanstack/react-table";
import {
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Search,
  X,
  Eye,
  ChevronDown,
  ChevronUp,
  User,
  Calendar,
  Pill,
  FileText,
  Users,
} from "lucide-react";
import DoctorPatientsTable from "./DoctorPatientsTable";
import TablePagination from "./TablePagination";

const DataTable = ({
  type = "doctor",
  fetchDoctorPatients,
  data = [],
  filter,
  setFilter,
  onShowForm,
  onEdit,
  onDelete,
  showAddButton = true,
  showFilter = true,
}) => {
  const isDoctor = type === "doctor";
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedRows, setExpandedRows] = useState({ doctor: new Set(), patient: new Set() });
  const [doctorPatients, setDoctorPatients] = useState({});
  const [loadingPatients, setLoadingPatients] = useState({});
 
  // Toggle row expansion
  const toggleRowExpansion = async (rowId, doctorIdOrPatientObj) => {
    setExpandedRows((prev) => {
      const newSet = new Set(prev[type]);
      if (newSet.has(rowId)) {
        newSet.delete(rowId);
      } else {
        newSet.add(rowId);
        // Only fetch patients if doctor table
        if (isDoctor && doctorIdOrPatientObj && !doctorPatients[doctorIdOrPatientObj]) {
          fetchDoctorPatientsData(doctorIdOrPatientObj);
        }
      }
      return { ...prev, [type]: newSet };
    });
  };

  const fetchDoctorPatientsData = async (doctorId) => {
    setLoadingPatients((prev) => ({ ...prev, [doctorId]: true }));
    try {
      let patients;
      if (fetchDoctorPatients) {
        // Use the passed function if available
        patients = await fetchDoctorPatients(doctorId);
      } else {
        // Fallback to filtering existing data
        patients = data.filter(
          (patient) => getCellValue(patient, "doctorId") === doctorId
        );
      }
      setDoctorPatients((prev) => ({ ...prev, [doctorId]: patients }));
    } catch (err) {
      console.error("Error fetching patients:", err);
      setDoctorPatients((prev) => ({ ...prev, [doctorId]: [] }));
    } finally {
      setLoadingPatients((prev) => ({ ...prev, [doctorId]: false }));
    }
  };

  // Get cell value helper
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
        return item.isActive;
      default:
        return "";
    }
  };

  // Medical Records Card Component
  const MedicalRecordsCard = ({ records }) => {
    if (!records || records.length === 0) {
      return (
        <div className="text-center py-8 text-gray-500">
          <FileText className="mx-auto mb-2 h-12 w-12 text-gray-300" />
          <p className="text-sm">No medical records available</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {records.map((record, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-gray-800 flex items-center">
                <FileText className="h-4 w-4 mr-2 text-blue-500" />
                Record #{index + 1}
              </h4>
              {record.date && (
                <span className="text-xs text-gray-500 flex items-center">
                  <Calendar className="h-3 w-3 mr-1" />
                  {new Date(record.date).toLocaleDateString()}
                </span>
              )}
            </div>

            <div className="space-y-2">
              <div>
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Diagnosis
                </label>
                <p className="text-sm text-gray-800 mt-1">
                  {record.diagnosis || "Not specified"}
                </p>
              </div>

              <div>
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Treatment
                </label>
                <p className="text-sm text-gray-800 mt-1">
                  {record.treatment || "Not specified"}
                </p>
              </div>

              {record.prescription && (
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wide flex items-center">
                    <Pill className="h-3 w-3 mr-1" />
                    Prescription
                  </label>
                  <p className="text-sm text-gray-800 mt-1 bg-blue-50 p-2 rounded">
                    {record.prescription}
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };

  // Define columns based on type
  const columns = useMemo(() => {
    const doctorColumns = [
      {
        accessorKey: "doctorId",
        header: "Doctor ID",
        cell: ({ row }) => getCellValue(row.original, "doctorId"),
      },
      {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => getCellValue(row.original, "name"),
      },
      {
        accessorKey: "specialization",
        header: "Specialization",
        cell: ({ row }) => getCellValue(row.original, "specialization"),
      },
      {
        accessorKey: "phone",
        header: "Phone",
        cell: ({ row }) => getCellValue(row.original, "phone"),
      },
      {
        accessorKey: "category",
        header: "Category",
        cell: ({ row }) => (
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
            {getCellValue(row.original, "category")}
          </span>
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
          const isActive = getCellValue(row.original, "status");
          return (
            <span
              className={`px-2 py-1 text-xs font-semibold rounded-full ${
                isActive
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {isActive ? "Active" : "Inactive"}
            </span>
          );
        },
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <div className="">
            <button
              onClick={() =>
                toggleRowExpansion(
                  row.id,
                  getCellValue(row.original, "doctorId")
                )
              }
              className="p-1 pr-2 text-purple-600 hover:bg-purple-50 rounded transition-colors"
              title="View Patients"
            >
              {expandedRows[type].has(row.id) ? (
                <ChevronUp size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>
            {onEdit && (
              <button
                onClick={() => onEdit(row.original)}
                className="p-1 pr-2 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                title="Edit"
              >
                <Edit size={18} />
              </button>
            )}
            {onDelete && (
              <button
                onClick={() => onDelete(row.original._id)}
                className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                title="Delete"
              >
                <Trash2 size={18} />
              </button>
            )}
          </div>
        ),
      },
    ];

    const patientColumns = [
      {
        accessorKey: "patientId",
        header: "Patient ID",
        cell: ({ row }) => getCellValue(row.original, "patientId"),
      },
      {
        accessorKey: "doctorId",
        header: "Doctor ID",
        cell: ({ row }) => getCellValue(row.original, "doctorId"),
      },
      {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => getCellValue(row.original, "name"),
      },
      {
        accessorKey: "age",
        header: "Age",
        cell: ({ row }) => getCellValue(row.original, "age"),
      },
      {
        accessorKey: "gender",
        header: "Gender",
        cell: ({ row }) => getCellValue(row.original, "gender"),
      },
      {
        accessorKey: "phone",
        header: "Phone",
        cell: ({ row }) => getCellValue(row.original, "phone"),
      },
      {
        accessorKey: "address",
        header: "Address",
        cell: ({ row }) => (
          <div
            className="max-w-xs truncate"
            title={getCellValue(row.original, "address")}
          >
            {getCellValue(row.original, "address")}
          </div>
        ),
      },
      {
        accessorKey: "medicalRecords",
        header: "Medical Records",
        cell: ({ row }) => (
          <span className="text-sm text-gray-600">
            {getCellValue(row.original, "medicalRecords")}
          </span>
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
          const isActive = getCellValue(row.original, "status");
          return (
            <span
              className={`px-2 py-1 text-xs font-semibold rounded-full ${
                isActive
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {isActive ? "Active" : "Inactive"}
            </span>
          );
        },
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <div className="">
            <button
              onClick={() => toggleRowExpansion(row.id,row.original)}
              className="p-1 pr-2 text-purple-600 hover:bg-purple-50 rounded transition-colors"
              title="View Medical Records"
            >
              {expandedRows[type].has(row.id) ? (
                <ChevronUp size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>
            {onEdit && (
              <button
                onClick={() => onEdit(row.original)}
                className="p-1 pr-2 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                title="Edit"
              >
                <Edit size={18} />
              </button>
            )}
            {onDelete && (
              <button
                onClick={() => onDelete(row.original._id)}
                className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                title="Delete"
              >
                <Trash2 size={18} />
              </button>
            )}
          </div>
        ),
      },
    ];

    return isDoctor ? doctorColumns : patientColumns;
  }, [isDoctor, onEdit, onDelete, expandedRows]);

  // Filter data based on search query
  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) return data;

    return data.filter((item) => {
      const name = getCellValue(item, "name").toLowerCase();
      return name.includes(searchQuery.toLowerCase());
    });
  }, [data, searchQuery]);

  // Clear search
  const handleClearSearch = () => {
    setSearchQuery("");
  };

  // Initialize table
  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onPaginationChange: setPagination,
    state: {
      pagination,
    },
  });

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 flex-1">
          <h1 className="text-2xl font-bold text-gray-800">
            {isDoctor ? "Doctors" : "Patients"}
          </h1>

          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
            {searchQuery && (
              <button
                onClick={handleClearSearch}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                title="Clear search"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>

          {showFilter && (
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700">
                Filter:
              </label>
              <select
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-sm whitespace-nowrap"
          >
            + Add {isDoctor ? "Doctor" : "Patient"}
          </button>
        )}
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
        <div className="w-full max-w-7xl mx-auto overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead className="bg-gray-50 border-b border-gray-200">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-3 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="divide-y divide-gray-200">
              {table.getRowModel().rows.length > 0 ? (
                table.getRowModel().rows.map((row) => (
                  <React.Fragment key={row.id}>
                    <tr className="hover:bg-gray-50 transition-colors">
                      {row.getVisibleCells().map((cell) => (
                        <td
                          key={cell.id}
                          className="px-3 py-2 text-sm text-gray-700 whitespace-nowrap"
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      ))}
                    </tr>
                    {/* Expanded Row Content */}
                    {expandedRows[type].has(row.id) && (
                      <tr>
                        <td
                          colSpan={columns.length}
                          className="px-6 py-6 bg-gradient-to-r from-blue-50 to-purple-50"
                        >
                          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-inner">
                            <div className="mb-4 pb-3 border-b border-gray-200">
                              <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                                {isDoctor ? (
                                  <>
                                    <Users className="h-5 w-5 mr-2 text-purple-500" />
                                    Patients of Dr.{" "}
                                    {getCellValue(row.original, "name")}
                                  </>
                                ) : (
                                  <>
                                    <FileText className="h-5 w-5 mr-2 text-green-500" />
                                    Medical Records for{" "}
                                    {getCellValue(row.original, "name")}
                                  </>
                                )}
                              </h3>
                            </div>
                            {isDoctor ? (
                              <DoctorPatientsTable
                                doctorId={getCellValue(
                                  row.original,
                                  "doctorId"
                                )}
                                getCellValue={getCellValue}
                                loadingPatients={loadingPatients}
                                doctorPatients={doctorPatients}
                              />
                            ) : (
                              <MedicalRecordsCard
                                records={
                                  row.original.patientProfile?.medicalHistory ||
                                  row.original.medicalHistory ||
                                  []
                                }
                              />
                            )}
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="px-6 py-8 text-center text-gray-500"
                  >
                    <div className="flex flex-col items-center">
                      <p className="text-lg font-medium">
                        {searchQuery
                          ? `No ${
                              isDoctor ? "doctors" : "patients"
                            } found matching "${searchQuery}"`
                          : `No ${isDoctor ? "doctors" : "patients"} found`}
                      </p>
                      <p className="text-sm text-gray-400 mt-1">
                        {searchQuery
                          ? "Try a different search term"
                          : showAddButton
                          ? "Add one to get started"
                          : ""}
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filteredData.length > 0 && <TablePagination table={table} />}
      </div>
    </div>
  );
};

export default DataTable;
