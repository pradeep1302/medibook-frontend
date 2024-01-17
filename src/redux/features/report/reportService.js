import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const API_URL = `${BACKEND_URL}/api/reports/`;

// Create New Report
const createReport = async (id, formData) => {
  console.log(id);
  const response = await axios.post(API_URL + id, formData);
  return response.data;
};

// Get all reports
const getReports = async (id) => {
  const response = await axios.get(`${API_URL}/getreports/` + id);
  return response.data;
};

// Get a report
const getReport = async (id) => {
  const response = await axios.get(`${API_URL}/getreport/` + id);
  return response.data;
};
// Update report
const updateReport = async (id, formData) => {
  const response = await axios.patch(`${API_URL}${id}`, formData);
  return response.data;
};

const reportService = {
  createReport,
  getReports,
  getReport,
  updateReport,
};

export default reportService;
