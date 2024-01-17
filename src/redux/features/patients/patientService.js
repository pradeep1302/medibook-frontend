import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const API_URL = `${BACKEND_URL}/api/users/`;

// Get all patients
const getPatients = async (id) => {
  const response = await axios.get(`${API_URL}/getpatients`);
  return response.data;
};

const patientService = {
  getPatients,
};

export default patientService;
