import React, { Component } from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "../components/SearchBar";

class MainContainer extends Component {
  constructor() {
    super();
    this.state = {
      stocksList: [],
      portfolioStocks: [],
      filteredPortfolio: [],
      filteredStocks: [],
      settings: {
        sort: {
          Alphabetically: {
            checked: false
          },
          Price: {
            checked: false
          }
        },
        filter: ""
      }
    };
  }
  componentDidMount() {
    fetch("http://localhost:3000/stocks")
      .then(resp => resp.json())
      .then(res => this.setState({ stocksList: res }))
      .catch(e => console.error(e));
  }

  beenClicked = stockObj => {
    let stock = this.state.stocksList.find(stock => stock.id === stockObj.id);
    let col = this.state.stocksList;
    let i = col.indexOf(stock);
    this.setState({
      stocksList: [
        ...col.slice(0, i),
        { ...stock, beenClicked: true },
        ...col.slice(i + 1)
      ],
      portfolioStocks: [
        ...this.state.portfolioStocks,
        { ...stock, beenClicked: true }
      ]
    });
  };

  removePortfolio = stockObj => {
    let stock = this.state.stocksList.find(stock => stock.id === stockObj.id);
    let col = this.state.stocksList;
    let i = col.indexOf(stock);
    let u = this.state.portfolioStocks.indexOf(stock);
    this.setState({
      stocksList: [
        ...col.slice(0, i),
        { ...stock, beenClicked: false },
        ...col.slice(i + 1)
      ],
      portfolioStocks: [...this.state.portfolioStocks.slice(0, u)]
    });
  };

  handleSortChange = event => {
    if (event.target.value === "Alphabetically") {
      this.setState({
        settings: {
          ...this.state.settings,
          sort: {
            ...this.state.settings.sort,
            Alphabetically: {
              ...this.state.settings.sort.Alphabetically,
              checked: true
            },
            Price: {
              ...this.state.settings.sort.price,
              checked: false
            }
          }
        }
      });
    } else if (event.target.value === "Price")
      this.setState({
        settings: {
          ...this.state.settings,
          sort: {
            ...this.state.settings.sort,
            Price: {
              ...this.state.settings.sort.Price,
              checked: true
            },
            Alphabetically: {
              ...this.state.settings.sort.Alphabetically,
              checked: false
            }
          }
        }
      });
  };
  handleFilterChange = event => {
    event.persist();
    this.setState({
      settings: {
        ...this.state.settings,
        filter: event.target.value
      }
    });
    let stocks = [...this.state.stocksList];
    let portfolio = [...this.state.portfolioStocks];
    if (event.target.value !== " ") {
      this.setState({
        filteredStocks: stocks.filter(
          stock => stock.type === event.target.value
        ),
        filteredPortfolio: portfolio.filter(
          stock => stock.type === event.target.value
        )
      });
    } else {
      this.setState({
        filteredStocks: stocks,
        filteredPortfolio: portfolio
      });
    }
  };

  render() {
    return (
      <div>
        <SearchBar
          settings={this.state.settings}
          handleFilterChange={this.handleFilterChange}
          handleSortChange={this.handleSortChange}
        />

        <div className="row">
          <div className="col-8">
            <StockContainer
              settings={this.state.settings}
              stocks={this.state.stocksList}
              onClick={this.beenClicked}
              filteredStocks={this.state.filteredStocks}
            />
          </div>
          <div className="col-4">
            <PortfolioContainer
              settings={this.state.settings}
              portfolio={this.state.portfolioStocks}
              onClick={this.removePortfolio}
              filteredPortfolio={this.state.filteredPortfolio}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default MainContainer;
