import React from 'react';
import LayoutChart from '../../set-data/defaultChart';

const {
    chartLayoutHeight,
    xAxis,
    yAxis,
} = LayoutChart;

function Grid(props) {
    const { sortDates, xDataInterval } = props;
    return (
        <g className="chart-line-grid">
            {sortDates.map((date, i) => {
                const x = `${xAxis + ((1 + +i) * xDataInterval)}`;
                return (
                    <line key={date} x1={x} y1="0" x2={x} y2={`${chartLayoutHeight - yAxis}`} />
                );
            })}
        </g>
    );
}

export default Grid;