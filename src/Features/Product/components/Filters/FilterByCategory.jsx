import { Box, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import { useEffect } from "react";
import categoryApi from "../../../../api/categoryApi";
const useStyles = makeStyles((theme) => ({
  root: {
    padding: "16px",
  },
  menu: {
    padding: 0,
    margin: 0,
    listStyleType: "none",
    "&>li": {
      marginTop: "6px",
      "&:hover": {
        color: "#1976D2",
        cursor: "pointer",
      },
    },
  },
}));
function FilterByCategory({ onChange1, onChange }) {
  const classes = useStyles();
  const [categoryList, setCategoryList] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const response = await categoryApi.getAll();
        setCategoryList(
          response.map((x) => ({
            id: x.id,
            name: x.name,
          }))
        );
      } catch (error) {
        console.log("fail to fetch category list ", error);
      }
    })();
  }, []);
  const handleClickCurrent = (category) => {
    if (onChange) onChange(category.id);
  };
  const handchangeAll = () => {
    const productAll = {
      _page: 1,
      _limit: 12,
      _sort: "salePrice:ASC",
    };
    if(onChange1) onChange1(productAll);
  };
  return (
    <Box className={classes.root}>
      <Typography variant="subtitle1">DANH MỤC SẢN PHẨM </Typography>
      <ul className={classes.menu}>
        <li onClick={handchangeAll}>
          <Typography variant="body2">Tất cả</Typography>
        </li>
        {categoryList.map((elm) => (
          <li
            key={elm.id}
            onClick={() => {
              handleClickCurrent(elm);
            }}
          >
            <Typography variant="body2">{elm.name}</Typography>
          </li>
        ))}
      </ul>
    </Box>
  );
}

export default FilterByCategory;
