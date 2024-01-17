import React, { useEffect, useState } from "react";
import useRedirectLoggedOutUser from "../../../customHook/useRedirectLoggedOutUser";
import { useDispatch, useSelector } from "react-redux";
import { getPatient } from "../../../services/authService";
import { Link, useParams } from "react-router-dom";
import { SET_PAT, selectRole } from "../../../redux/features/auth/authSlice";
import { SpinnerImg } from "../../loader/Loader";
import Card from "../../card/Card";
import { toast } from "react-toastify";

const ReportSummary = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();

  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const role = useSelector(selectRole);
  useEffect(() => {
    setIsLoading(true);
    async function getUserData() {
      try {
        const data = await getPatient(id);
        setProfile(data);
        setIsLoading(false);
        await dispatch(SET_PAT(data));
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        console.log(message);
        toast.error("Not Authorised");
      }
    }
    getUserData();
  }, [id, dispatch]);
  const calcAge = (dob) => {
    let Difference_In_Time =
      new Date().getTime() - new Date(Date.parse(dob)).getTime();
    let Difference_In_Days = Math.round(
      Difference_In_Time / (1000 * 3600 * 24)
    );
    return Math.round(Difference_In_Days / 365);
  };
  return (
    <div className="profile --my2">
      <>
        {!isLoading && profile === null ? (
          <p>Something went wrong, please reload the page...</p>
        ) : (
          <>
            <Card cardClass={"card --flex-dir-column"}>
              <span className="profile-data">
                <p>
                  <b>Name : </b> {profile?.name}
                </p>
                <p>
                  <b>Age : </b> {`${calcAge(profile?.dob)} years`}
                </p>
                <p>
                  <b>Email : </b> {profile?.email}
                </p>
                <p>
                  <b>Phone : </b> {profile?.phone}
                </p>
                <p>
                  <b>Address : </b> {profile?.address}
                </p>
                <p>
                  <b>Doctors : </b>{" "}
                  {profile?.doctor.map((doctor, index) => {
                    return (
                      <a
                        href={`/doctor/${doctor._id}`}
                        key={doctor._id}
                      >{`${doctor.name}, `}</a>
                    );
                  })}
                </p>
              </span>
            </Card>
            {role == "doctor" && (
              <span>
                <button type="button" className="btn btn-primary btn-lg">
                  <Link to={`/createReport/${profile?._id}`}>
                    Create Report
                  </Link>
                </button>
              </span>
            )}
          </>
        )}
      </>
    </div>
  );
};

export default ReportSummary;
