import React, { Component } from "react";
import Stock from "../components/Stock";

class StockContainer extends Component {
  render() {
    let stocks = this.props.stocks;
    if (this.props.filteredStocks.length >= 1) {
      stocks = this.props.filteredStocks;
    }
    {
      if (this.props.settings.sort["Alphabetically"]["checked"] === true) {
        stocks.sort(function(a, b) {
          let nameA = a.name.toUpperCase();
          let nameB = b.name.toUpperCase();
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0;
        });
      } else {
        null;
      }
    }
    {
      if (this.props.settings.sort["Price"]["checked"] === true) {
        stocks.sort(function(a, b) {
          return a.price - b.price;
        });
      } else {
        null;
      }
    }
    return (
      <div>
        <h2>Stocks</h2>
        {stocks.map(stock => (
          <Stock key={stock.id} stock={stock} onClick={this.props.onClick} />
        ))}
      </div>
    );
  }
}

export default StockContainer;
