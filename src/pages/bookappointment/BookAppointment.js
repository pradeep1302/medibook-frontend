import React, { useEffect, useState } from "react";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import { useDispatch, useSelector } from "react-redux";
import {
  SET_LOGIN,
  SET_NAME,
  SET_USER,
  selectIsLoggedIn,
  selectRole,
} from "../../redux/features/auth/authSlice";
import { getDoctor, getLoginStatus, getUser } from "../../services/authService";
import { useNavigate, useParams } from "react-router-dom";
import { SpinnerImg } from "../../components/loader/Loader";
import { toast } from "react-toastify";
import axios from "axios";
import DatePickermui from "../../components/mui/DatePickermui";
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const API_URL = `${BACKEND_URL}/api/appointments`;

const initialState = {
  date: new Date(),
  doctor: "",
};

export default function BookAppointment() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const role = useSelector(selectRole);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const [formData, setformData] = useState(initialState);
  const [profile, setProfile] = useState(null);
  const [doctor, setDoctor] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState(false);

  const register = async (e) => {
    e.preventDefault();
    console.log(formData);
    if (!formData.date || !formData.doctor) {
      return toast.error("All fields are required");
    }
    setIsLoading(true);
    try {
      const { data } = await axios.post(`${API_URL}/create/`, formData);
      if (data === true) toast.success("Booking successful");
      else {
        toast.error(data.message);
      }
      navigate("/patient");
      setIsLoading(false);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      setIsLoading(false);
      return false;
    }
  };

  const { id } = useParams();
  useEffect(() => {
    const redirectLoggedOutUser = async () => {
      const isLoggedIn = await getLoginStatus();
      dispatch(SET_LOGIN(isLoggedIn));

      if (!isLoggedIn) {
        toast.info("Please login to continue.");
        navigate("/login");
        return;
      } else {
        if (role === "doctor") {
          navigate("/");
          return;
        }
        setIsLoading(true);

        const p = await getUser();
        setProfile(p);
        await dispatch(SET_USER(p));
        await dispatch(SET_NAME(p.name));
        setIsLoading(false);

        const doctor = await getDoctor(id);
        setformData({ ...formData, doctor: id });
        setDoctor(doctor);
        getDate(id);
      }
    };
    redirectLoggedOutUser();
  }, [navigate, dispatch, formData.date, role, isLoggedIn]);
  const getDate = async (id) => {
    setIsLoading(true);
    try {
      const fData = {
        date: formData.date,
      };
      const { data } = await axios.post(`${API_URL}/get-date/${id}`, formData);
      if (!data) setStatus(false);
      else if (data.currentSize < data.maxSize) setStatus(true);
      else setStatus(false);
      setIsLoading(false);
    } catch (error) {
      toast.error(error.message);
      setIsLoading(false);
    }
  };
  return (
    <div className="col-md-7 col-lg-8" style={{ fontSize: "20px" }}>
      <h4 className="mb-3">Book Appointment</h4>
      <>
        {profile === null || doctor === null ? (
          <></>
        ) : (
          <form onSubmit={register}>
            <div className="row g-3">
              <div>
                <label htmlFor="firstName" className="form-label">
                  Patient Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  placeholder={profile.name}
                  value=""
                  style={{ fontSize: "20px" }}
                  disabled
                />
              </div>
              <div className="col-12">
                <label htmlFor="dob" className="form-label">
                  DOB
                </label>
                <input
                  type="string"
                  className="form-control"
                  id="dob"
                  placeholder={profile.dob}
                  style={{ fontSize: "20px" }}
                  disabled
                />
              </div>

              <div className="col-12">
                <label htmlFor="phone" className="form-label">
                  Phone
                </label>
                <div className="input-group has-validation">
                  <span
                    className="input-group-text"
                    style={{ fontSize: "20px" }}
                  >
                    +91
                  </span>
                  <input
                    type="number"
                    className="form-control"
                    id="phone"
                    placeholder={profile.phone}
                    style={{ fontSize: "20px" }}
                    disabled
                  />
                </div>
              </div>

              <div className="col-12">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder={profile.email}
                  style={{ fontSize: "20px" }}
                  disabled
                />
              </div>

              <div className="col-12">
                <label htmlFor="address" className="form-label">
                  Address
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  placeholder={profile.address}
                  style={{ fontSize: "20px" }}
                  disabled
                />
              </div>
              <div className="col-12">
                <label htmlFor="doctor" className="form-label">
                  Doctor
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="doctor"
                  placeholder={doctor.name}
                  style={{ fontSize: "20px" }}
                  disabled
                />
              </div>
              <div className="col-12" style={{ marginTop: "25px" }}>
                <DatePickermui
                  formData={formData}
                  setformData={setformData}
                  label="Choose a Date"
                />
                {status && <p style={{ color: "green" }}>Available</p>}
                {!status && <p style={{ color: "red" }}>Not Available</p>}
              </div>
            </div>

            <hr className="my-4" />

            <button className="w-100 btn btn-primary btn-lg" type="submit">
              Book Appointment
            </button>
          </form>
        )}
      </>
    </div>
  );
}
