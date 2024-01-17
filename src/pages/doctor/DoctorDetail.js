import React, { useEffect, useState } from "react";
import "../Home/Home.scss";
import { useDispatch, useSelector } from "react-redux";
import { selectRole } from "../../redux/features/auth/authSlice";
import navImg from "../../assets/medical-report.png";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ShowOnLogin, ShowOnLogout } from "../../components/protect/HiddenLink";
import "./DoctorDetail.css";
import { toast } from "react-toastify";
import axios from "axios";
import { SpinnerImg } from "../../components/loader/Loader";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export default function DoctorDetail() {
  const role = useSelector(selectRole);
  const [detail, setDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getDoctor = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        `${BACKEND_URL}/api/users/getdoctor/${id}`
      );
      setDetail(data);
      setIsLoading(false);
    } catch (error) {
      toast.error(error.message);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getDoctor();
  }, []);
  return (
    <div className="docDetail zoomOut">
      <nav className="container --flex-between ">
        <div className="logo">
          <img src={navImg} alt="navImg" className="navImg" />
          <span className="nav-text">MEDIBOOK</span>
        </div>

        <ul className="home-links">
          <ShowOnLogout>
            <li>
              <button type="button" className="btn btn-outline-primary">
                <Link to="/register">Register</Link>
              </button>
            </li>
          </ShowOnLogout>
          <ShowOnLogout>
            <li>
              <button type="button" className="btn btn-primary">
                <Link to="/login">Login</Link>
              </button>
            </li>
          </ShowOnLogout>
          <ShowOnLogin>
            <li>
              <button className="--btn --btn-primary">
                <Link to={`/${role}`}>Dashboard</Link>
              </button>
            </li>
          </ShowOnLogin>
        </ul>
      </nav>
      {/* HERO SECTION */}
      {isLoading && <SpinnerImg />}
      <>
        {detail === null ? (
          <p></p>
        ) : (
          <section className="--flex-center --dir-column">
            <div className="detail">
              <div style={{ margin: "5px" }}>
                <p>
                  <b>Name : </b>
                  {detail.name}
                </p>
                <p>
                  <b>Email : </b> {detail.email}
                </p>
                <p>
                  <b>Phone : </b> {detail.phone}
                </p>
                <p>
                  <b>Address : </b> {detail.address}
                </p>
                <p>
                  <b>Bio : </b> {detail.bio}
                </p>
              </div>
              <div style={{ margin: "5px" }}>
                <img
                  src={detail.photo}
                  alt="profilepic"
                  style={{
                    borderRadius: "50%",
                    height: "200px",
                    width: "auto",
                  }}
                />
              </div>
            </div>
            <div
              className="--flex-around"
              style={{ width: "40vw", margin: "20px" }}
            >
              <button className="--btn --btn-danger">
                <Link to={`/`}>Home</Link>
              </button>
              <button className="--btn --btn-danger">
                <Link to={`/book-appointment/${detail._id}`}>
                  Book Appointment
                </Link>
              </button>
            </div>
          </section>
        )}
      </>
    </div>
  );
}
