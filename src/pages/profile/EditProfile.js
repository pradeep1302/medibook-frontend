import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Card from "../../components/card/Card";
import Loader from "../../components/loader/Loader";
import { selectUser } from "../../redux/features/auth/authSlice";
import "./Profile.scss";
import { toast } from "react-toastify";
import { updateUser } from "../../services/authService";
import ChangePassword from "../../components/changePassword/ChangePassword";

const EditProfile = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector(selectUser);
  const { email } = user;

  useEffect(() => {
    if (!email) {
      navigate("/profile");
    }
  }, [email, navigate]);

  const initialState = {
    name: user?.name,
    email: user?.email,
    phone: user?.phone,
    address: user?.address,
    bio: user?.bio,
    role: user?.role,
  };
  const [profile, setProfile] = useState(initialState);
  const [profileImage, setProfileImage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };
  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0]);
  };
  console.log(profile);
  const saveProfile = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const fData = new FormData();
      fData.append("name", profile?.name);
      fData.append("email", profile?.email);
      fData.append("phone", profile?.phone);
      fData.append("address", profile?.address);
      fData.append("bio", profile?.bio);
      if (profileImage) {
        fData.append("image", profileImage);
      }

      const data = await updateUser(fData);
      toast.success("User updated");
      navigate("/profile");
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <div className="profile --my2">
      {isLoading && <Loader />}

      <Card cardClass={"card --flex-dir-column"}>
        <span className="profile-photo">
          <img
            src={user?.photo}
            alt="profilepic"
            style={{ height: "200px", width: "auto" }}
          />
        </span>
        <form className="--form-control --m" onSubmit={saveProfile}>
          <span className="profile-data">
            <p>
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={profile?.name}
                onChange={handleInputChange}
              />
            </p>
            <p>
              <label>Email:</label>
              <input type="text" name="email" value={profile?.email} disabled />
              <br />
              <code>Email cannot be changed.</code>
            </p>
            <p>
              <label>Phone:</label>
              <input
                type="text"
                name="phone"
                value={profile?.phone}
                onChange={handleInputChange}
              />
            </p>
            <p>
              <label>Address:</label>
              <input
                type="text"
                name="address"
                value={profile?.address}
                onChange={handleInputChange}
              />
            </p>
            {profile.role == "doctor" && (
              <>
                <p>
                  <label>Bio:</label>
                  <textarea
                    name="bio"
                    value={profile?.bio}
                    onChange={handleInputChange}
                    cols="30"
                    rows="10"
                  ></textarea>
                </p>
                <p>
                  <label>Photo:</label>
                  <input
                    type="file"
                    name="image"
                    onChange={handleImageChange}
                  />
                </p>
              </>
            )}
            <div>
              <button className="--btn --btn-primary">Edit Profile</button>
            </div>
          </span>
        </form>
      </Card>
      <br />
      <ChangePassword />
    </div>
  );
};

export default EditProfile;
