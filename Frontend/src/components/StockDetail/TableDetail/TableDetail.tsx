import classes from "./TableDetail.module.css";
import React, { useState, useEffect } from "react";
import { getStockdata } from "./TableDetailReq";
interface DetailProps {
  symbol: string;
}
const TableDetail: React.FC<DetailProps> = ({ symbol }) => {
  const [StockData, setStockData] = useState<any | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getStockdata(symbol);
        setStockData(data);
      } catch (error) {
        console.error("Error fetching company data:", error);
      }
    };

    fetchData();
  }, [symbol]);

  return (
    <div className={classes.tabledetail}>
      <div className={classes.header}>
        <span>Date</span>
        <span className={classes.datetime}>
          {StockData
            ? new Date(StockData.date).toLocaleDateString()
            : "Loading..."}
        </span>
      </div>
      <div className={classes.open}>
        <span>Open</span>
        <span className={classes.info}>
          {StockData ? StockData.open : "Loading..."}
        </span>
      </div>
      <div className={classes.high}>
        <span>High</span>
        <span className={classes.info}>
          {StockData ? StockData.high : "Loading..."}
        </span>
      </div>
      <div className={classes.low}>
        <span>Low</span>
        <span className={classes.info}>
          {StockData ? StockData.low : "Loading..."}
        </span>
      </div>
      <div className={classes.close}>
        <span>Previous Close</span>
        <span className={classes.info}>
          {StockData ? StockData.previous_close_price : "Loading..."}
        </span>
      </div>
    </div>
  );
};

export default TableDetail;
