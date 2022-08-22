import React from "react";
import { Routes, Route } from "react-router-dom";
import PropTypes from "prop-types";
import ListPage from "./pages/ListPage";
import { Box } from "../../../node_modules/@mui/material/index";
import DetailPage from "./pages/DetailPage";

ProductFeature.propTypes = {};

function ProductFeature(props) {
  return (
    <Box pt={4}>
      <ListPage />
    </Box>
  );
}

export default ProductFeature;
