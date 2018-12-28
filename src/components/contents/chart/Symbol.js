import React from 'react';
import LayoutChart from '../../set-data/defaultChart';

// set default value to draw
const {
    chartLayoutHeight,
    xAxis,
    yAxis,
    yData,
    xThck1,
    xThck2,
    yThck1,
} = LayoutChart;

// set max height/y axis
const ptsHeight = chartLayoutHeight - yAxis - (2 * +yData);

function Symbol(props) {
    const {
        data,
        sortDates,
        xDataInterval,
        maxData,
        minData
    } = props;

    return (
        <g>
            {sortDates.map((date, i) => {
                // set ohlc var
                const {
                    '1. open': open,
                    '2. high': high,
                    '3. low': low,
                    '4. close': close,
                } = data[date];

                // count open, high, low, close length for drawing chart
                const diff = +maxData - +minData;
                const openPt = +yData + ptsHeight - ((open - minData) * ptsHeight / diff);
                const highPt = +yData + ptsHeight - ((high - minData) * ptsHeight / diff);
                const lowPt = +yData + ptsHeight - ((low - minData) * ptsHeight / diff);
                const closePt = +yData + ptsHeight - ((close - minData) * ptsHeight / diff);
                
                // set bar place based on interval in x axis from this month until 4 months before 
                const xMiddle = xAxis + ((1 + +i) * xDataInterval);
                const x1 = xMiddle - xThck1 - xThck2;
                const x2 = xMiddle - xThck1;
                const x3 = xMiddle + xThck1;
                const x4 = xMiddle + xThck1 + xThck2;

                // count length for open and close
                const yOpenTop = openPt - yThck1;
                const yOpenBottom = openPt + yThck1;
                const yCloseTop = closePt - yThck1;
                const yClosebottom = closePt + yThck1;
                
                // set bar place in y axis for drawing ohlc chart
                const y1 = highPt;
                const y2 = yOpenTop < highPt ? highPt: openPt - yThck1;
                const y3 = yOpenBottom > lowPt ? lowPt: openPt + yThck1;
                const y4 = yCloseTop < highPt ? highPt: closePt - yThck1;
                const y5 = yClosebottom > lowPt ? lowPt: closePt + yThck1;
                const y6 = lowPt;

                // set condition the price, is it higher or lower between open & close
                let colorPt = 'grey';
                if (+open < +close) {
                    colorPt = 'green';
                } else if (+open > +close) {
                    colorPt = 'red';
                }
                
                // drawing ohlc chart bar
                return (
                    <polygon key={date} points={`${x2},${y6} ${x2},${y3} ${x1},${y3} ${x1},${y2} ${x2},${y2} ${x2},${y1} ${x3},${y1} ${x3},${y4} ${x4},${y4} ${x4},${y5} ${x3},${y5} ${x3},${y6}`} fill={colorPt} />
                )
            })}
        </g>
    );
}

export default Symbol;