import { Box, Button, TextField, Typography } from "@mui/material";
import React from "react";
import { useState } from "react";

function FilterByPrice({ onChange }) {
  const [values, setValues] = useState({
    salePrice_gte: 0,
    salePrice_lte: 0,
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevPrice) => ({
      ...prevPrice,
      [name]: value,
    }));
  };
  const handleSubmit = () => {
    const FilterPrice = {
      salePrice_gte: values.salePrice_gte,
      salePrice_lte: values.salePrice_lte,
    };
    if (onChange && FilterPrice.salePrice_lte!==0) onChange(FilterPrice);
    setValues({
      salePrice_gte: 0,
      salePrice_lte: 0,
    });
  };
  return (
    <Box>
      <Typography variant="subtitle1">DANH MỤC SẢN PHẨM </Typography>
      <Box>
        <TextField
          name="salePrice_gte"
          onChange={handleChange}
          value={values.salePrice_gte}
        />
        <span>-</span>
        <TextField
          name="salePrice_lte"
          onChange={handleChange}
          value={values.salePrice_lte}
        />
      </Box>
      <Button variant="outlined" color="primary" onClick={handleSubmit}>
        Lọc
      </Button>
    </Box>
  );
}

export default FilterByPrice;
