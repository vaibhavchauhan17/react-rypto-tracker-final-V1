import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Common/Header";
import Loader from "../components/Common/Loader";
import { settingCoinObject } from "../functions/settingCoinObject";
import List from "../components/Dashboard/List";
import Info from "../components/Coin/info";
import { getCoinData } from "../functions/getCoinData";
import { getPrices } from "../functions/getPrices";
import LineChart from "../components/Coin/LineChart";
import { settingChartData } from "../functions/settingChartData";
import SelectDays from "../components/Coin/SelectDays";
import ToggleComponents from "../components/Coin/ToggleComponent";

const Coin = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [coin, setCoin] = useState({});
  const [days, setDays] = useState(30);
  const [error, setError] = useState(false);
  const [chartData, setChartData] = useState({ labels: [], datasets: [{}] });
  const [priceType, setPriceType] = useState("prices");
  useEffect(() => {
    if (id) {
      getData();
    }
  }, [id]);

  const getData = async () => {
    setLoading(true);
    let coinData = await getCoinData(id, setError);
    settingCoinObject(coinData, setCoin);
    if (coinData) {
      const prices = await getPrices(id, days, priceType, setError);
      if (prices) {
        settingChartData(setChartData, prices);
        setLoading(false);
      }
    }
  };
  const handleDaysChange = async (event) => {
    setLoading(true);
    setDays(event.target.value);
    const prices = await getPrices(id, event.target.value, priceType, setError);
    if (prices) {
      settingChartData(setChartData, prices);
      setLoading(false);
    }
  };
  const handlePriceTypeChange = async (event) => {
    setLoading(true);
    setPriceType(event.target.value);
    const prices = await getPrices(id, days, event.target.value, setError);
    if (prices) {
      settingChartData(setChartData, prices);
      setLoading(false);
    }
  };
  console.log("Days>>>", days);
  console.log("PriceType>>>", priceType);

  return (
    <div>
      <Header />
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="grey-wrapper">{<List coin={coin} />}</div>
          <div className="grey-wrapper">
            <SelectDays days={days} handleDaysChange={handleDaysChange} />
            <ToggleComponents
              priceType={priceType}
              handlePriceTypeChange={handlePriceTypeChange}
            />
            <LineChart chartData={chartData} priceType={priceType} />
          </div>
          <Info title={coin.name} desc={coin.desc} />
        </>
      )}
    </div>
  );
};

export default Coin;
