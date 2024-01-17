import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function AppointmentSummary() {
  const navigate = useNavigate();
  const handleClick = () => {
    toast.info("Search for Doctor");
    navigate("/");
  };
  return (
    <button className="--btn --btn-primary" onClick={handleClick}>
      Book Appointment
    </button>
  );
}
