import React from "react";
import heroImg from "../../assets/hero.png";
import navImg from "../../assets/medical-report.png";
import "./Home.scss";
import { Link } from "react-router-dom";
import { ShowOnLogin, ShowOnLogout } from "../../components/protect/HiddenLink";
import { useSelector } from "react-redux";
import { selectRole } from "../../redux/features/auth/authSlice";
import SearchBar from "../../components/searchBar/SearchBar";
import { GoChevronDown } from "react-icons/go";
import queue from "../../assets/queue.png";
import paperWork from "../../assets/paperWork.jpg";
import doctor from "../../assets/doctor.jpg";

export default function Home() {
  const role = useSelector(selectRole);
  return (
    <div className="wrapper">
      <section className="home">
        <nav className="container --flex-between ">
          <div className="logo">
            <img src={navImg} alt="navImg" className="navImg" />
            <span className="nav-text">MEDIBOOK</span>
          </div>

          <ul className="home-links --flex-between">
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
        <div className="container hero">
          <SearchBar />
        </div>
        <div className="container hero">
          <GoChevronDown
            style={{
              paddingBottom: "10px",
              fontSize: "70px",
              color: "white",
            }}
          />
        </div>
      </section>
      <section className="sec2">
        <div className="container features cont">
          <div className="divFeat">
            Avoid Long Queues By Online Appoinment booking
          </div>
          <img
            src={queue}
            alt="queue image"
            style={{
              maxWidth: "500px",
              width: "50%",
              boxShadow: "rgb(38, 57, 77) 0px 20px 30px -10px",
            }}
          />
        </div>
        <div className="container features">
          <img
            src={paperWork}
            alt="queue image"
            style={{
              maxWidth: "500px",
              width: "50%",
              boxShadow: "rgb(38, 57, 77) 0px 20px 30px -10px",
            }}
          />
          <div className="divFeat">Manage Prescriptions Easily</div>
        </div>
        <div className="container features cont">
          <div className="divFeat">
            Helpful For Doctors in Managing Patients
          </div>
          <img
            src={doctor}
            alt="queue image"
            style={{
              maxWidth: "500px",
              width: "50%",
              boxShadow: "rgb(38, 57, 77) 0px 20px 30px -10px",
            }}
          />
        </div>
      </section>
      <div class="bottom-container">
        <p id="copyright" style={{ margin: "0" }}>
          © Pradeep Agrawal.
        </p>
      </div>
    </div>
  );
}
