import axios from "axios"

export const getPrices=(id, days,priceType, setError)=>{
    const prices = axios
    .get(
      `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}&interval=daily`
    )
    .then((response) => {
        // if (response.data) {
        //     console.log("Prices>>>", response.data);
        //     if (priceType == "market_caps") {
        //       return response.data.market_caps;
        //     } else if (priceType == "total_volumes") {
        //       return response.data.total_volumes;
        //     } else {
        //       return response.data.prices;
        //     }
        //   }
        return response.data[priceType];
    })
    .catch((error) => {
      console.log("Error>>>", error.message);
      setError(true);
    });
    return prices;
}