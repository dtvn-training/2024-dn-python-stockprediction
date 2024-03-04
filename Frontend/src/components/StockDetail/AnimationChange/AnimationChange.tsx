import React, { useEffect, useState } from "react";
import classes from "./AnimationChange.module.css";
import { getAllStocks } from "./AnimationChangeReq";
import { Link } from "react-router-dom";
const AnimationChange = () => {
  const [AlldataStock, setAlldataStock] = useState<any | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllStocks();
        setAlldataStock(data);
      } catch (error) {
        console.error("Error fetching all stock data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className={classes.animationchange}>
      {AlldataStock && (
        <ul className={classes.tickerList}>
          {AlldataStock.map(
            (stock: { symbol: string; percent: string }, index: number) => {
              const percentValue = parseFloat(stock.percent);
              const percentClassName =
                percentValue >= 0 ? classes.positive : classes.negative;
              return (
                <li key={index}>
                  <Link to={`/stock/${stock.symbol}`}>
                    <div
                      className={`${classes.Itemchangeprice} ${percentClassName}`}
                    >
                      <span className={classes.symbol}>{stock.symbol}</span>
                      <span className={classes.percent}>
                        {percentValue >= 0
                          ? `+${percentValue.toFixed(2)}%`
                          : `${percentValue.toFixed(2)}%`}
                      </span>
                    </div>
                  </Link>
                </li>
              );
            }
          )}
        </ul>
      )}
    </div>
  );
};

export default AnimationChange;
