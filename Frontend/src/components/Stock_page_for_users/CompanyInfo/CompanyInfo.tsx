import React, { FC, useState } from "react";
import classes from "./CompanyInfo.module.css";
import { Star } from "@mui/icons-material";
interface CompanyInfoProps {
  companyname: string;
  symbol: string;
  follow: boolean;
}

const CompanyInfo: React.FC<CompanyInfoProps> = ({
  companyname,
  symbol,
  follow,
}) => {
  const [isFollow, setIsFollow] = useState(follow);
  const handlefollow = () => {
    setIsFollow(!isFollow);
    // add code
  };
  return (
    <div className={classes.companyinfo}>
      <div className={classes.namecompany}>{companyname}</div>
      <div className={classes.symbol}>
        {symbol}
        <div
          className={`${classes.follow} ${isFollow ? classes.unfollow : ""}`}
          onClick={handlefollow}
        >
          <Star />
        </div>
      </div>
    </div>
  );
};

export default CompanyInfo;
