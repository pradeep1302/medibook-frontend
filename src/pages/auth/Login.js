import React, { useState } from "react";
import styles from "./auth.module.scss";
import { BiLogIn } from "react-icons/bi";
import Card from "../../components/card/Card";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { loginUser, validateEmail } from "../../services/authService";
import {
  SET_ID,
  SET_LOGIN,
  SET_NAME,
  SET_ROLE,
} from "../../redux/features/auth/authSlice";
import Loader from "../../components/loader/Loader";

const initialState = {
  email: "",
  password: "",
  role: "",
};

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setformData] = useState(initialState);
  const { email, password, role } = formData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };

  const login = async (e) => {
    e.preventDefault();

    if (!email || !password || !role) {
      return toast.error("All fields are required");
    }

    if (!validateEmail(email)) {
      return toast.error("Please enter a valid email");
    }

    const userData = {
      email,
      password,
      role,
    };
    setIsLoading(true);
    try {
      const data = await loginUser(userData);
      await dispatch(SET_LOGIN(true));
      await dispatch(SET_NAME(data.name));
      await dispatch(SET_ROLE(data.role));
      await dispatch(SET_ID(data._id));
      if (data.role == "doctor") navigate("/doctor");
      else navigate("/patient");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <div className={`container ${styles.auth}`}>
      {isLoading && <Loader />}

      <div className={styles.form}>
        <div className="--flex-center">
          <BiLogIn size={35} color="#999" />
        </div>
        <h2>Login</h2>

        <form onSubmit={login}>
          <div className="container --flex-center">
            <div
              className="container --flex-center"
              style={{ fontSize: "15px" }}
            >
              <input
                type="radio"
                id="doctor"
                name="role"
                value="doctor"
                onChange={handleInputChange}
              />
              <label htmlFor="doctor">Doctor</label>
            </div>
            <div
              className="container --flex-center"
              style={{ fontSize: "15px" }}
            >
              <input
                type="radio"
                id="patient"
                name="role"
                value="patient"
                onChange={handleInputChange}
              />
              <label htmlFor="patient">Patient</label>
            </div>
          </div>
          <input
            type="email"
            placeholder="Email"
            required
            name="email"
            value={email}
            onChange={handleInputChange}
          />
          <input
            type="password"
            placeholder="Password"
            required
            name="password"
            value={password}
            onChange={handleInputChange}
          />
          <button type="submit" className="--btn --btn-primary --btn-block">
            Login
          </button>
        </form>

        <span className={styles.register}>
          <Link to="/">Home</Link>
          <p style={{ margin: "5px 0" }}>
            &nbsp; Don't have an account? &nbsp;
          </p>
          <Link to="/register">Register</Link>
        </span>
      </div>
    </div>
  );
};

export default Login;
