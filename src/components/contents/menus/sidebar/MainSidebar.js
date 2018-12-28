import React from 'react';

// function for render sidebar (search & stock data cardboard)
function MainSidebar(props) {
    const {
        stockSymbol,
        filterTxt,
        index,
        symbol: selectSymbol,
        handleFilter,
        handleSelect,
    } = props;

    // count how much the stock data and show it. 
    // in this case, it will show all the data stock from stockdata.js  
    const cardViewLength = stockSymbol.length;

    // render the sidebar
    return (
        <div className="sidebar">
            <div className="sidebar-search">
                <input onChange={e => handleFilter(e.target.value)} value={filterTxt} placeholder="Search..." className="sidebar-search-input" />
            </div>
            {stockSymbol.slice(index, +cardViewLength + +index).map(symbol => (
                <div className="sidebar-card" key={symbol} selected={selectSymbol === symbol} onClick={() => handleSelect(symbol)}>
                    <p>{symbol}</p>
                </div>
            ))}
        </div>
    )
}

// set default value
MainSidebar.defaultProps = {
    stockSymbol: [],
    filterTxt: '',
    index: 5,
    symbol: 'AAPl',
    handleFilter: () => {},
    handleSelect: () => {},
}

export default MainSidebar;