import React from 'react';
import AddCoin from '../../components/AddCoin/AddCoin';
import CoinList from '../../components/CoinList/CoinList';
import Container from 'react-bootstrap/Container';
import './CoinSummaryPage.css';

const CoinSummaryPage = () => {
  return React.createElement(
    Container,
    null,
    React.createElement(
      'div',
      { className: 'coinsummary border p-2 rounded mt bg-dark' },
      React.createElement(CoinList, null)
    )
  );
};

export default CoinSummaryPage;