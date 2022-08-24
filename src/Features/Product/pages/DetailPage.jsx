import React, { useState } from "react";
import { Route, Routes, useParams } from "react-router-dom";
import {
  Box,
  Container,
  Grid,
  Paper,
} from "../../../../node_modules/@mui/material/index";
import LinearProgress from "@mui/material/LinearProgress";
import { makeStyles } from "../../../../node_modules/@mui/styles/index";
import AddToCartForm from "../components/AddToCartForm";
import useProductDetail from "../components/Hooks/useProductDetail";
import ProductAdditional from "../components/ProductAdditional";
import ProductDescription from "../components/ProductDescription";
import ProducThumbnail from "../components/ProducThumbnail";
import ProductInfo from "../components/ProductInfo";
import ProductMenu from "../components/ProductMenu";
import ProductReviews from "../components/ProductReviews";
import { useDispatch, useSelector } from "react-redux";
import { addTocart, hideMiniCart, showMiniCart } from "Features/Cart/cartSlice";
import { OpenForm } from "Features/Auth/userSlice";
const useStyle = makeStyles((theme) => ({
  root: { paddingBottom: "24px" },
  row: {
    display: "flex",
  },
  left: {
    width: "400px",
    padding: "12px",
    borderRight: "1px solid Silver",
  },
  right: {
    flex: "1 1 0",
    padding: "12px",
  },
  loading: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
  },
}));
function DetailPage() {
  const loggedInUser = useSelector((state) => state.user.current);
  const isLoggedIn = !!loggedInUser.id;
  const [error, setError] = useState(false);
  const search = useParams();
  const queryParams = Number(search.productId);
  const classes = useStyle();
  const { product, loading } = useProductDetail(queryParams);
  const dispatch = useDispatch();
  if (loading) {
    return (
      <Box className={classes.loading}>
        <LinearProgress />
      </Box>
    );
  }
  const handleAddToCartSubmit = (formValues) => {
    if (Number.parseInt(formValues.quantity) === 0) {
      setError(true);
    } else if (isLoggedIn === false) {
      dispatch(OpenForm());
      setError(false);
    } else {
      setError(false);
      const action = addTocart({
        id: product.id,
        product,
        quantity: Number.parseInt(formValues.quantity),
      });
      dispatch(action);
      dispatch(showMiniCart());
      setTimeout(() => {
        dispatch(hideMiniCart());
      }, 5000);
    }
  };
  return (
    <Box pt={4} className={classes.root}>
      <Container>
        <Paper elevation={0}>
          <Grid container className={classes.row}>
            <Grid item className={classes.left}>
              <ProducThumbnail product={product} />
            </Grid>
            <Grid item className={classes.right}>
              <ProductInfo product={product} />
              <AddToCartForm onSubmit={handleAddToCartSubmit} error={error} />
            </Grid>
          </Grid>
        </Paper>
        <ProductMenu />
        <Routes>
          <Route
            path="Description"
            element={<ProductDescription product={product} />}
          />
          <Route
            path="additional"
            element={<ProductAdditional product={product} />}
          />
          <Route
            path="reviews"
            element={<ProductReviews product={product} />}
          />
        </Routes>
      </Container>
    </Box>
  );
}

export default DetailPage;
