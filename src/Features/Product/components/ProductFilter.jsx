import { Box } from "@mui/material";
import React from "react";
import FilterByCategory from "./Filters/FilterByCategory";
import FilterByPrice from "./Filters/FilterByPrice";
function ProductFilter({ filters, onChange, onChangeAll }) {
  const handleCategoryChange = (newCategoryId) => {
    if (!onChange) return;
    const newFilters = {
      "category.id": newCategoryId,
    };
    onChange(newFilters);
  };
  const handleAllChange = (ListProductall) => {
    if (!onChangeAll) return;
    onChangeAll(ListProductall);
  };
  const handlePriceChange = (FilterPrice) => {
    if (!onChange) return;
    onChange(FilterPrice);
  };
  return (
    <Box>
      <FilterByCategory
        onChange1={handleAllChange}
        onChange={handleCategoryChange}
      />
      <FilterByPrice onChange={handlePriceChange} />
    </Box>
  );
}

export default ProductFilter;
