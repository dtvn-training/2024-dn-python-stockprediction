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
      {StockData ? new Date(StockData.date).toLocaleDateString() : "Loading..."}
      </div>
      <div className={classes.open}>
        <span>Open</span>
        {StockData ? StockData.open : "Loading..."}
      </div>
      <div className={classes.high}>
        <span>High</span>
        {StockData ? StockData.high : "Loading..."}
      </div>
      <div className={classes.low}>
        <span>Low</span>
        {StockData ? StockData.low : "Loading..."}
      </div>
      <div className={classes.close}>
        <span>Previous Close</span>
        {StockData ? StockData.previous_close_price : "Loading..."}
      </div>
    </div>
  );
};

export default TableDetail;
