import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const API_URL = `${BACKEND_URL}/api/appointments/`;

// Start Appointment
const startAppointment = async (formData) => {
  const response = await axios.post(`${API_URL}/start/`, formData);
  return response.data;
};

// Get all appointment for Doctor
const getAppointmentsDoc = async (formData) => {
  const response = await axios.post(
    `${API_URL}/get-appointments/doctor/`,
    formData
  );
  return response.data;
};

// Update status
const updateStatus = async (id, formData) => {
  const response = await axios.patch(
    `${API_URL}/update-status/${id}`,
    formData
  );
  return response.data;
};

const appointmentService = {
  getAppointmentsDoc,
  startAppointment,
  updateStatus,
};

export default appointmentService;
