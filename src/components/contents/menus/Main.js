import React, { Component } from 'react';
import stockData from '../../set-data/stockData';
import {getDataStock, filterDataStocks} from '../../get-data/Request';
import Sidebar from './sidebar/MainSidebar';
import Chart from '../chart/Chart';

// save the data in local storage
const symbolFilter = window.localStorage.getItem('filterTxt') || '';
const symbolIndexStorage = window.localStorage.getItem('symbolIndex');
const symbolStorage = window.localStorage.getItem('symbol');

// function for render the content (sidebar and ohlc chart)
class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stockSymbol: filterDataStocks(symbolFilter),
      filterTxt: symbolFilter || '',
      symbolIndex: symbolIndexStorage === undefined || symbolIndexStorage === null ? 6 : symbolIndexStorage,
      symbol: symbolStorage || 'AAPL',
      loading: false,
      data: {},
      error: null,
    };
    

    this.handleFilter = this.handleFilter.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleAPISearch = this.handleAPISearch.bind(this);
  }
  
  componentDidMount() {
    const { symbol = 'AAPL'} = this.state;
    this.handleAPISearch(symbol);
  }
  
  // function for search
  async handleFilter(filterTxt = '') {
    try {
      const stockSymbol = filterDataStocks(filterTxt);
      await this.setState({ stockSymbol, filterTxt, symbolIndex: 0 });
    } catch (error) {
      this.setState({error});
    }
  }
  
  // function for select the cardboard stock
  async handleSelect(symbol) {
    const {filterTxt, symbolIndex, symbol: prevSymbol} = this.state;
    try {
      await this.setState({symbol});
      await this.handleAPISearch(symbol);
      await window.localStorage.setItem('symbol', symbol);
      await window.localStorage.setItem('filterTxt', filterTxt);
      await window.localStorage.setItem('symbolIndex', +symbolIndex);
    } catch(error) {
      this.setState({symbol: prevSymbol});
    }
  }

  // function for load api's data and error handler
  async handleAPISearch(symbol) {
    try {
      await this.setState({loading: true});

      const data = await getDataStock({symbol}).then(res => res.data);

      if (data['Time Series (Daily)']) {
        await this.setState({
          loading: false,
          data: data['Time Series (Daily)'],
          error: null,
        });
      } else {
        await this.setState({
          loading: false,
          error: {
            message: 'Error loading the data. Check your internet or refresh your browser.',
          },
        });
      }
    } catch (error) {
      this.setState({
        loading: false,
        error: {
          ...error,
          alt: 'Error loading the data. Check your internet or refresh your browser.',
        },
      });
    }
  }

  render() {
    const {
      stockSymbol,
      filterTxt,
      symbolIndex,
      symbol,
      loading,
      data = {},
      error = {},
    } = this.state;
    
    // render the main content
    return (
      <div className="content">
        <Sidebar className="content-sidebar" stockSymbol={stockSymbol} filterTxt={filterTxt} symbolIndex={symbolIndex} symbol={symbol} handleFilter={this.handleFilter} viewContent={this.viewContent} handleSelect={this.handleSelect} />
        <div className="content-main">
          <div className="content-main-header">
            <h1>{symbol}</h1>
            <span>{stockData[symbol].security}</span>
          </div>
          <div className="content-main-content">
            {/* check the data loading is it done or fail */}
            {error ? (
              <div className="content-main-error">
                <p>
                  {error.alt ? `${error.alt}` : ''}
                  {error.message ? `${error.message}` : ''}
                </p>
              </div>
            ) : <div>{loading && (
              <div className="content-loading">Loading Data. Please Wait.</div>)}
            <Chart data={data} />
            </div>}
          </div>
        </div>
      </div>
    );
  }
}

export default Main;