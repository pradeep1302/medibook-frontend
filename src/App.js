import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Layout from "./components/layout/Layout";
import Doctor from "./pages/doctor/Doctor";
import Sidebar from "./components/sidebar/Sidebar";
import Patient from "./pages/patient/Patient";
import Reports from "./pages/reports/Reports";
import { useEffect } from "react";
import axios from "axios";
import { getLoginStatus, getUser } from "./services/authService";
import { SET_ID, SET_LOGIN, SET_ROLE } from "./redux/features/auth/authSlice";
import { useDispatch } from "react-redux";
import Report from "./pages/report/Report";
import Profile from "./pages/profile/Profile";
import EditProfile from "./pages/profile/EditProfile";
import DoctorDetail from "./pages/doctor/DoctorDetail";
import BookAppointment from "./pages/bookappointment/BookAppointment";
import Patients from "./pages/patients/Patients";
import CreateReport from "./pages/createReport/CreateReport";
import UpdateReport from "./pages/updateReport/UpdateReport";
import EnableAppt from "./redux/features/appointmentDoc/EnableAppt";

axios.defaults.withCredentials = true;

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    async function loginStatus() {
      const status = await getLoginStatus();
      dispatch(SET_LOGIN(status));
      if (status) {
        const { role, _id } = await getUser();
        dispatch(SET_ROLE(role));
        dispatch(SET_ID(_id));
      }
    }
    loginStatus();
  }, [dispatch]);

  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/doctor"
          element={
            <Sidebar>
              <Layout>
                <Doctor />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/patient"
          element={
            <Sidebar>
              <Layout>
                <Patient />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/patients"
          element={
            <Sidebar>
              <Layout>
                <Patients />
              </Layout>
            </Sidebar>
          }
        />
        <Route path="/doctor/:id" element={<DoctorDetail />} />
        <Route
          path="/reports/:id"
          element={
            <Sidebar>
              <Layout>
                <Reports />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/enableAppointment"
          element={
            <Sidebar>
              <Layout>
                <EnableAppt />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/createReport/:id"
          element={
            <Sidebar>
              <Layout>
                <CreateReport />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/updateReport/:id"
          element={
            <Sidebar>
              <Layout>
                <UpdateReport />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/profile"
          element={
            <Sidebar>
              <Layout>
                <Profile />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/edit-profile"
          element={
            <Sidebar>
              <Layout>
                <EditProfile />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/book-appointment/:id"
          element={
            <Sidebar>
              <Layout>
                <BookAppointment />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/report/:id"
          element={
            <Sidebar>
              <Report />
            </Sidebar>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
