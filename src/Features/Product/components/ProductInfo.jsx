import React from 'react';
import { Box, Typography } from '../../../../node_modules/@mui/material/index';
function ProductInfo({product}) {
      const {name,shortDescription,salePrice,originalPrice,promotionPercent}=product
    return (
      <Box>
        <Typography>{name}</Typography>
        <Typography>{shortDescription}</Typography>
        <Box>
          <Box component="span">{salePrice}</Box>
          <Box component="span">{originalPrice}</Box>
          <Box component="span">{promotionPercent}</Box>
        </Box>
      </Box>
    );
}

export default ProductInfo;