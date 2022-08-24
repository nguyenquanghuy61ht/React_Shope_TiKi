import React from "react";
import { Box, Link } from "../../../../node_modules/@mui/material/index";
import { NavLink, useLocation } from "react-router-dom";
import { makeStyles } from "../../../../node_modules/@mui/styles/index";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexFlow: "row nowrap",
    justifyContent: "center",
    alignItem: "center",
    padding: 0,
    listStyleType: "none",
    "&>li": {
      padding: "16px 32px",
    },
    "&>li>a": {
      textDecoration: "none",
      color: "grey",
    },
    "&>li>a.active": {
      color: "red",
      textDecoration: "underline",
    },
  },
}));
function ProductMenu() {
  const classes = useStyles();
  const { pathname } = useLocation();

  return (
    <Box component="ul" className={classes.root}>
      <li>
        <Link component={NavLink} to="Description">
          Description
        </Link>
      </li>
      <li>
        <Link component={NavLink} to="additional">
          Additional Infomation
        </Link>
      </li>
      <li>
        <Link component={NavLink} to="reviews">
          Reviews
        </Link>
      </li>
    </Box>
  );
}

export default ProductMenu;
