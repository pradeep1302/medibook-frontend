import React, { useEffect } from "react";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  selectIsLoggedIn,
  selectRole,
} from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import AppointmentSummary from "../../components/appointment/appointmentSummary/AppointmentSummary";
import AppointmentListPat from "../../components/appointment/appointmentList/AppointmentListPat";
import { getAppointmentsPat } from "../../redux/features/appointmentPat/appointmentSlice";

const Patient = () => {
  useRedirectLoggedOutUser("/login");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const role = useSelector(selectRole);

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { patappointments, isLoading, isError, message } = useSelector(
    (state) => state.patappointment
  );
  useEffect(() => {
    if (role != "patient") {
      navigate("/");
      return;
    }

    if (isLoggedIn === true) {
      dispatch(getAppointmentsPat());
    }

    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, isError, message, dispatch]);
  return (
    <div>
      <AppointmentSummary />
      <AppointmentListPat
        appointments={patappointments}
        isLoading={isLoading}
      />
    </div>
  );
};

export default Patient;
