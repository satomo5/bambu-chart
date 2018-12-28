import axios from 'axios';
import stockData from '../set-data/stockData';

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

export function filterDataStocks(filterTxt = '') {
    return filterTxt ? Object.keys(stockData).filter(symbol => new RegExp(filterTxt, 'gi').test(symbol)) : Object.keys(stockData);
}