
import Chart, {
  Series,
  Aggregation,
  ArgumentAxis,
  Grid,
  Label,
  ValueAxis,
  Margin,
  Legend,
  Tooltip,
} from 'devextreme-react/chart';
import RangeSelector, {
  Size,
  Scale,
  Chart as RsChart,
  ValueAxis as RsValueAxis,
  Series as RsSeries,
  Aggregation as RsAggregation,
  Behavior,
  RangeSelectorTypes,
} from 'devextreme-react/range-selector';
// import { dataSource } from "./data";

// function App() {
//   const [visualRange, setVisualRange] = useState({});

//   const updateVisualRange = useCallback((e: RangeSelectorTypes.ValueChangedEvent) => {
//     setVisualRange(e.value);
//   }, [setVisualRange]);

//   return (
//     <div id="chart-demo">
//       <Chart
//         id="zoomedChart"
//         dataSource={dataSource}
//         title="Google Inc. Stock Prices"
//       >
//         <Series
//           type="candlestick"
//           openValueField="Open"
//           highValueField="High"
//           lowValueField="Low"
//           closeValueField="Close"
//           argumentField="Date"
//         >
//           <Aggregation enabled={true} />
//         </Series>
//         <ArgumentAxis
//           visualRange={visualRange}
//           valueMarginsEnabled={false}
//           argumentType="datetime"
//         >
//           <Grid visible={true} />
//           <Label visible={false} />
//         </ArgumentAxis>
//         <ValueAxis valueType="numeric" />
//         <Margin right={10} />
//         <Legend visible={false} />
//         <Tooltip enabled={true} />
//       </Chart>
//       <RangeSelector
//         dataSource={dataSource}
//         onValueChanged={updateVisualRange}
//       >
//         <Size height={120} />
//         <RsChart>
//           <RsValueAxis valueType="numeric" />
//           <RsSeries
//             type="line"
//             valueField="Open"
//             argumentField="Date"
//           >
//             <RsAggregation enabled={true} />
//           </RsSeries>
//         </RsChart>
//         <Scale
//           placeholderHeight={20}
//           minorTickInterval="day"
//           tickInterval="month"
//           valueType="datetime"
//           aggregationInterval="week"
//         />
//         <Behavior
//           snapToTicks={false}
//           valueChangeMode="onHandleMove"
//         />
//       </RangeSelector>
//     </div>
//   );
// }

// export default App;

import React, { FC,useCallback, useState, useEffect } from "react";
import {  getStockImage } from "./CandlestickReq";
import classes from "./Candlestick.module.css";

const Candlestick: FC = () => {
  const [chartImage, setChartImage] = useState<string | null>(null);
  const [visualRange, setVisualRange] = useState({});

  const updateVisualRange = useCallback((e: RangeSelectorTypes.ValueChangedEvent) => {
    setVisualRange(e.value);
  }, [setVisualRange]);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const image = await getStockImage("BID");
        setChartImage(image);
        console.log(chartImage);
      } catch (error) {
        console.error("Error fetching stock image:", error);
      }
    };

    fetchImage();
  }, []);
  console.log(chartImage);
  return (
    <div id="chart-demo">
      {/* <Chart
        id="zoomedChart"
        dataSource={dataSource}
        title="Google Inc. Stock Prices"
      >
        <Series
          type="candlestick"
          openValueField="Open"
          highValueField="High"
          lowValueField="Low"
          closeValueField="Close"
          argumentField="Date"
        >
          <Aggregation enabled={true} />
        </Series>
        <ArgumentAxis
          visualRange={visualRange}
          valueMarginsEnabled={false}
          argumentType="datetime"
        >
          <Grid visible={true} />
          <Label visible={false} />
        </ArgumentAxis>
        <ValueAxis valueType="numeric" />
        <Margin right={10} />
        <Legend visible={false} />
        <Tooltip enabled={true} />
      </Chart>
      <RangeSelector
        dataSource={dataSource}
        onValueChanged={updateVisualRange}
      >
        <Size height={120} />
        <RsChart>
          <RsValueAxis valueType="numeric" />
          <RsSeries
            type="line"
            valueField="Open"
            argumentField="Date"
          >
            <RsAggregation enabled={true} />
          </RsSeries>
        </RsChart>
        <Scale
          placeholderHeight={20}
          minorTickInterval="day"
          tickInterval="month"
          valueType="datetime"
          aggregationInterval="week"
        />
        <Behavior
          snapToTicks={false}
          valueChangeMode="onHandleMove"
        />
      </RangeSelector> */}
    </div>
  );
};

export default Candlestick;
