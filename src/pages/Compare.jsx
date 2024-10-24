import React, { useEffect, useRef, useState } from "react";
import Header from "../components/Common/Header";
import SelectCoins from "../components/ComparePage/SelectCoins";
import SelectDays from "../components/Coin/SelectDays";
import { getCoinData } from "../functions/getCoinData";
import { getPrices } from "../functions/getPrices";
import { settingCoinObject } from "../functions/settingCoinObject";
import { settingChartData } from "../functions/settingChartData";
import { get100Coins } from "../functions/get100Coins";
import Loader from "../components/Common/Loader";
import List from "../components/Dashboard/List";
import Info from "../components/Coin/info";
import LineChart from "../components/Coin/LineChart";
import ToggleComponents from "../components/Coin/ToggleComponent";

const Compare = () => {
  const [allCoins, setAllCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  // id states
  const [crypto1, setCrypto1] = useState("bitcoin");
  const [crypto2, setCrypto2] = useState("ethereum");
  // data states
  const [coin1Data, setCoin1Data] = useState({});
  const [coin2Data, setCoin2Data] = useState({});
  const [days, setDays] = useState(30);
  const [priceType, setPriceType] = useState("prices");
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });
  // // Ref to track how many times the state is changed
  // const stateChangeCount = useRef(0);
  // // Ref to track how many times the DOM is rendered
  // const renderCount = useRef(0);
  // // Increment the render count on each render
  // renderCount.current += 1;

  useEffect(() => {
    //stateChangeCount.current += 1;
    getData();
  }, []);

  const getData = async () => {
    console.log("GetData called");
    setLoading(true);
    const coins = await get100Coins();
    if (coins) {
      setAllCoins(coins);
      const data1 = await getCoinData(crypto1);
      const data2 = await getCoinData(crypto2);
      settingCoinObject(data1, setCoin1Data);
      settingCoinObject(data2, setCoin2Data);
      if (data1 && data2) {
        // getPrices
        const prices1 = await getPrices(crypto1, days, priceType);
        const prices2 = await getPrices(crypto2, days, priceType);
        console.log("Both prices fetched");
        settingChartData(setChartData, prices1, prices2);
        setLoading(false);
      }
    }
  };

  async function handleDaysChange(event) {
    setLoading(true);
    setDays(event.target.value);
    const prices1 = await getPrices(crypto1, event.target.value, priceType);
    const prices2 = await getPrices(crypto2, event.target.value, priceType);
    console.log("Both prices fetched");
    settingChartData(setChartData, prices1, prices2);
    setLoading(false);
  }

  const handlePriceTypeChange = async (event) => {
    setLoading(true);
    setPriceType(event.target.value);
    const prices1 = await getPrices(crypto1, days, event.target.value);
    const prices2 = await getPrices(crypto2, days, event.target.value);
    console.log("Both prices fetched");
    settingChartData(setChartData, prices1, prices2);
    setLoading(false);
  };

  const handleCoinChange = async (event, isCoin2) => {
    setLoading(true);
    if (isCoin2) {
      setCrypto2(event.target.value);
      console.log("Coin 2 changed: ", event.target.value);
      let coinData = await getCoinData(event.target.value);
      if (coinData) {
        settingCoinObject(coinData, setCoin2Data);
        const prices = await getPrices(event.target.value, days, priceType);
        if (prices) {
          settingChartData(setChartData, prices);
          setLoading(false);
        }
      }
    } else {
      setCrypto1(event.target.value);
      console.log("Coin 1 changed: ", event.target.value);
      let coinData = await getCoinData(event.target.value);
      if (coinData) {
        settingCoinObject(coinData, setCoin1Data);
        const prices = await getPrices(event.target.value, days, priceType);
        if (prices) {
          settingChartData(setChartData, prices);
          setLoading(false);
        }
      }
    }
  };
  //styling->6:54
  return (
    <div>
      <Header />
      {loading ? (
        <Loader />
      ) : (
        <>
          {/* <div>
        <p>State Change: {stateChangeCount.current}</p>
        <p>Render: {renderCount.current}</p>
      </div> */}
          <div>
            <SelectCoins
              crypto1={crypto1}
              crypto2={crypto2}
              handleCoinChange={handleCoinChange}
              allCoins={allCoins}
            />
            <SelectDays
              days={days}
              handleDaysChange={handleDaysChange}
              noPTag={true}
            />
          </div>
          <div className="grey-wrapper">{<List coin={coin1Data} />}</div>
          <div className="grey-wrapper">{<List coin={coin2Data} />}</div>
          <div className="grey-wrapper">
            <ToggleComponents
              priceType={priceType}
              handlePriceTypeChange={handlePriceTypeChange}
            />
            <LineChart
              chartData={chartData}
              multiAxis={true}
              priceType={priceType}
            />
          </div>
          <Info title={coin1Data.name} desc={coin1Data.desc} />
          <Info title={coin2Data.name} desc={coin2Data.desc} />
        </>
      )}
    </div>
  );
};

export default Compare;
