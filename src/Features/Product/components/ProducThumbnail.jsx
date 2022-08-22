import { STATIC_HOST, THUMBNAIL_PLACEHOLDER } from 'constants/common';
import React from 'react';
import { Box } from '../../../../node_modules/@mui/material/index';

function ProducThumbnail({ product }) {
  const thumbnailUrl = product.thumbnail
    ? `${STATIC_HOST}${product.thumbnail?.url}`
    : THUMBNAIL_PLACEHOLDER;
  return (
    <Box>
      <img src={thumbnailUrl} alt="" width="100%" />
    </Box>
  );
}

export default ProducThumbnail;