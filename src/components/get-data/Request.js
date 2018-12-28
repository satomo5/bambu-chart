import axios from 'axios';
import stockData from '../set-data/stockData';

// function for calling the api's data from alphavantage database
export function getDataStock({symbol = 'AAPL'}) {
    return axios({
        url: 'https://www.alphavantage.co/query',
        method: 'GET',
        params: {
            function: 'TIME_SERIES_DAILY',
            symbol,
            outputsize: 'compact',
            datatype: 'json',
            apikey: 'NQEYK8PEXOR2EYW0',
        }, 
    });
}

// export the api's data so the component can use it
export function filterDataStocks(filterTxt = '') {
    return filterTxt ? Object.keys(stockData).filter(symbol => new RegExp(filterTxt, 'gi').test(symbol)) : Object.keys(stockData);
}