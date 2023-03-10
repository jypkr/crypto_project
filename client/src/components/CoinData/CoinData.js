import React from "react";

const CoinData = ({ data }) => {
  const renderData = () => {
    if (data) {
      return React.createElement(
        "div",
        { className: "bg-white mt-3 p-2 rounded border row" },
        React.createElement(
          "div",
          { className: "col-sm" },
          React.createElement(
            "div",
            { className: "d-flex flex-column" },
            React.createElement(
              "span",
              { className: "text-muted coin-data-category" },
              "Market Cap"
            ),
            React.createElement(
              "span",
              null,
              data.market_cap
            )
          ),
          React.createElement("hr", null),
          React.createElement(
            "div",
            { className: "d-flex flex-column" },
            React.createElement(
              "span",
              { className: "text-muted coin-data-category" },
              "Total Supply"
            ),
            React.createElement(
              "span",
              null,
              data.total_supply
            )
          )
        ),
        React.createElement(
          "div",
          { className: "col-sm" },
          React.createElement(
            "div",
            { className: "d-flex flex-column" },
            React.createElement(
              "span",
              { className: "text-muted coin-data-category" },
              "Volume(24H)"
            ),
            React.createElement(
              "span",
              null,
              data.total_volume
            )
          ),
          React.createElement("hr", null),
          React.createElement(
            "div",
            { className: "d-flex flex-column" },
            React.createElement(
              "span",
              { className: "text-muted coin-data-category" },
              "high 24h"
            ),
            React.createElement(
              "span",
              null,
              data.high_24h
            )
          )
        ),
        React.createElement(
          "div",
          { className: "col-sm" },
          React.createElement(
            "div",
            { className: "d-flex flex-column" },
            React.createElement(
              "span",
              { className: "text-muted coin-data-category" },
              "Circulating Supply"
            ),
            React.createElement(
              "span",
              null,
              data.circulating_supply
            )
          ),
          React.createElement("hr", null),
          React.createElement(
            "div",
            { className: "d-flex flex-column" },
            React.createElement(
              "span",
              { className: "text-muted coin-data-category" },
              "low 24h"
            ),
            React.createElement(
              "span",
              null,
              data.low_24h
            )
          )
        )
      );
    }
  };

  return React.createElement(
    "div",
    null,
    renderData()
  );
};

export default CoinData;

