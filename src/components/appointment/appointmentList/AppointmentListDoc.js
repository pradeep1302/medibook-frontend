import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SpinnerImg } from "../../loader/Loader";
import "../../report/reportList/reportList.scss";
import { AiOutlineEye } from "react-icons/ai";
import ReactPaginate from "react-paginate";
import { Link, useNavigate } from "react-router-dom";
import { BiCheck, BiX } from "react-icons/bi";
import "./datePicker.css";

import Search from "../../search/Search";
import {
  FILTER_DOC,
  selectFiltereddoc,
} from "../../../redux/features/appointmentDoc/filterSlice";
import DatePickermui from "../../mui/DatePickermui";
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const API_URL = `${BACKEND_URL}/api/appointments`;

export default function AppointmentListDoc({
  appointments,
  isLoading,
  updateStatusAcc,
  updateStatusRej,
  formData,
  setformData,
}) {
  const [search, setSearch] = useState("");
  const filtereddoc = useSelector(selectFiltereddoc);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const shortenText = (text, n) => {
    if (text.length > n) {
      const shortenedText = text.substring(0, n).concat("...");
      return shortenedText;
    }
    return text;
  };
  const formatDate = (data) => {
    const date = new Date(Date.parse(data)).toLocaleDateString("en-GB");
    return date;
  };
  const handleInputChange = (e) => {
    console.log(e.target.value);
    setformData({
      ...formData,
      date: formatDate(e.target.value),
    });
  };

  //   Begin Pagination
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 5;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;

    setCurrentItems(filtereddoc.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(filtereddoc.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, filtereddoc]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filtereddoc.length;
    setItemOffset(newOffset);
  };
  //   End Pagination
  useEffect(() => {
    dispatch(FILTER_DOC({ appointments, search }));
  }, [appointments, search, dispatch]);
  const calcAge = (dob) => {
    let Difference_In_Time =
      new Date().getTime() - new Date(Date.parse(dob)).getTime();
    let Difference_In_Days = Math.round(
      Difference_In_Time / (1000 * 3600 * 24)
    );
    return Math.round(Difference_In_Days / 365);
  };

  return (
    <div className="product-list">
      <hr />
      <div className="table">
        <div className="--flex-between --flex-dir-column">
          <span>
            <h3>Medical Appointments</h3>
          </span>
          <span>
            <Search
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </span>
          <span>
            {/* <label
              htmlFor="date"
              className="form-label"
              style={{ fontSize: "12px" }}
            >
              Choose a Date
            </label>
            <input
              type="date"
              className="form-control"
              style={{ fontSize: "15px" }}
              onChange={handleInputChange}
            /> */}
            <DatePickermui
              formData={formData}
              setformData={setformData}
              label="Choose a Date"
            />
          </span>
        </div>

        {isLoading && <SpinnerImg />}

        <div className="table">
          {appointments.length === 0 ? (
            <p>-- No Appointments found...</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>aptNo.</th>
                  <th>Patient Name</th>
                  <th>Age</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {currentItems.map((appointment, index) => {
                  return (
                    <tr key={appointment._id}>
                      <td>{appointment.aptNo}</td>
                      <td>{appointment.patient.name}</td>
                      <td>{`${calcAge(appointment.patient.dob)} years`}</td>
                      <td>{appointment.patient.email}</td>
                      <td>{appointment.patient.phone}</td>
                      <td>{appointment.status}</td>
                      <td className="icons">
                        <span>
                          <Link to={`/reports/${appointment.patient._id}`}>
                            <AiOutlineEye size={25} color={"purple"} />
                          </Link>
                        </span>
                        <span>
                          {(appointment.status == "pending" ||
                            appointment.status == "rejected") && (
                            <BiCheck
                              size={25}
                              color={"green"}
                              onClick={() => updateStatusAcc(appointment)}
                            />
                          )}
                        </span>
                        <span>
                          {(appointment.status == "pending" ||
                            appointment.status == "accepted") && (
                            <BiX
                              size={25}
                              color={"red"}
                              onClick={() => updateStatusRej(appointment)}
                            />
                          )}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
        <ReactPaginate
          breakLabel="..."
          nextLabel="Next"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          previousLabel="Prev"
          renderOnZeroPageCount={null}
          containerClassName="pagination"
          pageLinkClassName="page-num"
          previousLinkClassName="page-num"
          nextLinkClassName="page-num"
          activeLinkClassName="activePage"
        />
      </div>
    </div>
  );
}
