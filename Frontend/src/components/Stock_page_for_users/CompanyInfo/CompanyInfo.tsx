import React from "react";
import classes from "./CompanyInfo.module.css";
import { Star } from "@mui/icons-material";
interface CompanyInfoProps {
  companyname: string;
  symbol: string;
}

const CompanyInfo: React.FC<CompanyInfoProps> = ({ companyname, symbol }) => {
  return (
    <div className={classes.companyinfo}>
      <div className={classes.namecompany}>{companyname}</div>
      <div className={classes.symbol}>
        {symbol} <Star />
      </div>
    </div>
  );
};

export default CompanyInfo;
