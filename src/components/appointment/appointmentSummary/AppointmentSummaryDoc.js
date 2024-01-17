import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { selectId } from "../../../redux/features/auth/authSlice";

export default function AppointmentSummaryDoc() {
  const navigate = useNavigate();
  const id = useSelector(selectId);
  const handleClick = () => {
    toast.info("Select Date");
    navigate(`/enableAppointment`);
  };
  return (
    <button className="--btn --btn-primary" onClick={handleClick}>
      Enable Appointment
    </button>
  );
}
