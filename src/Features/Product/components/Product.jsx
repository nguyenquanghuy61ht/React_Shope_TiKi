import { Box, Typography } from "@mui/material";
import React from "react";
import { formartPrice } from "utils/common";
import { useNavigate } from "../../../../node_modules/react-router-dom/index";
import { STATIC_HOST, THUMBNAIL_PLACEHOLDER } from "../../../constants";

function Product({ product }) {
  const navigate = useNavigate();
  const thumbnailUrl = product.thumbnail
    ? `${STATIC_HOST}${product.thumbnail?.url}`
    : THUMBNAIL_PLACEHOLDER;
  const handleClick = () => {
    navigate(`/product/${product.id}/Description`);
  };
  return (
    <Box padding={1} sx={{ cursor: "pointer" }} onClick={handleClick}>
      <Box padding={1} minHeight="215px">
        <img src={thumbnailUrl} alt={product.name} width="100%" />
      </Box>
      <Typography variant="body2">{product.name}</Typography>
      <Typography variant="body2">
        <Box component="span" fontsize="16px" fontWeight="bold" mr={1}>
          {formartPrice(product.salePrice)}
        </Box>
        {product.promotionPercent > 0 ? `-${product.promotionPercent}%` : ""}
      </Typography>
    </Box>
  );
}

export default Product;
