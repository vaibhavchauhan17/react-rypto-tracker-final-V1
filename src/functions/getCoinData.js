import axios from "axios";

export const getCoinData =(id, setError)=>{
    const coin = axios
        .get(`https://api.coingecko.com/api/v3/coins/${id}`)
        .then((response) => {
          return response.data
        })
        .catch((error) => {
          setError(true);
        });
    return coin;
}