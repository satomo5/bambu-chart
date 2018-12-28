import React from 'react';
import dayjs from 'dayjs';
import LayoutChart from '../../set-data/defaultChart';

const {
    chartLayoutHeight,
    xAxis,
    yAxis,
} = LayoutChart;

// function for set dates label in x axis based on month
function XLabeling (props) {
    const { sortDates, xDataInterval } = props;
    const xLabeling = sortDates.reduce((acc, pt, i) => {
        const month = dayjs(pt).format('MMM');
        const year = dayjs(pt).year();
        return acc[`${year}${month}`] ? acc : {
            ...acc,
            [`${year}${month}`] : {
                txt: Object.keys(acc).length > 0 ? `${month} ${year}` : '',
                x: `${xAxis + ((1 + +i) * xDataInterval)}`,
            },
        };
    }, {});

    // set places for dates label
    return (
        <g>
            {Object.keys(xLabeling).map((calender) => {
                const txtPt = xLabeling[calender];
                return (
                    <text key={calender} x={`${txtPt.x}`} y={`${chartLayoutHeight - (0.5 * yAxis)}`} className="chart-label">{txtPt.txt}</text>
                );
            })}
        </g>
    );
}

export default XLabeling;