import React, { useEffect, useState, useContext } from 'react';
import coinGeckoAPI from '../../utils/CryptoAPI/coinGeckoAPI';
import { WatchListContext } from '../../context/WatchListContext';
import Coin from '../../components/Coin/Coin';

const CoinList = () => {
  const [coins, setCoins] = useState([]);
  const { watchList, deleteCoin } = useContext(WatchListContext);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const response = await coinGeckoAPI.get("/coins/markets/", {
        params: {
          vs_currency: "usd",
          ids: watchList.join(",")
        }
      });
      setCoins(response.data);
      setIsLoading(false);
    };

    if (watchList.length > 0) {
      fetchData();
    } else setCoins([]);
  }, [watchList]);

  const renderCoins = () => {
    if (isLoading) {
      return React.createElement(
        'div',
        null,
        'Loading...'
      );
    }

    return React.createElement(
      'ul',
      { className: 'coinlist list-group mt-2' },
      coins.map(coin => {
        return React.createElement(
          Coin, {
          key: coin.id, coin: coin, deleteCoin: deleteCoin
        }
        );
      })
    );
  };

  return React.createElement(
    'div',
    null,
    renderCoins()
  );
};

export default CoinList;

