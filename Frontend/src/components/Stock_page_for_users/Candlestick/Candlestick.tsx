// Candlestick.tsx

import React, { FC, useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import classes from "./Candlestick.module.css";
import { getStockdata } from "./CandlestickReq";

const Candlestick = () => {
  const [companyData, setCompanyData] = useState<any | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getStockdata("BID");
        setCompanyData(data);
      } catch (error) {
        console.error("Error fetching company data:", error);
      }
    };

    fetchData();
  }, []);
  const chartState = {
    series: [
      {
        data: companyData,
      },
    ],
    options: {
      chart: {
        type: "candlestick",
        height: 290,
        id: "candles",
        toolbar: {
          autoSelected: "pan",
          show: false,
        },
        zoom: {
          enabled: false,
        },
      },
      plotOptions: {
        candlestick: {
          colors: {
            upward: "#3C90EB",
            downward: "#DF7D46",
          },
        },
      },
      xaxis: {
        type: "datetime",
      },
    },
    seriesBar: [
      {
        name: "volume",
        data: [1, 2, 3, 6, 5, 6, 9, 8, 8],
      },
    ],
    optionsBar: {
      chart: {
        height: 160,
        type: "bar",
        brush: {
          enabled: true,
          target: "candles",
        },
        selection: {
          enabled: true,
          xaxis: {
            min: new Date("20 Jan 2017").getTime(),
            max: new Date("10 Dec 2017").getTime(),
          },
          fill: {
            color: "#ccc",
            opacity: 0.4,
          },
          stroke: {
            color: "#0D47A1",
          },
        },
      },
      dataLabels: {
        enabled: false,
      },
      plotOptions: {
        bar: {
          columnWidth: "80%",
          colors: {
            ranges: [
              {
                from: -1000,
                to: 0,
                color: "#F15B46",
              },
              {
                from: 1,
                to: 10000,
                color: "#FEB019",
              },
            ],
          },
        },
      },
      stroke: {
        width: 0,
      },
      xaxis: {
        type: "datetime",
        axisBorder: {
          offsetX: 13,
        },
      },
      yaxis: {
        labels: {
          show: false,
        },
      },
    },
  };

  return (
    <div>
      <div className={classes.chartbox}>
        <div id="chart-candlestick">
          <ReactApexChart
            options={chartState.options}
            series={chartState.series}
            type="candlestick"
            height={290}
          />
        </div>
        <div id="chart-bar">
          <ReactApexChart
            options={chartState.optionsBar}
            series={chartState.seriesBar}
            type="bar"
            height={160}
          />
        </div>
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default Candlestick;
