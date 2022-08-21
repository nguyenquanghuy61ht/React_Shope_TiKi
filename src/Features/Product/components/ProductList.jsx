import React from "react";
import { Box, Grid } from "../../../../node_modules/@mui/material/index";
import InfoProductEmty from "./InfoProductEmty";
import Product from "./Product";

function ProductList({ data }) {

  return (
    <Box>
      <Grid container >
        {data.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={3} lg={3}>
            <Product product={product} />
          </Grid>
        ))}
        {data.length === 0 && <InfoProductEmty />}
      </Grid>
    </Box>
  );
}

export default ProductList;
