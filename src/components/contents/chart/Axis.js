import React from 'react';
import LayoutChart from '../../set-data/defaultChart';

const {
    chartLayoutWidth,
    chartLayoutHeight,
    xAxis,
    yAxis,
} = LayoutChart;

function Axis () {
    return (
        <g className="chart-line-main">
            <line x1={`${xAxis}`} y1={`${chartLayoutHeight - yAxis}`} x2={`${chartLayoutWidth}`} y2={`${chartLayoutHeight - yAxis}`} />
            <line x1={`${xAxis}`} y1="0" x2={`${xAxis}`} y2={`${chartLayoutHeight - yAxis}`} />
        </g>
    )
}

export default Axis;