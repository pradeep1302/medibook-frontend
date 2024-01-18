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
  photo: "",
};

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setformData] = useState(initialState);
  const [profileImage, setprofileImage] = useState("");
  const [role, setRole] = useState("");
  const { name, email, password, phone, password2, address, date, bio } =
    formData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setprofileImage(e.target.files[0]);
  };

  const register = async (e) => {
    e.preventDefault();
    if (
      role === "doctor" &&
      (!name || !email || !password || !password2 || !address || !bio || !phone)
    ) {
      return toast.error("All fields are required");
    }
    if (
      role === "patient" &&
      (!name ||
        !email ||
        !password ||
        !password2 ||
        !address ||
        !date ||
        !phone)
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

    setIsLoading(true);
    try {
      // Handle Image upload
      let imageURL;
      if (
        profileImage &&
        (profileImage.type === "image/jpeg" ||
          profileImage.type === "image/jpg" ||
          profileImage.type === "image/png")
      ) {
        const image = new FormData();
        image.append("file", profileImage);
        image.append("cloud_name", "dew41ssoz");
        image.append("upload_preset", "tcrjxwrg");

        // First save image to cloudinary
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dew41ssoz/image/upload",
          { method: "post", body: image }
        );
        const imgData = await response.json();
        imageURL = imgData.url.toString();
      }

      // Save Profile
      if (role === "doctor") {
        let prefix = "Dr.";
        name = prefix.concat(" ", name);
      }
      const fData = {
        name,
        email,
        password,
        address,
        role,
        dob: date,
        phone,
        bio,
        photo: imageURL,
      };

      const data = await registerUser(fData);
      console.log(data);
      await dispatch(SET_LOGIN(true));
      await dispatch(SET_NAME(data.name));
      dispatch(SET_ID(data._id));
      if (data.role == "doctor") navigate("/doctor");
      else navigate("/patient");
      setIsLoading(false);
    } catch (error) {
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

          <div style={{ display: "flex" }}>
            {role === "doctor" && (
              <span
                className="input-group-text"
                style={{
                  fontSize: "1.6rem",
                  height: "45px",
                  padding: "10px",
                  border: "0.8px solid black",
                  margin: "10px 0px",
                }}
              >
                Dr.
              </span>
            )}
            <input
              type="text"
              placeholder="Name"
              required
              name="name"
              value={name}
              onChange={handleInputChange}
            />
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
