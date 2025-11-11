import React, { createContext, useContext, useState, useEffect } from "react";


const UserContext = createContext();


export const UserProvider = ({ children }) => {
  const [doctorData,setDoctorData]=useState([])
  const [doctorDetails,setDoctorDetails]=useState({})
  const [patientData,setPatientData]=useState([])
  const [hasFetched,setHasFetched]=useState(false)

    // Restore doctorDetails from localStorage on refresh
  useEffect(() => {
    const storedDoctor = localStorage.getItem("doctorDetails");
    if (storedDoctor) {
      setDoctorDetails(JSON.parse(storedDoctor));
    }
  }, []);

  return (
    <UserContext.Provider value={{ doctorData,setDoctorData,patientData,setPatientData,hasFetched,setHasFetched, doctorDetails, setDoctorDetails }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the context easily
export const useUserContext = () => {
  return useContext(UserContext);
};
