import React, { createContext, useContext, useState } from "react";


const UserContext = createContext();


export const UserProvider = ({ children }) => {
  const [doctorData,setDoctorData]=useState([])
  const [patientData,setPatientData]=useState([])
  const [hasFetched,setHasFetched]=useState(false)

  return (
    <UserContext.Provider value={{ doctorData,setDoctorData,patientData,setPatientData,hasFetched,setHasFetched }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the context easily
export const useUserContext = () => {
  return useContext(UserContext);
};
