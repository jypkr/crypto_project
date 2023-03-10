import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CoinHistoryChart from '../../components/CoinHistory/CoinHistoryChart ';
import CoinData from '../../components/CoinData/CoinData'
import coinGeckoAPI from '../../utils/CryptoAPI/coinGeckoAPI';

const CoinDetailPage = () => {
  const { id } = useParams();
  const [coinData, setCoinData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const formatData = data => {
    return data.map(el => {
      return {
        t: el[0],
        y: el[1].toFixed(2)
      };
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const [day, week, year, detail] = await Promise.all([coinGeckoAPI.get(`/coins/${id}/market_chart/`, {
        params: {
          vs_currency: "usd",
          days: "1"
        }
      }), coinGeckoAPI.get(`/coins/${id}/market_chart/`, {
        params: {
          vs_currency: "usd",
          days: "7"
        }
      }), coinGeckoAPI.get(`/coins/${id}/market_chart/`, {
        params: {
          vs_currency: "usd",
          days: "365"
        }
      }), coinGeckoAPI.get("/coins/markets/", {
        params: {
          vs_currency: "usd",
          ids: id
        }
      })]);
      console.log(day);

      setCoinData({
        day: formatData(day.data.prices),
        week: formatData(week.data.prices),
        year: formatData(year.data.prices),
        detail: detail.data[0]
      });
      setIsLoading(false);
    };

    fetchData();
  });

  const renderData = () => {
    if (isLoading) {
      return React.createElement(
        'div',
        null,
        'Loading....'
      );
    }
    return React.createElement(
      'div',
      { className: 'coinlist' },
      React.createElement(CoinHistoryChart, { data: coinData }),
      React.createElement(CoinData, { data: coinData.detail })
    );
  };

  return renderData();
};

export default CoinDetailPage;

