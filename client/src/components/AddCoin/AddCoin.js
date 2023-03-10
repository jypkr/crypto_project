import React, { useContext, useState } from 'react'
import { WatchListContext } from '../../context/WatchListContext';

const AddCoin = () => {
  const [isActive, setIsActive] = useState(false);
  const { addCoin } = useContext(WatchListContext);
  const availableCoins = [
    "bitcoin",
    "ethereum",
    "ripple",
    "tether",
    "bitcoin-cash",
    "litecoin",
    "eos",
    "okb",
    "tezos",
    "cardano",
  ];

  const handleClick = coin => {
    addCoin(coin);
    setIsActive(false);
  };

  return React.createElement(
    'div',
    { className: 'dropdown' },
    React.createElement(
      'button',
      {
        onClick: () => setIsActive(!isActive),
        className: 'btn btn-primary dropdown-toggle',
        type: 'button'
      },
      'Add Coin'
    ),
    React.createElement(
      'div',
      { className: isActive ? "dropdown-menu show" : "dropdown-menu" },
      availableCoins.map(el => {
        return React.createElement(
          'a',
          {
            onClick: () => handleClick(el),
            href: '#',
            className: 'dropdown-item'
          },
          el
        );
      })
    )
  );
};

export default AddCoin
