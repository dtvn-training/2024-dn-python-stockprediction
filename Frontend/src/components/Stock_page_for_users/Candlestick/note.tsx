import React, { FC, useState, useEffect } from "react";
import {  getStockImage } from "./CandlestickReq";
import classes from "./Candlestick.module.css";

const Candlestick: FC = () => {
  const [chartImage, setChartImage] = useState<string | null>(null);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const data = await getStockdata("BID");
  //       setCompanyData(data);
  //     } catch (error) {
  //       console.error("Error fetching company data:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const image = await getStockImage("BID");
        setChartImage(image);
      } catch (error) {
        console.error("Error fetching stock image:", error);
      }
    };

    fetchImage();
  }, []);

  return (
    <div>
      <div className={classes.chartbox}>
        {chartImage && (
          <img
            src={`data:image/png;base64,${chartImage}`}
            alt="Stock Chart"
            style={{ width: '900px', height: 'auto' }}
          />
        )}
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default Candlestick;
