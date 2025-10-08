import React, { useMemo, useState } from "react";
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
} from "lucide-react";

const DataTable = ({
  type = "doctor",
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
          <div className="flex space-x-2 justify-center">
            {onEdit && (
              <button
                onClick={() => onEdit(row.original)}
                className="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors"
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
          <div className="flex space-x-2 justify-center">
            {onEdit && (
              <button
                onClick={() => onEdit(row.original)}
                className="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors"
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
  }, [isDoctor, onEdit, onDelete]);

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
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
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
                  <tr
                    key={row.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className="px-6 py-4 text-sm text-gray-700 whitespace-nowrap"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
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
        {filteredData.length > 0 && (
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* Rows per page */}
              <div className="flex items-center gap-2">
                <label className="text-sm text-gray-700">Rows per page:</label>
                <select
                  value={table.getState().pagination.pageSize}
                  onChange={(e) => {
                    table.setPageSize(Number(e.target.value));
                  }}
                  className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {[5, 10, 20, 30, 50].map((pageSize) => (
                    <option key={pageSize} value={pageSize}>
                      {pageSize}
                    </option>
                  ))}
                </select>
              </div>

              {/* Page info */}
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <span>
                  Page {table.getState().pagination.pageIndex + 1} of{" "}
                  {table.getPageCount()}
                </span>
                <span className="text-gray-400">|</span>
                <span>
                  {table.getFilteredRowModel().rows.length} total records
                </span>
              </div>

              {/* Navigation buttons */}
              <div className="flex items-center gap-1">
                <button
                  onClick={() => table.setPageIndex(0)}
                  disabled={!table.getCanPreviousPage()}
                  className="p-2 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  title="First page"
                >
                  <ChevronsLeft size={18} />
                </button>
                <button
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                  className="p-2 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  title="Previous page"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                  className="p-2 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  title="Next page"
                >
                  <ChevronRight size={18} />
                </button>
                <button
                  onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                  disabled={!table.getCanNextPage()}
                  className="p-2 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  title="Last page"
                >
                  <ChevronsRight size={18} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DataTable;
