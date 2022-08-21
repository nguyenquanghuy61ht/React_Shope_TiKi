import { Box, Button, TextField, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { useState } from "react";
const useStyles = makeStyles((theme) => ({
  root: {
    padding: "16px",
    borderTop: "1px solid #CCCCCC",
  },
  range: {
    display: "flex",
    flexFlow: "row nowrap",
    marginTop: "8px",
    marginBottom: "8px",
    "& > span": {
      marginLeft: "5px",
      marginRight: "5px",
    },
  },
}));
function FilterByPrice({ onChange }) {
  const classes = useStyles();
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
    if (onChange && FilterPrice.salePrice_lte !== 0) onChange(FilterPrice);
    setValues({
      salePrice_gte: 0,
      salePrice_lte: 0,
    });
  };
  return (
    <Box className={classes.root}>
      <Typography variant="subtitle1">CHỌN KHOẢNG GIÁ </Typography>
      <Box className={classes.range}>
        <TextField
          size="small"
          name="salePrice_gte"
          onChange={handleChange}
          value={values.salePrice_gte}
        />
        <span>-</span>
        <TextField
          size="small"
          name="salePrice_lte"
          onChange={handleChange}
          value={values.salePrice_lte}
        />
      </Box>
      <Button
        size="small"
        variant="outlined"
        color="primary"
        onClick={handleSubmit}
      >
        Áp dụng
      </Button>
    </Box>
  );
}

export default FilterByPrice;
