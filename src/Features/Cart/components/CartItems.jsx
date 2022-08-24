import { STATIC_HOST, THUMBNAIL_PLACEHOLDER } from "constants/common";
import React, { useEffect, useState } from "react";
import {
  Box,
  IconButton,
  Typography,
} from "../../../../node_modules/@mui/material/index";
import { makeStyles } from "../../../../node_modules/@mui/styles/index";
import { formartPrice } from "utils/common";
import { useDispatch } from "react-redux";
import {
  AddCircleOutline,
  RemoveCircleOutline,
} from "../../../../node_modules/@mui/icons-material/index";
import { removeFormCart, setQuantity } from "../cartSlice";
const useStyle = makeStyles((theme) => ({
  Product: {
    display: "flex",
    justifyContent: "start",
    alignItems: "center",
    marginBottom: "5px",
    "& >img": { width: "100px" },
  },
  infoProduct: {
    marginLeft: "16px",
  },
  productDetail: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  Price: {
    display: "flex",
    flexDirection: "column",
    padding: "0 15px",
  },
  salePrice: {
    fontSize: "20px",
    marginRight: "24px",
    fontWeight: "bold",
  },
  boxSale: {
    display: "flex",
  },
  originalPrice: {
    marginRight: "11px",
    textDecoration: "line-through",
    color: "#777777",
    borderRight: "1px solid #666666",
    paddingRight: "11px",
  },
  quantity: {
    display: "flex",
    alignItems: "center",
    "&>input": {
      width: "35px",
      height: "25px",
      outline: "none",
    },
  },
}));
function CartItems({ product }) {
  const dispatch = useDispatch();
  const [count, setCount] = useState(product.quantity);
  const classes = useStyle();
  const thumbnailUrl = product.product.thumbnail
    ? `${STATIC_HOST}${product.product.thumbnail?.url}`
    : THUMBNAIL_PLACEHOLDER;
  const handleChange = (e) => {
    setCount(e.target.value);
  };
  useEffect(() => {
    const action = setQuantity({
      id: product.id,
      quantity: Number.parseInt(count),
    });
    dispatch(action);
  }, [dispatch, product, count]);

  const handleRemoveCart = () => {
    const action = removeFormCart(product.id);
    dispatch(action);
  };
  return (
    <Box className={classes.Product} key={product.product.id}>
      <img src={thumbnailUrl} alt="" />
      <Box className={classes.productDetail}>
        <Box component="div" className={classes.infoProduct}>
          <Typography
            sx={{
              fontSize: "16px",
              color: "#333333",
              fontWeight: 550,
              marginBottom: "10px",
              minWidth:"288px"
            }}
          >
            {product.product.name}
          </Typography>
          <Typography
            onClick={handleRemoveCart}
            component="h5"
            sx={{ color: "red", cursor: "pointer" }}
          >
            Xóa
          </Typography>
        </Box>
        <Typography className={classes.Price}>
          <Box
            component="span"
            fontsize="16px"
            fontWeight="bold"
            mr={1}
            className={classes.salePrice}
          >
            {formartPrice(product.product.salePrice)}
          </Box>
          {product.product.promotionPercent > 0 && (
            <Box className={classes.boxSale}>
              <Box component="span" className={classes.originalPrice}>
                {formartPrice(product.product.originalPrice)}
              </Box>
              <Box component="span">{`-${product.product.promotionPercent}%`}</Box>
            </Box>
          )}
        </Typography>
        <Box className={classes.quantity}>
          <IconButton
            onClick={() => setCount((prev) => (prev > 1 ? prev - 1 : 1))}
          >
            <RemoveCircleOutline />
          </IconButton>
          <input
            value={count}
            type="number"
            min="1"
            max="10"
            name="quantity"
            onChange={handleChange}
          />
          <IconButton
            onClick={() => setCount((prev) => (prev < 10 ? prev + 1 : 10))}
          >
            <AddCircleOutline />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}

export default CartItems;
