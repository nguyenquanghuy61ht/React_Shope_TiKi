import DOMPurify from 'dompurify';
import React from 'react';
import { Paper } from '../../../../node_modules/@mui/material/index';

function ProductDescription({product}) {
    const safeDescription = DOMPurify.sanitize(product.description);
  return (
    <Paper elevation={0} style={{padding:"15px"}}>
      <div dangerouslySetInnerHTML={{ __html: safeDescription }} />
    </Paper>
  ); 
}

export default ProductDescription;