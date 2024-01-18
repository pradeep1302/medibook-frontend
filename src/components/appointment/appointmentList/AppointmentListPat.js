import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SpinnerImg } from "../../loader/Loader";
import "../../report/reportList/reportList.scss";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import {
  FILTER_PAT,
  selectFilteredpat,
} from "../../../redux/features/appointmentPat/filterSlice";
import Search from "../../search/Search";

export default function AppointmentList({ appointments, isLoading }) {
  const [search, setSearch] = useState("");
  const filteredpat = useSelector(selectFilteredpat);
  const dispatch = useDispatch();

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

  //   Begin Pagination
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 5;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;

    setCurrentItems(filteredpat.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(filteredpat.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, filteredpat]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredpat.length;
    setItemOffset(newOffset);
  };
  //   End Pagination

  useEffect(() => {
    dispatch(FILTER_PAT({ appointments, search }));
  }, [appointments, search, dispatch]);

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
        </div>

        {isLoading && <SpinnerImg />}

        <div className="table">
          {appointments.length === 0 ? (
            <p>-- No Appointments found...</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>s/n</th>
                  <th>Doctor Name</th>
                  <th>aptNo.</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>Date</th>
                </tr>
              </thead>

              <tbody>
                {currentItems.map((appointment, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{appointment.doctor.name}</td>
                      <td>{appointment.patient[0].aptNo}</td>
                      <td>{appointment.doctor.phone}</td>
                      <td>{appointment.doctor.email}</td>
                      <td>{appointment.date}</td>
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
