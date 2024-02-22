// Candlestick.tsx

import React, { FC, useState, useEffect } from "react";
import ApexCharts from "react-apexcharts";
import { getStockdata } from "./CandlestickReq";



const Candlestick: FC = () => {
  const [companyData, setCompanyData] = useState<any | null>(null);
  const [candlestickOptions, setCandlestickOptions] = useState<any>({
    series: [],
    chart: {
      type: 'candlestick',
      height: 290,
      id: 'candles',
      toolbar: {
        autoSelected: 'pan',
        show: false
      },
      zoom: {
        enabled: false
      },
    },
    plotOptions: {
      candlestick: {
        colors: {
          upward: '#3C90EB',
          downward: '#DF7D46'
        }
      }
    },
    xaxis: {
      type: 'datetime'
    }
  });
  const [barChartOptions, setBarChartOptions] = useState<any>({
    series: [],
    chart: {
      height: 160,
      type: 'bar',
      brush: {
        enabled: true,
        target: 'candles'
      },
      selection: {
        enabled: true,
        xaxis: {
          min: new Date('20 Jan 2017').getTime(),
          max: new Date('10 Dec 2017').getTime()
        },
        fill: {
          color: '#ccc',
          opacity: 0.4
        },
        stroke: {
          color: '#0D47A1',
        }
      },
    },
    dataLabels: {
      enabled: false
    },
    plotOptions: {
      bar: {
        columnWidth: '80%',
        colors: {
          ranges: [{
            from: -1000,
            to: 0,
            color: '#F15B46'
          }, {
            from: 1,
            to: 10000,
            color: '#FEB019'
          }],
        },
      }
    },
    stroke: {
      width: 0
    },
    xaxis: {
      type: 'datetime',
      axisBorder: {
        offsetX: 13
      }
    },
    yaxis: {
      labels: {
        show: false
      }
    }
  });

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

  useEffect(() => {
    if (companyData) {
      const candlestickSeries = companyData.map((stockInfo: any) => ({
        x: new Date(stockInfo.date).getTime(),
        y: [stockInfo.open, stockInfo.close, stockInfo.low, stockInfo.high],
      }));


      setCandlestickOptions({
        ...candlestickOptions,
        series: [{ data: candlestickSeries }]
      });

      const barSeries = companyData.map((stockInfo: any) => [new Date(stockInfo.date).getTime(), stockInfo.volume]);

      setBarChartOptions({
        ...barChartOptions,
        series: [{ name: 'volume', data: barSeries }]
      });
    }
  }, [companyData]);

  return (
    <div>
      <div>
        <ApexCharts
          options={candlestickOptions}
          series={candlestickOptions.series}
          type="candlestick"
          height={290}
        />
      </div>
      <div>
        <ApexCharts
          options={barChartOptions}
          series={barChartOptions.series}
          type="bar"
          height={160}
        />
      </div>
    </div>
  );
};

export default Candlestick;
