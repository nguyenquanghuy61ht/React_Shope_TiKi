import React from "react";
import { formartPrice } from "utils/common";
import { Box, Typography } from "../../../../node_modules/@mui/material/index";
import { makeStyles } from "../../../../node_modules/@mui/styles/index";
const useStyles = makeStyles((theme) => ({
  root: {
    paddingBottom: "16px",
    borderBottom: "1px solid #BBBBBB",
  },
  shortDescription: {
    padding: "18px 0",
  },
  salePrice: {
    fontSize: "24px",
    marginRight: "24px",
    fontWeight: "bold",
  },
  originalPrice: { marginRight: "16px", textDecoration: "line-through" },
  priceBox: {
    backgroundColor: "#EEEEEE",
    padding: "10px 8px",
  },
}));
function ProductInfo({ product }) {
  const classes = useStyles();
  const { name, shortDescription, salePrice, originalPrice, promotionPercent } =
    product;
  return (
    <Box className={classes.root}>
      <Typography component="h1" variant="h4">
        {name}
      </Typography>
      <Typography variant="body2" className={classes.shortDescription}>
        {shortDescription}
      </Typography>
      <Box className={classes.priceBox}>
        <Box className={classes.salePrice} component="span">
          {formartPrice(salePrice)}
        </Box>
        {promotionPercent > 0 && (
          <>
            <Box component="span" className={classes.originalPrice}>
              {formartPrice(originalPrice)}
            </Box>
            <Box component="span">
             { `-${promotionPercent}%`}
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
}

export default ProductInfo;
