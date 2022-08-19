import React, { useEffect } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Container,
  Grid,
  Pagination,
  Paper,
} from "../../../../node_modules/@mui/material/index";
import { makeStyles } from "../../../../node_modules/@mui/styles/index";
import productApi from "api/productApi";
import { useState } from "react";
import ProductSketonList from "../components/ProductSketonList";
import ProductList from "../components/ProductList";

ListPage.propTypes = {};
const useStyle = makeStyles((theme) => ({
  root: {},
  left: {
    width: "250px",
  },
  right: {
    flex: "1 1 0",
  },
  pagination:{
    display:"flex",
    flexFlow:'row nowrap',
    justifyContent:'center',
    marginTop:'20px',
    paddingBottom:'20px'


  }
}));
function ListPage(props) {
  const classes = useStyle();
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    count: 1,
    page: 1,
    total: 12,
  });
  const [filters, setFilters] = useState({
    _page: 1,
    _limit: 12,
  });
  useEffect(() => {
    (async () => {
      try {
        const { data, pagination } = await productApi.getAll(filters);
        console.log(data);
        setProductList(data);
        setPagination(pagination);
      } catch (error) {
        console.log("Failed to fetch product list:", error);
      }
      setLoading(false);
    })();
  }, [filters]);

  const handlePageChange=(e,page)=>{
    setFilters(prevFilter=>(
      {
        ...prevFilter,
        _page:page

      }
    ))
  }
  return (
    <Box>
      <Container>
        <Grid container spacing={1}>
          <Grid item className={classes.left}>
            <Paper elevation={0}>Left Colum</Paper>
          </Grid>
          <Grid item className={classes.right}>
            <Paper elevation={0}>
              {loading ? (
                <ProductSketonList length={12} />
              ) : (
                <ProductList data={productList} />
              )}
              <Box className={classes.pagination}>
                <Pagination
                  count={Math.ceil(pagination.total / pagination.limit)}
                  color="primary"
                  page={Pagination.page}
                  onChange={handlePageChange}
                />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default ListPage;
