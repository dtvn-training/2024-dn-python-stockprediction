import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { LoginLink, TopRight } from "./TopBar.styled";
import { UserCircle } from "./UserCircle/UserCircle";
import { Navigate, useNavigate } from "react-router";
import classes from "./Header.module.css";
import DropdownMenu from "./DropdownMenu/DropdownMenu";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<boolean>(false);

  const navigate = useNavigate();

  // Check for token in localStorage on component mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  // Render the header if isLoggedIn is false
  if (!isLoggedIn) {
    return (
      <div className={classes.header}>
        <div className={classes.leftheader}>
          <Link className={classes.logo} to={"/"}></Link>
        </div>
        <div className={classes.rightheader}>
          <div className={classes.search}>
            <Button variant="outlined">
              <Link to={"/login"}>
                Đăng nhập
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className={classes.header}>
        <div className={classes.leftheader}>
          <Link to="/" className={classes.logo}></Link>
        </div>
        <div className={classes.rightheader}>
        <UserCircle 
          className={classes.userCircle} 
          onClick={() => {
            setOpenDropdown((openDropdown) => !openDropdown);
          }} 
        />
          {openDropdown && <DropdownMenu />}
        </div>
      </div>
    );
  }

  return null;
};

export default Header;
