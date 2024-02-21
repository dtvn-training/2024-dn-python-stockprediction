import classes from "./TableDetail.module.css";
import React,{  useState,useEffect  } from "react";
import {getStockdata} from "./TableDetailReq"
interface DetailProps {
  symbol:string;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  avgvol10day: string;
}
const TableDetail: React.FC<DetailProps> = ({
  symbol,
  open,
  high,
  low,
  close,
  volume,
  avgvol10day,
}) => {
  const [stockdata, SetStockData] = useState<any | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getStockdata(symbol);
        SetStockData(data);
      } catch (error) {
        console.error('Error fetching company data:', error);
      }
    };

    fetchData();
  }, [symbol]);

  return (
    <div className={classes.tabledetail}>
      <div className={classes.open}>
        <span>open</span>
        {stockdata ? stockdata.open : 'Loading...'}
      </div>
      <div className={classes.high}>
        <span>high</span>
        {high}
      </div>
      <div className={classes.low}>
        <span>low</span>
        {low}
      </div>
      <div className={classes.close}>
        <span>close</span>
        {close}
      </div>
      <div className={classes.volume}>
        <span>volume</span>
        {volume}
      </div>
      <div className={classes.avg10day}>
        <span>KLTB 10 ngày</span>
        {avgvol10day}
      </div>
    </div>
  );
};

export default TableDetail;
