import React from 'react';
import SearchBox from "./SearchBox/SearchBox";
import { UserCircle } from "../Stock_page_for_users/UserCircle/UserCircle";
import classes from "./Header.module.css";

const Header: React.FC = () => {
  return (
    <div className={classes.header}>
      <div className={classes.leftheader}>
        <div className={classes.logo}></div>
      </div>
      <div className={classes.rightheader}>
        {/* <div className={classes.darkmode}></div> */}
        <div className={classes.search}>
          <SearchBox />
        </div>
        <UserCircle className={classes.userCircle} />
      </div>
    </div>
  );
};

export default Header;
