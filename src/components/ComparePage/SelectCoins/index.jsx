import React, { useEffect, useState } from "react";
import { MenuItem, Select } from "@mui/material";
import "./styles.css";

const SelectCoins = ({ crypto1, crypto2, handleCoinChange, allCoins }) => {
  const styles = {
    height: "2.5rem",
    color: "var(--white)",
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "var(--white)",
    },
    "& .MuiSvgIcon-root": {
      color: "var(--white)",
    },
    "&:hover": {
      "&& fieldset": {
        borderColor: "#3a80e9",
      },
    },
  };
  return (
    <div className="select-coins-div">
      <div className="select-flex">
        <p>Crypto 1</p>
        <Select
          value={crypto1}
          onChange={(e) => handleCoinChange(e)}
          sx={styles}
          label="Crypto1"
        >
          {allCoins
            .filter((item) => item.id != crypto2)
            .map((coin, i) => (
              <MenuItem key={i} value={coin.id}>
                {coin.name}
              </MenuItem>
            ))}
        </Select>
        <p>Crypto 2</p>
        <Select
          value={crypto2}
          onChange={(e) => handleCoinChange(e, true)}
          sx={styles}
          label="Crypto2"
        >
          {allCoins
            .filter((item) => item.id != crypto1)
            .map((coin, i) => (
              <MenuItem key={i} value={coin.id}>
                {coin.name}
              </MenuItem>
            ))}
        </Select>
      </div>
    </div>
  );
};

export default SelectCoins;
