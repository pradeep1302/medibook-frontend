import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";

import "./SearchBar.css";
import axios from "axios";
import SearchResult from "./SearchResult";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const [searchData, setSearchData] = useState([]);
  const fetchData = async (value) => {
    try {
      const { data } = await axios.get(`${BACKEND_URL}/api/users/getdoctors`);
      const results = data.filter((doctor) => {
        return (
          value &&
          doctor &&
          doctor.name &&
          doctor.name.toLowerCase().includes(value.toLowerCase())
        );
      });
      setSearchData(results);
    } catch (error) {
      toast.error(error.message);
    }
  };
  const handleChange = (value) => {
    setSearch(value);
    fetchData(value);
  };

  return (
    <section className="search_section">
      {" "}
      <div className="search_input_div">
        {" "}
        <input
          type="text"
          className="search_input"
          placeholder="Search a doctor..."
          autoComplete="off"
          onChange={(e) => handleChange(e.target.value)}
          value={search}
        />{" "}
        <div className="search_icon">
          {" "}
          <SearchIcon />
          {/* <CloseIcon /> */}
        </div>{" "}
      </div>{" "}
      <SearchResult searchData={searchData} />
    </section>
  );
};

export default SearchBar;
