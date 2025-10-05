import React, { createContext, useContext, useState } from "react";


const FormContext = createContext();


export const FormProvider = ({ children }) => {
  const [showForm, setShowForm] = useState(false);
  const [type, setType] = useState("");

  return (
    <FormContext.Provider value={{ showForm, setShowForm, type, setType }}>
      {children}
    </FormContext.Provider>
  );
};

// Custom hook to use the context easily
export const useFormContext = () => {
  return useContext(FormContext);
};
