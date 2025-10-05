const API_PATHS = {
  // Auth
  LOGIN: "/api/v1/auth/login",

  // Admin doctor routes
  CREATE_DOCTOR: "/api/v1/admin/adddoc",
  GET_DOCTORS: "/api/v1/admin/getdoc",
  UPDATE_DOCTOR: (id) => `/api/v1/admin/doctor/${id}`,
  DELETE_DOCTOR: (id) => `/api/v1/admin/doctor/${id}`,

  // Admin patient routes
  CREATE_PATIENT: "/api/v1/admin/addpatient",
  GET_PATIENTS: "/api/v1/admin/getpatient",
  UPDATE_PATIENT: (id) => `/api/v1/admin/patient/${id}`,
  DELETE_PATIENT: (id) => `/api/v1/admin/patient/${id}`,

  // Doctor’s patients
  GET_MY_PATIENTS: "/api/v1/doctor/getpatient",
  CREATE_MY_PATIENT: "/api/v1/doctor/addpatient",
  UPDATE_MY_PATIENT: (id) => `/api/v1/doctor/patient/${id}`,
};

export default API_PATHS;
