import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { UserCircle } from "../Stock_page_for_users/UserCircle/UserCircle";
import { Navigate, useNavigate } from 'react-router';
import classes from "./Header.module.css";

const Header: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    // Perform logout logic here if needed
  };

  if (isLoggedIn) {
    return null; // Return null to hide the header when user is logged in
  }

  return (
    <div className={classes.header}>
      <div className={classes.leftheader}>
        <div className={classes.logo}></div>
      </div>
      <div className={classes.rightheader}>
        <div className={classes.search}>
          <Button variant="outlined" onClick={handleLoginClick}>Đăng nhập</Button>
        </div>
      </div>
    </div>
  );
};

export default Header;
