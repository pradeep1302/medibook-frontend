import React, { useState } from "react";
import styles from "./auth.module.scss";
import { TiUserAddOutline } from "react-icons/ti";
import Card from "../../components/card/Card";
import { toast } from "react-toastify";
import { registerUser, validateEmail } from "../../services/authService";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  SET_ID,
  SET_LOGIN,
  SET_NAME,
} from "../../redux/features/auth/authSlice";
import Loader from "../../components/loader/Loader";
import PhoneInput from "react-phone-number-input/input";
import DatePickermui from "../../components/mui/DatePickermui";

const initialState = {
  name: "",
  email: "",
  password: "",
  password2: "",
  address: "",
  date: new Date(),
  phone: "",
  bio: "",
};

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setformData] = useState(initialState);
  const [image, setImage] = useState("");
  const [role, setRole] = useState("");
  const { name, email, password, phone, password2, address, date, bio } =
    formData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const register = async (e) => {
    e.preventDefault();

    if (
      role === "doctor" &&
      (!name || !email || !password || !password2 || !address || !bio)
    ) {
      return toast.error("All fields are required");
    }
    if (
      role === "patient" &&
      (!name || !email || !password || !password2 || !address || !date)
    ) {
      return toast.error("All fields are required");
    }

    if (password.length < 6) {
      return toast.error("Passwords must be up to 6 characters");
    }
    if (!validateEmail(email)) {
      return toast.error("Please enter a valid email");
    }
    if (password !== password2) {
      return toast.error("Passwords do not match");
    }

    const fData = new FormData();
    fData.append("name", name);
    fData.append("email", email);
    fData.append("password", password);
    fData.append("address", address);
    fData.append("role", role);
    fData.append("dob", date);
    fData.append("bio", bio);
    fData.append("image", image);
    fData.append("phone", phone);

    console.log(fData.name);
    console.log(fData.email);
    console.log(fData.password);
    console.log(fData.address);
    console.log(fData.role);
    console.log(fData.date);
    console.log(fData.bio);
    console.log(fData.image);
    console.log(fData.phone);
    setIsLoading(true);
    try {
      const data = await registerUser(fData);
      console.log(data);
      await dispatch(SET_LOGIN(true));
      await dispatch(SET_NAME(data.name));
      dispatch(SET_ID(data._id));
      if (data.role == "doctor") navigate("/doctor");
      else navigate("/patient");
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("An error occurred");
      setIsLoading(false);
    }
  };

  return (
    <div className={`container ${styles.auth}`}>
      {isLoading && <Loader />}
      <div className={styles.form}>
        <div className="--flex-center">
          <TiUserAddOutline size={35} color="#999" />
        </div>
        <h2>Register</h2>

        <form onSubmit={register}>
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
                onChange={() => setRole("doctor")}
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
                onChange={() => setRole("patient")}
              />
              <label htmlFor="patient">Patient</label>
            </div>
          </div>
          <input
            type="text"
            placeholder="Name"
            required
            name="name"
            value={name}
            onChange={handleInputChange}
          />
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
          <input
            type="password"
            placeholder="Confirm Password"
            required
            name="password2"
            value={password2}
            onChange={handleInputChange}
          />
          <input
            type="text"
            placeholder="Address"
            required
            name="address"
            value={address}
            onChange={handleInputChange}
          />
          <input
            type="text"
            placeholder="Phone"
            required
            name="phone"
            value={phone}
            onChange={handleInputChange}
          />
          {role === "patient" && (
            <div style={{ margin: "20px 0px" }}>
              <DatePickermui
                formData={formData}
                setformData={setformData}
                label="Date of Birth"
                style={{ margin: "20px" }}
              />
            </div>
          )}
          {role === "doctor" && (
            <>
              <textarea
                value={bio}
                onChange={handleInputChange}
                name="bio"
                placeholder="Bio"
                className={styles.textArea}
                required
              ></textarea>
              <label
                htmlFor="image"
                style={{ fontSize: "1.6rem", fontWeight: "300" }}
              >
                Select an image(optional)
              </label>
              <input
                type="file"
                name="image"
                className={styles.textArea}
                onChange={(e) => handleImageChange(e)}
              />
            </>
          )}
          <button type="submit" className="--btn --btn-primary --btn-block">
            Register
          </button>
        </form>

        <span className={styles.register}>
          <Link to="/">Home</Link>
          <p> &nbsp; Already have an account? &nbsp;</p>
          <Link to="/login">Login</Link>
        </span>
      </div>
    </div>
  );
};

export default Register;
