import React from "react";
import "./SearchBar.css";
import { Link } from "react-router-dom";

export default function SearchResult({ searchData }) {
  return (
    <div className="result_main">
      {searchData.map((data, index) => {
        return (
          <Link to={`/doctor/${data._id}`} key={index}>
            <div
              style={{ margin: "0", padding: "5px 10px", fontSize: "20px" }}
            >{`${data.name}, ${data.bio}`}</div>
          </Link>
        );
      })}
    </div>
  );
}
