import React from 'react'

function DoctorDashboard() {
  return (
    <div>DoctorDashboard</div>
  )
}

export default DoctorDashboard
// import React, { useState } from "react";
// import { Eye, EyeOff } from "lucide-react";

// const CreateDoctorFormTable = () => {
//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     password: "",
//     name: "",
//     specialization: "",
//     phone: "",
//     category: "Senior",
//   });

//   const [showPassword, setShowPassword] = useState(false);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Form Submitted:", formData);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex items-center justify-center py-10 px-4">
//       <div className="max-w-3xl w-full bg-white shadow-2xl rounded-2xl p-8 border border-gray-100">
//         <h2 className="text-3xl font-bold text-blue-600 mb-4 text-center">
//           Create Doctor Profile
//         </h2>
//         <p className="text-gray-500 text-center mb-6">
//           Fill in the details below to add a doctor.
//         </p>
//         <hr className="mb-6" />

//         <form onSubmit={handleSubmit} autoComplete="off">
//           <table className="w-full border-separate border-spacing-y-4">
//             <tbody>
//               {/* Username */}
//               <tr>
//                 <td className="w-1/3 text-gray-700 font-medium">Username</td>
//                 <td>
//                   <input
//                     type="text"
//                     name="username"
//                     value={formData.username}
//                     onChange={handleChange}
//                     className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none"
//                     placeholder="Enter username"
//                     required
//                   />
//                 </td>
//               </tr>

//               {/* Email */}
//               <tr>
//                 <td className="text-gray-700 font-medium">Email</td>
//                 <td>
//                   <input
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none"
//                     placeholder="Enter email"
//                     required
//                   />
//                 </td>
//               </tr>

//               {/* Password */}
//               <tr>
//                 <td className="text-gray-700 font-medium">Password</td>
//                 <td className="relative">
//                   <input
//                     type={showPassword ? "text" : "password"}
//                     name="password"
//                     value={formData.password}
//                     onChange={handleChange}
//                     className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none"
//                     placeholder="Enter password"
//                     autoComplete="new-password"
//                     required
//                   />
//                   <span
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute right-3 top-3 text-gray-400 cursor-pointer"
//                   >
//                     {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//                   </span>
//                 </td>
//               </tr>

//               {/* Full Name */}
//               <tr>
//                 <td className="text-gray-700 font-medium">Full Name</td>
//                 <td>
//                   <input
//                     type="text"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleChange}
//                     className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none"
//                     placeholder="Enter full name"
//                     required
//                   />
//                 </td>
//               </tr>

//               {/* Specialization */}
//               <tr>
//                 <td className="text-gray-700 font-medium">Specialization</td>
//                 <td>
//                   <input
//                     type="text"
//                     name="specialization"
//                     value={formData.specialization}
//                     onChange={handleChange}
//                     className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none"
//                     placeholder="Enter specialization"
//                     required
//                   />
//                 </td>
//               </tr>

//               {/* Phone */}
//               <tr>
//                 <td className="text-gray-700 font-medium">Phone Number</td>
//                 <td>
//                   <input
//                     type="text"
//                     name="phone"
//                     value={formData.phone}
//                     onChange={handleChange}
//                     className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none"
//                     placeholder="Enter phone number"
//                     required
//                   />
//                 </td>
//               </tr>

//               {/* Category */}
//               <tr>
//                 <td className="text-gray-700 font-medium">Category</td>
//                 <td>
//                   <select
//                     name="category"
//                     value={formData.category}
//                     onChange={handleChange}
//                     className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none"
//                   >
//                     <option value="Senior">Senior</option>
//                     <option value="Junior">Junior</option>
//                     <option value="Intern">Intern</option>
//                   </select>
//                 </td>
//               </tr>
//             </tbody>
//           </table>

//           {/* Submit Button */}
//           <div className="mt-6">
//             <button
//               type="submit"
//               className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-lg font-semibold shadow-lg hover:from-indigo-600 hover:to-blue-500 transition duration-300"
//             >
//               Create Doctor
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CreateDoctorFormTable;
