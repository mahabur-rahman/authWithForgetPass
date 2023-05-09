import React, { useState, useEffect, useContext } from "react";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { NavLink } from "react-router-dom";
import { LoginContext } from "./ContextProvider";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { loginData, setLoginData } = useContext(LoginContext);

  const history = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // logout user
  const logoutuser = async () => {
    let token = localStorage.getItem("usersdatatoken");

    const res = await fetch("/logout", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
        Accept: "application/json",
      },
      credentials: "include",
    });

    const data = await res.json();
    console.log(data);

    if (data.status === 201) {
      console.log("use logout");
      localStorage.removeItem("usersdatatoken");
      setLoginData(false);
      history("/");
    } else {
      console.log("error");
    }
  };

  const goDash = () => {
    history("/dashboard");
  };

  const goError = () => {
    history("*");
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
                  background: "blue",
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
                  background: "red",
                  fontWeight: "bold",
                  textTransform: "capitalize",
                }}
              />
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
            {loginData.validUserOne ? (
              <>
                <MenuItem
                  onClick={() => {
                    goDash();
                    handleClose();
                  }}
                >
                  Profile
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleClose();
                    logoutuser();
                  }}
                >
                  Logout
                </MenuItem>
              </>
            ) : (
              <MenuItem
                onClick={() => {
                  goError();
                  handleClose();
                }}
              >
                Profile
              </MenuItem>
            )}
          </Menu>
        </nav>
      </header>
    </>
  );
};

export default Header;
