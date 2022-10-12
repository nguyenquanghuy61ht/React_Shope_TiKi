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
import Form from "react-bootstrap/Form";
import SearchIcon from "@mui/icons-material/Search";
import "./styles.scss";
import {
  Badge,
  CircularProgress,
  IconButton,
  Paper,
  Popover,
} from "../../../node_modules/@mui/material/index";
import {
  AccountCircle,
  CheckCircle,
  Close,
} from "../../../node_modules/@mui/icons-material/index";
import Login from "Features/Auth/components/Login/index";
import { useDispatch, useSelector } from "react-redux";
import { hideForm, logout, OpenForm } from "Features/Auth/userSlice";
import { cartItemsCountSelector } from "Features/Cart/selectors";
import { useNavigate } from "../../../node_modules/react-router-dom/index";
import { hideMiniCart } from "Features/Cart/cartSlice";
import { useEffect } from "react";
import productApi from "api/productApi";
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
  popover: {
    zIndex: 100,
    minWidth: "100px",
    position: "absolute",
    top: "73%",
    right: "34px",
    padding: "10px",
  },
  title: {
    display: "flex",
    alignItems: "center",
  },
  Button: {
    marginTop: "15px",
    width: "100%",
  },
}));
const MODE = {
  LOGIN: "login",
  REGISTER: "register",
};
export default function Header() {
  const [input, setInput] = useState("");
  const openform = useSelector((state) => state.user.openform);
  const showMiniCart = useSelector((state) => state.cart.showMiniCart);
  const CartItemCount = useSelector(cartItemsCountSelector);
  const loggedInUser = useSelector((state) => state.user.current);
  const isLoggedIn = !!loggedInUser.id;
  const navigate = useNavigate();
  const [mode, setMode] = useState(MODE.LOGIN);
  const dispatch = useDispatch();
  const [anchorEl, setAnchrEl] = useState();
  const opens = Boolean(anchorEl);
  const handleClickOpen = () => {
    dispatch(OpenForm());
  };

  const handleClose = (event, reason) => {
    if (reason !== "backdropClick" && reason !== "escapeKeyDown") {
      dispatch(hideForm());
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
    navigate("/products");
  };
  const handleNavigateCart = () => {
    if (isLoggedIn) {
      navigate("/cart");
    } else {
      dispatch(OpenForm());
    }
  };
  const handleToCart = () => {
    navigate("/cart");
    dispatch(hideMiniCart());
  };
  const handleChange = (e) => {
    setInput(e.target.value.trim());
  };
  useEffect(() => {
    (async () => {
      const data = await productApi.getSearch({
        _q: input,
      });
     
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input]);

  const classes = useStyles();

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="static"
          sx={{ backgroundColor: "#1A94FF", padding: "0 25px" }}
        >
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
            <Box>
              <Form className="d-flex" style={{ marginRight: "20px" }}>
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className=" input-search"
                  aria-label="Search"
                  value={input}
                  onChange={handleChange}
                />
                <Button variant="contained" className="button-search ">
                  <SearchIcon />
                </Button>
              </Form>
            </Box>
            <NavLink className={classes.link} to="/products">
              <Button color="inherit">Sản phẩm</Button>
            </NavLink>
            {!isLoggedIn && (
              <Button color="inherit" onClick={handleClickOpen}>
                Đăng Nhập
              </Button>
            )}
            {isLoggedIn && (
              <IconButton color="inherit" onClick={handleUserClick}>
                <AccountCircle />
              </IconButton>
            )}
            {isLoggedIn && (
              <IconButton
                size="large"
                aria-label="show 4 new mails"
                color="inherit"
                onClick={handleNavigateCart}
              >
                <Badge badgeContent={CartItemCount} color="error">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            )}

            {showMiniCart && (
              <Paper className={classes.popover}>
                <Box className={classes.title}>
                  <IconButton>
                    <CheckCircle color="success" />
                  </IconButton>
                  <Typography variant="body1">
                    Thêm vào giỏ hàng thành công
                  </Typography>
                </Box>
                <Button
                  onClick={handleToCart}
                  variant="contained"
                  color="error"
                  className={classes.Button}
                  sx={{ fontSize: "12px" }}
                >
                  Xem giỏ hàng và thanh toán
                </Button>
              </Paper>
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
          <MenuItem onClick={handleCloseMenu}>Tài khoản</MenuItem>
          <MenuItem onClick={handleLogoutClick}>Đăng xuất</MenuItem>
        </Menu>
        <Dialog
          open={openform}
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
                      Bạn đã có tài khoản. Đăng nhập ngay
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
                      Bạn chưa có tài khoản. Đăng ký ngay
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
