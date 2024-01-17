import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Card from "../../components/card/Card";
import { SpinnerImg } from "../../components/loader/Loader";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import {
  SET_ID,
  SET_LOGIN,
  SET_NAME,
  SET_ROLE,
  SET_USER,
  selectRole,
} from "../../redux/features/auth/authSlice";
import { getLoginStatus, getUser } from "../../services/authService";
import "./Profile.scss";
import { toast } from "react-toastify";

const Profile = () => {
  useRedirectLoggedOutUser("/login");
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const role = useSelector(selectRole);

  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    async function getUserData() {
      const isLoggedIn = await getLoginStatus();
      dispatch(SET_LOGIN(isLoggedIn));

      if (!isLoggedIn) {
        toast.info("Please login to continue.");
        navigate("/login");
        return;
      }
      if (isLoggedIn == true) {
        const { role, _id } = await getUser();
        dispatch(SET_ROLE(role));
        dispatch(SET_ID(_id));
        const data = await getUser();
        setProfile(data);
        setIsLoading(false);
        await dispatch(SET_USER(data));
        await dispatch(SET_NAME(data.name));
      }
    }
    getUserData();
  }, [dispatch, navigate]);

  return (
    <div className="profile --my2">
      {isLoading && <SpinnerImg />}
      <>
        {!isLoading && profile === null ? (
          <p>Something went wrong, please reload the page...</p>
        ) : (
          <Card cardClass={"card --flex-dir-column"}>
            {role == "doctor" && (
              <>
                <span className="profile-photo">
                  <img
                    src={profile?.photo}
                    alt="profilepic"
                    style={{ height: "200px", width: "auto" }}
                  />
                </span>
                <span className="profile-data">
                  <p>
                    <b>Name : </b> {profile?.name}
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
                    <b>Bio : </b> {profile?.bio}
                  </p>
                  <div>
                    <Link to="/edit-profile">
                      <button className="--btn --btn-primary">
                        Edit Profile
                      </button>
                    </Link>
                  </div>
                </span>
              </>
            )}
            {role == "patient" && (
              <>
                <span className="profile-data">
                  <p>
                    <b>Name : </b> {profile?.name}
                  </p>
                  <p>
                    <b>DOB : </b> {profile?.dob}
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
                    <b>Doctors : </b> {profile?.doctor}
                  </p>
                  <div>
                    <Link to="/edit-profile">
                      <button className="--btn --btn-primary">
                        Edit Profile
                      </button>
                    </Link>
                  </div>
                </span>
              </>
            )}
          </Card>
        )}
      </>
    </div>
  );
};

export default Profile;
