import React, { Component } from 'react';
import LayoutChart from '../../set-data/defaultChart';
import CheckDP from '../../set-data/setFloatData';

const {
    chartLayoutHeight,
    yAxis,
    yData,
} = LayoutChart;

// set max height/y axis
const ptsHeight = chartLayoutHeight - yAxis - (2 * +yData);

// function for set prices label in y axis based on highest and lowest range prices
class YLabeling extends Component {
    constructor(props) {
        super(props);
        this.yLabeling = this.yLabeling.bind(this);
    }

    // set interval prices
    yLabeling() {
        const { minData: min, maxData: max } = this.props;
        const interval = 7;
        const yDataInterval = ((+max - +min) / interval);
        const yInterval = (ptsHeight / interval);
        let output = [];
        for ( let i = 0; i <= interval; i++) {
            output = [...output, {
                i,
                y: +ptsHeight + +yData - (+yInterval * i),
                txt: CheckDP({ input: +(min +(yDataInterval * i)), dp: 3 }),
            }];
        }
        return output;
    }

    render() {
        return (
            <g>
                {this.yLabeling().map((yLabel) => {
                    const { i, txt = 0, y } = yLabel;
                    return (
                        <text key={i} x="0" y={y} className="chart-label">
                            ${CheckDP({input: txt, dp: 2})}
                        </text>
                    );
                })}
            </g>
        );
    }
}

export default YLabeling;