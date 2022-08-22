import React from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Container,
  Grid,
  Paper,
} from "../../../../node_modules/@mui/material/index";
import { makeStyles } from "../../../../node_modules/@mui/styles/index";
import useProductDetail from "../components/Hooks/useProductDetail";
import ProducThumbnail from "../components/ProducThumbnail";
import ProductInfo from "../components/ProductInfo";
const useStyle = makeStyles((theme) => ({
  root: {},
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
}));
function DetailPage() {
  const search = useParams();
  const queryParams = Number(search.productId);

  const classes = useStyle();
  const { product, loading } = useProductDetail(queryParams);
  if (loading) {
    return <Box>Loading....</Box>;
  }
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
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
}

export default DetailPage;
