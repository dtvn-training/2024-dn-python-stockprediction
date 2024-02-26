import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { UserCircle } from "../Stock_page_for_users/UserCircle/UserCircle";
import { Navigate, useNavigate } from 'react-router';
import classes from "./Header.module.css";

const Header: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Check for token in localStorage on component mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    navigate("/");
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    // Perform logout logic here if needed
  };

  // Render the header if isLoggedIn is false
  if (!isLoggedIn) {
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
  }
  else {
    return (
      <div className={classes.header}>
        <div className={classes.leftheader}>
          <div className={classes.logo}></div>
        </div>
        <div className={classes.rightheader}>
          <div className={classes.search}>
            <Button variant="outlined" onClick={handleLogout}>Đăng suất</Button>
          </div>
        </div>
      </div>
    );
  }
  
  // Render null if isLoggedIn is true
  return null;
};

export default Header;
