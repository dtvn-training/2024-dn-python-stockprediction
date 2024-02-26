import classes from "./TableDetail.module.css";
import React from "react";
interface DetailProps {
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  avgvol10day: string;
}
const TableDetail: React.FC<DetailProps> = ({
  open,
  high,
  low,
  close,
  volume,
  avgvol10day,
}) => {
  return (
    <div className={classes.tabledetail}>
      <div className={classes.open}>
        <span>open</span>
        {open}
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
