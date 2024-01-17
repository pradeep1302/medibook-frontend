import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  selectIsLoggedIn,
  selectRole,
} from "../../redux/features/auth/authSlice";
import { getPatients } from "../../redux/features/patients/patientSlice";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import PatientSummary from "../../components/patients/PatientSummary";
import PatientList from "../../components/patients/PatientList";

export default function Patients() {
  useRedirectLoggedOutUser("/login");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const role = useSelector(selectRole);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { patients, isLoading, isError, message } = useSelector(
    (state) => state.patient
  );
  useEffect(() => {
    if (role != "doctor") {
      navigate("/");
      return;
    }

    if (isLoggedIn === true) {
      dispatch(getPatients());
    }

    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, isError, message, dispatch]);
  return (
    <div>
      <PatientSummary />
      <PatientList patients={patients} isLoading={isLoading} />
    </div>
  );
}
