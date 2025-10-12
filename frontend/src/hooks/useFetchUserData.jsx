import { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import axiosInstance from "../utils/axiosInstance";
import API_PATHS from "../utils/apiPath";
import { useUserContext } from "../context/UserContext";

export default function useFetchUserData(role, token) {
  const { setDoctorData, setPatientData, hasFetched, setHasFetched } =
    useUserContext();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(
    async (force = false) => {
      if (!token || !role) {
        setLoading(false);
        return;
      }

      // Skip only if already fetched and not forced
      if (hasFetched && !force) {
        setLoading(false);
        return;
      }

      try {
        if (role === "admin") {
          const [doctorsRes, patientsRes] = await Promise.allSettled([
            axiosInstance.get(API_PATHS.GET_DOCTORS),
            axiosInstance.get(API_PATHS.GET_PATIENTS),
          ]);

          const doctors =
            doctorsRes.status === "fulfilled" ? doctorsRes.value.data : [];
          const patients =
            patientsRes.status === "fulfilled" ? patientsRes.value.data : [];

          setDoctorData(doctors);
          setPatientData(patients);
        } else if (role === "doctor") {
          const response = await axiosInstance.get(API_PATHS.GET_MY_PATIENTS);
          setPatientData(response.data || []);
        }

        setHasFetched(true);
        setError(null);
      } catch (err) {
        const msg = err.response?.data?.message || "Unexpected error occurred";
        setError(msg);
        toast.error(msg);
      } finally {
        setLoading(false);
      }
    },
    [role, token, hasFetched, setDoctorData, setPatientData, setHasFetched]
  );

  // Run on mount
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { loading, error, refetch: () => fetchData(true) };
}
