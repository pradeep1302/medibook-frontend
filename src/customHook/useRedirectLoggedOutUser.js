import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SET_ID, SET_LOGIN, SET_ROLE } from "../redux/features/auth/authSlice";
import { getLoginStatus, getUser } from "../services/authService";
import { toast } from "react-toastify";

const useRedirectLoggedOutUser = (path) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const redirectLoggedOutUser = async () => {
      const isLoggedIn = await getLoginStatus();
      dispatch(SET_LOGIN(isLoggedIn));

      if (!isLoggedIn) {
        toast.info("Please login to continue.");
        navigate(path);
        return;
      }
      if (isLoggedIn) {
        const { role, _id } = await getUser();
        dispatch(SET_ROLE(role));
        dispatch(SET_ID(_id));
      }
    };
    redirectLoggedOutUser();
  }, [navigate, path, dispatch]);
};

export default useRedirectLoggedOutUser;
