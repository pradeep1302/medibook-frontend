import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  SET_LOGIN,
  selectIsLoggedIn,
  selectRole,
} from "../../redux/features/auth/authSlice";
import { createReport } from "../../redux/features/report/reportSlice";
import { getLoginStatus, getPatient } from "../../services/authService";
import { toast } from "react-toastify";
import { SpinnerImg } from "../../components/loader/Loader";

const initialState = {
  observation: "",
  advice: "",
  medicines: "",
  minbloodpressure: "",
  maxbloodpressure: "",
  weight: "",
  height: "",
};

export default function CreateReport() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const role = useSelector(selectRole);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [isLoading, setIsLoading] = useState(false);

  const [profile, setProfile] = useState(null);
  const [formData, setformData] = useState(initialState);

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
        if (role === "patient") {
          toast.error("Not Authourised");
          navigate("/");
          return;
        }
        setIsLoading(true);
        try {
          const patient = await getPatient(id);
          setProfile(patient);
          setIsLoading(false);
        } catch (error) {
          const message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          console.log(message);
          toast.error("An error occurred");
          setIsLoading(false);
          navigate("/");
          return;
        }
      }
    };
    redirectLoggedOutUser();
  }, [navigate, dispatch, isLoggedIn, role, id]);

  const saveReport = async (e) => {
    e.preventDefault();
    if (!formData.observation && !formData.advice && !formData.medicines) {
      return toast.error("Fill atleast one field");
    }
    await dispatch(createReport({ id, formData }));

    navigate(`/reports/${id}`);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setformData({
      ...formData,
      [name]: value,
    });
  };
  return (
    <div className="col-md-7 col-lg-8" style={{ fontSize: "20px" }}>
      <h4 className="mb-3">Create Report</h4>
      {isLoading && <SpinnerImg />}
      <>
        {profile === null ? (
          <></>
        ) : (
          <form onSubmit={saveReport}>
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
                <label htmlFor="height" className="form-label">
                  Height
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="height"
                  placeholder="Height"
                  style={{ fontSize: "20px" }}
                  name="height"
                  value={formData.height}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-12">
                <label htmlFor="weight" className="form-label">
                  Weight
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="weight"
                  placeholder="Weight"
                  name="weight"
                  style={{ fontSize: "20px" }}
                  value={formData.weight}
                  onChange={handleInputChange}
                />
              </div>

              <label htmlFor="minbloodpressure" className="form-label">
                Blood Pressure
              </label>
              <div className="col-sm-6">
                <input
                  type="number"
                  className="form-control"
                  id="minbloodpressure"
                  placeholder="Min BP"
                  value={formData.minbloodpressure}
                  name="minbloodpressure"
                  onChange={handleInputChange}
                  style={{ fontSize: "20px" }}
                />
              </div>

              <div className="col-sm-6">
                <input
                  type="number"
                  className="form-control"
                  id="maxbloodpressure"
                  placeholder="Max BP"
                  value={formData.maxbloodpressure}
                  name="maxbloodpressure"
                  onChange={handleInputChange}
                  style={{ fontSize: "20px" }}
                />
              </div>
              <div className="col-12">
                <label htmlFor="observation" className="form-label">
                  Observation
                </label>
                <textarea
                  className="form-control"
                  id="observation"
                  rows="3"
                  style={{ fontSize: "15px" }}
                  value={formData.observation}
                  onChange={handleInputChange}
                  name="observation"
                ></textarea>
              </div>
              <div className="col-12">
                <label htmlFor="advice" className="form-label">
                  Advice
                </label>
                <textarea
                  className="form-control"
                  id="advice"
                  rows="5"
                  style={{ fontSize: "15px" }}
                  value={formData.advice}
                  onChange={handleInputChange}
                  name="advice"
                ></textarea>
              </div>
              <div className="col-12">
                <label htmlFor="medicines" className="form-label">
                  Medicines
                </label>
                <textarea
                  className="form-control"
                  id="medicines"
                  style={{ fontSize: "15px" }}
                  rows="5"
                  value={formData.medicines}
                  onChange={handleInputChange}
                  name="medicines"
                ></textarea>
              </div>
            </div>

            <hr className="my-4" />

            <button className="w-100 btn btn-primary btn-lg" type="submit">
              Create Report
            </button>
          </form>
        )}
      </>
    </div>
  );
}
