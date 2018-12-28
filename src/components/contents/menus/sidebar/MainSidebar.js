import React from 'react';

function MainSidebar(props) {
    const {
        stockSymbol,
        filterTxt,
        index,
        symbol: selectSymbol,
        handleFilter,
        handleSelect,
    } = props;

    const cardViewLength = stockSymbol.length;

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

MainSidebar.defaultProps = {
    stockSymbol: [],
    filterTxt: '',
    index: 5,
    symbol: 'AAPl',
    handleFilter: () => {},
    handleSelect: () => {},
}

export default MainSidebar;