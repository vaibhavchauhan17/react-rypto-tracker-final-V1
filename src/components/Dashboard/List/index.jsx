import React from "react";
import "./styles.css";
import TrendingDownRoundedIcon from "@mui/icons-material/TrendingDownRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import { Tooltip } from "@mui/material";
import { convertNumber } from "../../../functions/convertNumber";
import { Link } from "react-router-dom";

const List = ({ coin }) => {
  return (
    <Link to={`/coin/${coin.id}`} className="link-tag">
      <tr className="list-row">
        <Tooltip title="Coin Image">
          <td className="td-img">
            <img src={coin.image} className="coin-image" />
          </td>
        </Tooltip>
        <Tooltip title="Coin Info" placement="bottom-start">
          <td className="td-info">
            <div className="icon-flex">
              <div className="info-flex">
                <p className="coin-symbol">{coin.symbol}</p>
                <p className="coin-name">{coin.name}</p>
              </div>
            </div>
          </td>
        </Tooltip>
        <Tooltip
          title="Coin Price Percentage In 24hrs"
          placement="bottom-start"
        >
          {coin.price_change_percentage_24h > 0 ? (
            <td className="chip-flex">
              <div className="price-chip">
                {coin.price_change_percentage_24h.toFixed(2)}%
              </div>
              <div className="chip-icon td-chip-icon">
                <TrendingUpRoundedIcon />
              </div>
            </td>
          ) : (
            <td className="chip-flex">
              <div className="price-chip red">
                {coin.price_change_percentage_24h.toFixed(2)}%
              </div>
              <div className="chip-icon td-chip-icon red">
                <TrendingDownRoundedIcon />
              </div>
            </td>
          )}
        </Tooltip>
        <Tooltip title="Coin Price In USD" placement="bottom-end">
          <td className="td-current-price">
            {coin.price_change_percentage_24h >= 0 ? (
              <p className="current-price  ">
                ${coin.current_price.toLocaleString()}
              </p>
            ) : (
              <p className="current-price-red td-current-price">
                ${coin.current_price.toLocaleString()}
              </p>
            )}
          </td>
        </Tooltip>
        <Tooltip title="Coin Total Volume" placement="bottom-end">
          <p className="coin-name td-totalVolume">
            {coin.total_volume.toLocaleString()}
          </p>
        </Tooltip>
        <Tooltip title="Coin Market Capital" placement="bottom-end">
          <p className="coin-name td-marketCap">
            ${coin.market_cap.toLocaleString()}
          </p>
        </Tooltip>
        <Tooltip title="Coin Market Capital" placement="bottom-end">
          <td className="coin-name mobile">
            ${convertNumber(coin.market_cap)}
          </td>
        </Tooltip>
      </tr>
    </Link>
  );
};

export default List;
