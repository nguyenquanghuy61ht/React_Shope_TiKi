import { Box } from "@mui/material";
import React from "react";
import FilterByCategory from "./Filters/FilterByCategory";
import FilterByPrice from "./Filters/FilterByPrice";
import FilterByService from "./Filters/FilterByService";
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
  const handleChange = (FilterPrice) => {
    if (!onChange) return;
    onChange(FilterPrice);
  };
  return (
    <Box>
      <FilterByCategory
        onChange1={handleAllChange}
        onChange={handleCategoryChange}
      />
      <FilterByPrice onChange={handleChange} />
      <FilterByService filters={filters}  onChange={handleChange}/>
    </Box>
  );
}

export default ProductFilter;
