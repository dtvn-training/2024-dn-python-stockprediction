// Header.tsx
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { UserCircle } from "../Stock_page_for_users/UserCircle/UserCircle";
import {Password_Login} from '../../pages/Password_Login/Password_Login'; // Import the LoginPage component
import classes from "./Header.module.css";
import { Navigate, useNavigate } from 'react-router';

const Header: React.FC = () => {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const navigate = useNavigate();

  const handleLoginClick = () => {
    setShowLoginForm(true);
    navigate("/login");
  };

  return (
    <div className={classes.header}>
      <div className={classes.leftheader}>
        <div className={classes.logo}></div>
      </div>
      <div className={classes.rightheader}>
        {/* <div className={classes.darkmode}></div> */}
        <div className={classes.search}>
          <Button variant="outlined" onClick={handleLoginClick}>Đăng nhập</Button>
          {showLoginForm && <Password_Login />} {/* Render LoginPage when showLoginForm is true */}
        </div>
        <UserCircle className={classes.userCircle} />
      </div>
    </div>
  );
};

export default Header;
