import React, { useCallback } from "react";
import { useAuth } from "../../../context/Auth.Context";
import { Link } from "react-router-dom";
import { Avatar, ButtonGroup } from "@mui/material";
import { DropdownContainer } from "./DropdownMenu.styled";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import LogoutIcon from "@mui/icons-material/Logout";

const DropdownMenu: React.FC = () => {
  const { logout, isAuthenticated, user } = useAuth();

  const onLogoutHandler = useCallback(() => {
    logout();
  }, [logout]);

  const avatarUrl = !localStorage.getItem("my-profile")
    ? ""
    : JSON.parse(localStorage.getItem("my-profile") ?? "{}")?.avatar ?? "";

  if (!isAuthenticated) {
    return <></>;
  }

  return (
    <DropdownContainer
      sx={{
        display: "flex",
        "& > *": {
          m: 1,
        },
      }}
    >
      <ButtonGroup
        orientation="vertical"
        aria-label="vertical outlined button group"
      >
        <Link
          to={`/profile/${user?.profile?.id}`}
          className="link"
          style={{ alignItems: "center" }}
        >
          <Avatar
            sx={{ width: 26, height: 24, alignItems: "center" }}
            className="avatar"
            src={avatarUrl}
          />
          My Profile
        </Link>
        <Link
          to={`/profile/change-password`}
          className="link"
          style={{ alignItems: "center" }}
        >
          <VpnKeyIcon className="icon" style={{ marginRight: "15px" }} />
          Change Password
        </Link>
        <Link
          to={"/login"}
          onClick={onLogoutHandler}
          className="link"
          style={{ alignItems: "center" }}
        >
          <LogoutIcon className="icon" style={{ marginRight: "15px" }} />
          Sign out
        </Link>
      </ButtonGroup>
    </DropdownContainer>
  );
};

export default DropdownMenu;
