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

  return (
    <svg width="100%" height="70vh" viewBox={`0 0 ${chartLayoutWidth} ${chartLayoutHeight}`}>
      <Axis />
      <XLabeling sortDates={sortDates} xDataInterval={xDataInterval} />
      <YLabeling minData={minData} maxData={maxData} />
      <Grid sortDates={sortDates} xDataInterval={xDataInterval} />
      <Symbol data={data} sortDates={sortDates} xDataInterval={xDataInterval} minData={minData} maxData={maxData} />
    </svg>
  );
}

export default Chart;