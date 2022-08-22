import * as React from "react";
import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { makeStyles } from "@mui/styles";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link, NavLink } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Register from "../../Features/Auth/components/Register";
import { IconButton } from "../../../node_modules/@mui/material/index";
import {
  AccountCircle,
  Close,
} from "../../../node_modules/@mui/icons-material/index";
import Login from "Features/Auth/components/Login/index";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "Features/Auth/userSlice";
const useStyles = makeStyles((theme) => ({
  root: {
    margin: 0,
    padding: 0,
  },
  menuButton: {
    marginRight: "10px",
  },
  link: {
    color: "#fff",
    textDecoration: "none",
    fontSize: "20px",
  },
  closeButton: {
    position: "absolute",
    top: "10px",
    right: "15px",
  },
}));
const MODE = {
  LOGIN: "login",
  REGISTER: "register",
};
export default function Header() {
  const loggedInUser = useSelector((state) => state.user.current);
  const isLoggedIn = !!loggedInUser.id;
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState(MODE.LOGIN);
  const dispatch = useDispatch();
  const [anchorEl, setAnchrEl] = useState();
  const opens = Boolean(anchorEl);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason !== "backdropClick" && reason !== "escapeKeyDown") {
      setOpen(false);
    }
  };
  const handleUserClick = (e) => {
    setAnchrEl(e.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchrEl(null);
  };
  const action = logout();
  const handleLogoutClick = () => {
    handleCloseMenu();
    dispatch(action);
  };

  const classes = useStyles();
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <ShoppingCartIcon className={classes.menuButton} />
            <Typography
              component={"span"}
              variant={"body2"}
              sx={{ flexGrow: 1 }}
            >
              <Link className={classes.link} to="/">
                Tiki
              </Link>
            </Typography>
            <NavLink className={classes.link} to="/todos">
              <Button color="inherit">Todos</Button>
            </NavLink>
            <NavLink className={classes.link} to="/albums">
              <Button color="inherit">Albums</Button>
            </NavLink>
            <NavLink className={classes.link} to="/products">
              <Button color="inherit">Product</Button>
            </NavLink>
            {!isLoggedIn && (
              <Button color="inherit" onClick={handleClickOpen}>
                Login
              </Button>
            )}
            {isLoggedIn && (
              <IconButton color="inherit" onClick={handleUserClick}>
                <AccountCircle />
              </IconButton>
            )}
          </Toolbar>
        </AppBar>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={opens}
          onClose={handleCloseMenu}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={handleCloseMenu}>My account</MenuItem>
          <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
        </Menu>
        <Dialog
          open={open}
          sx={{ maxWidth: "450px", mx: "auto" }}
          onClose={handleClose}
        >
          <IconButton onClick={handleClose}>
            <Close className={classes.closeButton} />
          </IconButton>
          <DialogContent>
            <DialogContentText>
              {mode === MODE.REGISTER && (
                <>
                  <Register closeDialog={handleClose} />
                  <Box textAlign="center">
                    <Button color="primary" onClick={() => setMode(MODE.LOGIN)}>
                      Already have an acount. Login here
                    </Button>
                  </Box>
                </>
              )}
              {mode === MODE.LOGIN && (
                <>
                  <Login closeDialog={handleClose} />
                  <Box textAlign="center">
                    <Button
                      color="primary"
                      onClick={() => setMode(MODE.REGISTER)}
                    >
                      Dont have an acount. Rigister here
                    </Button>
                  </Box>
                </>
              )}
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </Box>
    </div>
  );
}
