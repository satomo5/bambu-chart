import React from 'react';
import dayjs from 'dayjs'
import LayoutChart from '../../set-data/defaultChart';
import Axis from './Axis';
import XLabeling from './XLabeling';
import YLabeling from './YLabeling';
import Grid  from './Grid';
import Symbol from './Symbol';

const { chartLayoutWidth, chartLayoutHeight, xAxis } = LayoutChart;

function Chart(props) {
  // set data
  const { data = {} } = props;
  const dates = Object.keys(data);
  const sortDates = dates.sort((a, b) => (dayjs(a) - dayjs(b)));
  const dataCount = dates.length;
  const dataWidth = chartLayoutWidth - xAxis;
  const xDataInterval = dataWidth / (dataCount + 1);

  const { max: maxData, min: minData } = dates.reduce((acc, date, i) => {
    const { '2. high': high, '3. low': low } = data[date];
    const {max, min} = acc;
    return {
      ...acc,
      max: i > 0 ? Math.max(+high, +max) : +high,
      min: i > 0 ? Math.min(+low, +min) : +low,
    };
  }, {});

  // drawing main chart
  return (
    <svg width="100%" height="70vh" viewBox={`0 0 ${chartLayoutWidth} ${chartLayoutHeight}`}>
      {/* drawing main line between x & y */}
      <Axis /> 

      {/* set dates label on line x */}
      <XLabeling sortDates={sortDates} xDataInterval={xDataInterval} />

      {/* set prices label on line y */}
      <YLabeling minData={minData} maxData={maxData} />

      {/* set grid line for helping to read chart */}
      <Grid sortDates={sortDates} xDataInterval={xDataInterval} />

      {/* set and drawing the ohlc chart */}
      <Symbol data={data} sortDates={sortDates} xDataInterval={xDataInterval} minData={minData} maxData={maxData} />
    </svg>
  );
}

export default Chart;