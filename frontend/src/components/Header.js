import React, { useState, useEffect, useContext } from "react";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { NavLink } from "react-router-dom";
import { LoginContext } from "./ContextProvider";

const Header = () => {
  const { loginData, setLoginData } = useContext(LoginContext);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <header>
        <nav>
          <NavLink to="/">
            <h1>HP Cloud</h1>
          </NavLink>

          <div className="avtar">
            {loginData ? (
              <Avatar
                onClick={handleClick}
                style={{
                  background: "salmon",
                  fontWeight: "bold",
                  textTransform: "capitalize",
                }}
              >
                {loginData.validUserOne.fname[0].toUpperCase()}
              </Avatar>
            ) : (
              <Avatar
                onClick={handleClick}
                style={{
                  background: "salmon",
                  fontWeight: "bold",
                  textTransform: "capitalize",
                }}
              >
                M
              </Avatar>
            )}
          </div>

          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <>
              <MenuItem>Profile</MenuItem>
              <MenuItem>Logout</MenuItem>
            </>
          </Menu>
        </nav>
      </header>
    </>
  );
};

export default Header;
