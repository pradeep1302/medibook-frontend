import React, { useEffect, useState } from "react";
import { SpinnerImg } from "../../loader/Loader";
import "./reportList.scss";
import { AiOutlineEye } from "react-icons/ai";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import Search from "../../search/Search";
import {
  FILTER_REPORTS,
  selectFilteredReports,
} from "../../../redux/features/report/filterSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectId } from "../../../redux/features/auth/authSlice";
import { FaEdit } from "react-icons/fa";

const ReportList = ({ reports, isLoading }) => {
  const [search, setSearch] = useState("");
  const filteredReports = useSelector(selectFilteredReports);
  const dispatch = useDispatch();
  const loggedId = useSelector(selectId);

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

    setCurrentItems(filteredReports.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(filteredReports.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, filteredReports]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredReports.length;
    setItemOffset(newOffset);
  };
  //   End Pagination

  useEffect(() => {
    dispatch(FILTER_REPORTS({ reports, search }));
  }, [reports, search, dispatch]);

  function editReport(report) {
    const date = new Date(Date.parse(report.createdAt));
    var current = new Date();
    if (report.doctor._id === loggedId && Math.abs(date - current) < 86400000)
      return true;
    return false;
  }

  return (
    <div className="product-list">
      <hr />
      <div className="table">
        <div className="--flex-between --flex-dir-column">
          <span>
            <h3>Medical Records</h3>
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
          {reports.length === 0 ? (
            <p>-- No reports found...</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>s/n</th>
                  <th>Patient Name</th>
                  <th>Doctor</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {currentItems.map((report, index) => {
                  return (
                    <tr key={report._id}>
                      <td>{index + 1}</td>
                      <td>{shortenText(report.patient.name, 16)}</td>
                      <td>{shortenText(report.doctor.name, 16)}</td>
                      <td>{formatDate(report.updatedAt)}</td>
                      <td className="icons">
                        <span>
                          <Link to={`/report/${report._id}`}>
                            <AiOutlineEye size={25} color={"purple"} />
                          </Link>
                        </span>
                        {editReport(report) && (
                          <span>
                            <Link to={`/updateReport/${report._id}`}>
                              <FaEdit size={20} color={"green"} />
                            </Link>
                          </span>
                        )}
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
};

export default ReportList;

// const ReportList = ({ reports }) => {
//   const shortenText = (text, n) => {
//     if (text.length > n) {
//       const shortenedText = text.substring(0, n).concat("...");
//       return shortenedText;
//     }
//     return text;
//   };
//   const formatDate = (data) => {
//     const date = new Date(Date.parse(data)).toLocaleDateString("en-US");
//     return date;
//   };

//   //   Begin Pagination
//   const [currentItems, setCurrentItems] = useState([]);
//   const [pageCount, setPageCount] = useState(0);
//   const [itemOffset, setItemOffset] = useState(0);
//   const itemsPerPage = 5;

//   useEffect(() => {
//     const endOffset = itemOffset + itemsPerPage;

//     setCurrentItems(reports.slice(itemOffset, endOffset));
//     setPageCount(Math.ceil(reports.length / itemsPerPage));
//   }, [itemOffset, itemsPerPage, reports]);

//   const handlePageClick = (event) => {
//     const newOffset = (event.selected * itemsPerPage) % reports.length;
//     setItemOffset(newOffset);
//   };
//   //   End Pagination

//   return (
//     <div className="product-list">
//       <hr />
//       <div className="table">
//         <div className="--flex-between --flex-dir-column">
//           <span>
//             <h3>Medical Records</h3>
//           </span>
//         </div>

//         <div className="table">
//           {reports.length === 0 ? (
//             <p>-- No reports found...</p>
//           ) : (
//             <table>
//               <thead>
//                 <tr>
//                   <th>s/n</th>
//                   <th>Patient Name</th>
//                   <th>Doctor</th>
//                   <th>Date</th>
//                   <th>Action</th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {currentItems.map((report, index) => {
//                   return (
//                     <tr key={report._id}>
//                       <td>{index + 1}</td>
//                       <td>{shortenText(report.patient.name, 16)}</td>
//                       <td>{shortenText(report.doctor.name, 16)}</td>
//                       <td>{formatDate(report.updatedAt)}</td>
//                       <td className="icons">
//                         <span>
//                           <Link to={`/report/${report._id}`}>
//                             <AiOutlineEye size={25} color={"purple"} />
//                           </Link>
//                         </span>
//                       </td>
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//           )}
//         </div>
//         <ReactPaginate
//           breakLabel="..."
//           nextLabel="Next"
//           onPageChange={handlePageClick}
//           pageRangeDisplayed={3}
//           pageCount={pageCount}
//           previousLabel="Prev"
//           renderOnZeroPageCount={null}
//           containerClassName="pagination"
//           pageLinkClassName="page-num"
//           previousLinkClassName="page-num"
//           nextLinkClassName="page-num"
//           activeLinkClassName="activePage"
//         />
//       </div>
//     </div>
//   );
// };

// export default ReportList;
