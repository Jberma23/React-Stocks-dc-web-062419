import React, { Component } from "react";
import Stock from "../components/Stock";

class PortfolioContainer extends Component {
  render() {
    let portfolio = this.props.portfolio;
    if (this.props.filteredPortfolio.length >= 1) {
      portfolio = this.props.filteredPortfolio;
    }
    return (
      <div>
        <h2>My Portfolio</h2>
        {portfolio.length >= 1
          ? portfolio.map(stock => (
              <Stock
                key={stock.id}
                stock={stock}
                onClick={this.props.onClick}
              />
            ))
          : null}
      </div>
    );
  }
}

export default PortfolioContainer;
