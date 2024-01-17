import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SpinnerImg } from "../loader/Loader";
import "../report/reportList/reportList.scss";
import { AiOutlineEye } from "react-icons/ai";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import {
  FILTER_PAT,
  selectFilteredPat,
} from "../../redux/features/patients/filterSlice";
import Search from "../search/Search";

export default function PatientList({ patients, isLoading }) {
  const [search, setSearch] = useState("");
  const filteredPat = useSelector(selectFilteredPat);

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

    setCurrentItems(filteredPat.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(filteredPat.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, filteredPat]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredPat.length;
    setItemOffset(newOffset);
  };
  //   End Pagination
  useEffect(() => {
    dispatch(FILTER_PAT({ patients, search }));
  }, [patients, search, dispatch]);
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
            <h3>Patients</h3>
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
          {patients.length === 0 ? (
            <p>-- No Patient found...</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>s/n</th>
                  <th>Patient Name</th>
                  <th>Age</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>Address</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {currentItems.map((patient, index) => {
                  return (
                    <tr key={patient.email}>
                      <td>{index + 1}</td>
                      <td>{patient.name}</td>
                      <td>{`${calcAge(patient.dob)} years`}</td>
                      <td>{patient.phone}</td>
                      <td>{patient.email}</td>
                      <td>{patient.address}</td>
                      <td className="icons">
                        <span>
                          <Link to={`/reports/${patient._id}`}>
                            <AiOutlineEye size={25} color={"purple"} />
                          </Link>
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
