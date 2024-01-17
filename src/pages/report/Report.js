import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  SET_LOGIN,
  selectIsLoggedIn,
} from "../../redux/features/auth/authSlice";
import { getReport } from "../../redux/features/report/reportSlice";
import { SpinnerImg } from "../../components/loader/Loader";
import { useReactToPrint } from "react-to-print";
import { logoutUser } from "../../services/authService";

const Report = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { report, isLoading, isError, message } = useSelector(
    (state) => state.report
  );
  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getReport(id));
    }

    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, isError, message, id, dispatch]);
  const formatDate = (data) => {
    const date = new Date(Date.parse(data)).toLocaleDateString("en-GB");
    return date;
  };
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const logout = async () => {
    await logoutUser();
    await dispatch(SET_LOGIN(false));
    navigate("/login");
  };
  const calcAge = (dob, createdAt) => {
    let Difference_In_Time =
      new Date(Date.parse(createdAt)).getTime() -
      new Date(Date.parse(dob)).getTime();
    let Difference_In_Days = Math.round(
      Difference_In_Time / (1000 * 3600 * 24)
    );
    return Math.round(Difference_In_Days / 365);
  };
  return (
    <div className="--pad header">
      {isLoading && <SpinnerImg />}
      {report && (
        <>
          <div className="--flex-end">
            <button className="--btn --btn-danger" onClick={handlePrint}>
              Print/Download
            </button>
            <button onClick={logout} className="--btn --btn-danger">
              Logout
            </button>
          </div>
          <hr />
          <div ref={componentRef}>
            <div className="--pady --flex-center --dir-column">
              <h1 style={{ marginBottom: "0px" }}>{report.doctor.name}</h1>
              <p style={{ marginBottom: "0px" }}>{report.doctor.bio}</p>
              <p style={{ marginBottom: "0px" }}>{report.doctor.address}</p>
              <p style={{ marginBottom: "0px" }}>
                {report.doctor.email}, {report.doctor.phone}
              </p>
            </div>
            <hr style={{ border: "1px solid black" }} />
            <div className="--pady">
              <p style={{ marginBottom: "1px", color: "Black" }}>
                <strong>Patient name:-</strong> {report.patient.name}
              </p>
              <p style={{ marginBottom: "1px", color: "Black" }}>
                <strong>Age:-</strong>{" "}
                {`${calcAge(report.patient.dob, report.createdAt)} years`}
              </p>
              <p style={{ marginBottom: "1px", color: "Black" }}>
                <strong>Phone no.:-</strong> {report.patient.phone}
              </p>
              <p style={{ marginBottom: "1px", color: "Black" }}>
                <strong>Height:-</strong>{" "}
                {`${
                  report.height === undefined || report.height === null
                    ? "___"
                    : report.height
                }`}
              </p>
              <p style={{ marginBottom: "1px", color: "Black" }}>
                <strong>Weight:-</strong>{" "}
                {`${
                  report.weight === undefined || report.weight === null
                    ? "___"
                    : report.weight
                }`}
              </p>
              <p style={{ marginBottom: "1px", color: "Black" }}>
                <strong>Blood Pressure:-</strong>{" "}
                {`${
                  report.minbloodpressure === undefined ||
                  report.minbloodpressure === null
                    ? "___"
                    : report.minbloodpressure
                }/${
                  report.maxbloodpressure === undefined ||
                  report.maxbloodpressure === null
                    ? "___"
                    : report.maxbloodpressure
                }`}
              </p>
              <p style={{ marginBottom: "1px", color: "Black" }}>
                <strong>Date:-</strong> {formatDate(report.updatedAt)}
              </p>
            </div>
            <div className="--pady">
              <h1 style={{ marginBottom: "0px", textDecoration: "underline" }}>
                Observation
              </h1>
              <div style={{ minHeight: "100px" }}>
                <h4 style={{ margin: "15px", color: "Black" }}>
                  {report.observation}
                </h4>
              </div>
            </div>
            <div className="--pady">
              <h1 style={{ marginBottom: "0px", textDecoration: "underline" }}>
                Advice
              </h1>
              <div style={{ minHeight: "100px" }}>
                <h4 style={{ margin: "15px", color: "Black" }}>
                  {report.advice}
                </h4>
              </div>
            </div>
            <div className="--pady">
              <h1 style={{ marginBottom: "0px", textDecoration: "underline" }}>
                Medicines
              </h1>
              <div style={{ minHeight: "100px" }}>
                <h4 style={{ margin: "15px", color: "Black" }}>
                  {report.medicines}
                </h4>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Report;
