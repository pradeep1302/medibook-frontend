import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import {
  SET_LOGIN,
  selectIsLoggedIn,
} from "../../redux/features/auth/authSlice";
import { getReports } from "../../redux/features/report/reportSlice";
import ReportList from "../../components/report/reportList/ReportList";
import ReportSummary from "../../components/report/reportSummary/ReportSummary";
import { useNavigate, useParams } from "react-router-dom";
import { getLoginStatus } from "../../services/authService";
import { toast } from "react-toastify";

const Reports = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { reports, isLoading, isError, message } = useSelector(
    (state) => state.report
  );
  const { id } = useParams();

  useEffect(() => {
    const redirectLoggedOutUser = async () => {
      const isLoggedIn = await getLoginStatus();
      dispatch(SET_LOGIN(isLoggedIn));

      if (isLoggedIn === false) {
        toast.info("Please login to continue.");
        navigate("/login");
        return;
      }
      if (isLoggedIn === true) {
        dispatch(getReports(id));
      }
      if (isError) {
        console.log(message);
      }
    };
    redirectLoggedOutUser();
  }, [isLoggedIn, isError, navigate, id, message, dispatch]);

  return (
    <div>
      <ReportSummary />
      <ReportList reports={reports} isLoading={isLoading} />
    </div>
  );

  // useRedirectLoggedOutUser("/login");
  // const dispatch = useDispatch();

  // const isLoggedIn = useSelector(selectIsLoggedIn);
  // const [reports, setReports] = useState([]);

  // const { id } = useParams();
  // const getReports = async (id) => {
  //   try {
  //     const { data } = await axios.get(`${API_URL}/getreports/${id}`);
  //     setReports(data);
  //   } catch (error) {
  //     toast.error(error.message);
  //   }
  // };
  // useEffect(() => {
  //   if (isLoggedIn === true) {
  //     getReports(id);
  //   }
  // });
  // return (
  //   <div>
  //     <ReportSummary reports={reports} />
  //     <ReportList reports={reports} />
  //   </div>
  // );
};

export default Reports;
