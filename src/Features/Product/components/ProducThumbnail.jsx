import { STATIC_HOST, THUMBNAIL_PLACEHOLDER } from "constants/common";
import React from "react";
import ReactImageZoom from "react-image-zoom";
import { Box } from "../../../../node_modules/@mui/material/index";

function ProducThumbnail({ product }) {
  const thumbnailUrl = product.thumbnail
    ? `${STATIC_HOST}${product.thumbnail?.url}`
    : THUMBNAIL_PLACEHOLDER;
  const props = {
    width: 300,
    height: 280,
    zoomWidth: 270,
    img: thumbnailUrl,
    zoomStyle: "z-index:100;border-radius:'5px'",
  };
  return (
    <Box>
      {/*<img src={thumbnailUrl} alt="" width="100%" />*/}
      <ReactImageZoom {...props} />
    </Box>
  );
}

export default ProducThumbnail;
