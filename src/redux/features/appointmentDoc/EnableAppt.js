import React, { useEffect, useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import "./enableApt.css";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import {
  SET_ID,
  SET_LOGIN,
  selectId,
  selectIsLoggedIn,
  selectRole,
} from "../auth/authSlice";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import useRedirectLoggedOutUser from "../../../customHook/useRedirectLoggedOutUser";
import { getLoginStatus, getUser } from "../../../services/authService";
import { SpinnerImg } from "../../../components/loader/Loader";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const API_URL = `${BACKEND_URL}/api/appointments`;

export default function EnableAppt() {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const id = useSelector(selectId);
  const role = useSelector(selectRole);
  const [date, setdate] = useState(new Date());
  const [maxSize, setmaxSize] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const today = new Date();

  useEffect(() => {
    if (role !== "doctor") {
      navigate("/doctor");
      return;
    }
    if (isLoggedIn === true) {
      getDate();
    }
  }, [dispatch, navigate, date, role, isLoggedIn]);
  const getDate = async () => {
    setIsLoading(true);
    try {
      const formData = {
        date,
      };
      const { data } = await axios.post(`${API_URL}/get-date/${id}`, formData);
      if (!data) setmaxSize(0);
      else setmaxSize(data.maxSize);
      setIsLoading(false);
    } catch (error) {
      toast.error(error.message);
      setIsLoading(false);
    }
  };

  const register = async (e) => {
    const formData = {
      date,
      maxSize,
    };
    e.preventDefault();
    if (!formData.date || !formData.maxSize) {
      return toast.error("All fields are required");
    }
    setIsLoading(true);
    try {
      const { data } = await axios.post(`${API_URL}/start/`, formData);
      if (data) toast.success("Appointment created");
      else {
        toast.error(data.message);
      }
      getDate();
      setIsLoading(false);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      toast.error(message);
      setIsLoading(false);
      return false;
    }
  };
  const handleInputChange = (e) => {
    setmaxSize(e.target.value);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {isLoading && <SpinnerImg />}
      <div style={{ width: "350px" }}>
        <form onSubmit={register}>
          <DateCalendar
            sx={{
              button: {
                fontSize: "15px",
              },
              div: {
                fontSize: "15px",
                color: "grey",
              },
              span: {
                fontSize: "15px",
              },
            }}
            minDate={dayjs(today)}
            value={dayjs(date)}
            onChange={(newValue) => setdate(newValue.$d)}
          />
          <label
            htmlFor="maxlimit"
            style={{ fontSize: "20px" }}
            className="form-label"
          >
            Maximum Patients
          </label>
          <input
            type="text"
            className="form-control"
            id="maxlimit"
            value={maxSize}
            onChange={handleInputChange}
            style={{ fontSize: "20px", width: "200px" }}
          />
          <button
            className="btn btn-primary btn-lg"
            style={{ marginTop: "20px" }}
            type="submit"
          >
            Make Changes
          </button>
        </form>
      </div>
    </LocalizationProvider>
  );
}
