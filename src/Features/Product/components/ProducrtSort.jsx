import { Tab, Tabs } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
function ProductSort({ currentSort, onChange }) {
  const handleSortChange = (event,newValue) => {
    if(onChange) onChange(newValue) 
  };
  return (
    <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
      <Tabs onChange={handleSortChange} centered value={currentSort}>
        <Tab label="Giá thấp tới cao" value="salePrice:ASC" />
        <Tab label="Giá cao xuống thấp" value="salePrice:DESC" />
      </Tabs>
    </Box>
  );
}

export default ProductSort;
