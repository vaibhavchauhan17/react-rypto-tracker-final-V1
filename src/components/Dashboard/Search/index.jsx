import React from "react";
import "./styles.css";
import SearchRoundedIcon from "@mui/icons-material/Search";

const Search = ({ search, handleChange }) => {
  return (
    <div className="search-flex">
      <SearchRoundedIcon />
      <input
        className="search-input"
        placeholder="Search"
        value={search}
        onChange={(e) => handleChange(e)}
      />
    </div>
  );
};

export default Search;
