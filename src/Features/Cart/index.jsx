import React from "react";
import { useSelector } from "react-redux";
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Typography,
} from "../../../node_modules/@mui/material/index";
import { makeStyles } from "../../../node_modules/@mui/styles/index";
import CartItems from "./components/CartItems";
import CartTotalPrice from "./components/CartTotalPrice";
import { cartItemsCountSelector } from "./selectors";
const useStyle = makeStyles((theme) => ({
  root: { paddingBottom: "24px" },
  row: {
    display: "flex",
  },
  left: {
    width: "800px",
    padding: "12px",
    borderRight: "1px solid Silver",
  },
  right: {
    flex: "1 1 0",
    padding: "12px",
  },
}));
function CartFeature(props) {
  const classes = useStyle();
  const ListCartProduct = useSelector((state) => state.cart.cartItemes);
  const CartItemCount = useSelector(cartItemsCountSelector);
  return (
    <Box pt={4} className={classes.root}>
      <Container>
        <Typography variant="h5">
          Giỏ hàng{" "}
          <span style={{ fontSize: "16px", color: "#666666" }}>
            ({CartItemCount} sản phẩm)
          </span>
        </Typography>
        <Paper elevation={0}>
          <Grid container className={classes.row}>
            <Grid item className={classes.left}>
              {ListCartProduct.map((product) => (
                <CartItems product={product} />
              ))}
            </Grid>
            <Grid item className={classes.right}>
              <CartTotalPrice />
              <Button variant="contained" sx={{width:"100%",marginTop:"20px"}}color="error">
                Tiến hành đặt hàng
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
}

export default CartFeature;
