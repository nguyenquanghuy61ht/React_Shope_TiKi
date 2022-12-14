import React, { useEffect } from "react";
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
import ProductSort from "../components/ProducrtSort";
import ProductFilter from "../components/ProductFilter";
import FilterViewer from "../components/FilterViewer";
import { useNavigate, useParams } from "react-router-dom";
import queryString from "query-string";
import { useMemo } from "react";
import { useCallback, createContext, useContext } from "react";
ListPage.propTypes = {};
const useStyle = makeStyles((theme) => ({
  root: {},
  left: {
    width: "250px",
  },
  right: {
    flex: "1 1 0",
  },
  pagination: {
    display: "flex",
    flexFlow: "row nowrap",
    justifyContent: "center",
    marginTop: "20px",
    paddingBottom: "20px",
  },
}));
function ListPage() {
  const UserContext = createContext();
  const func = useContext(UserContext);
  const navigate = useNavigate();
  const search = useParams();
  const queryParams = useMemo(() => {
    return queryString.parse(search["*"]);
  }, [search]);
  const classes = useStyle();
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    count: 1,
    page: 1,
    total: 12,
  });
  // const [filters, setFilters] = useState({
  //   _page: 1,
  //   _limit: 12,
  //   _sort: "salePrice:ASC",
  // });
  const [filters, setFilters] = useState({
    ...queryParams,
    _page: queryParams._page || 1,
    _limit: queryParams._limit || 12,
    _sort: queryParams._sort || "salePrice:ASC",
  });

  useEffect(() => {
    navigate(queryString.stringify(filters));
  }, [navigate, filters]);
  useEffect(() => {
    (async () => {
      try {
        const { data, pagination } = await productApi.getAll(filters);
        setProductList(data);
        setPagination(pagination);
        func(setProductList)
      } catch (error) {
        console.log("Failed to fetch product list:", error);
      }
      setLoading(false);
    })();
  }, [filters]);

  const handlePageChange = (e, page) => {
    setFilters((prevFilter) => ({
      ...prevFilter,
      _page: page,
    }));
  };
  const hanleChangeSort = (valueSort) => {
    setFilters((prevFilter) => ({
      ...prevFilter,
      _sort: valueSort,
    }));
  };

  const handleFiltersChange = (newFilters) => {
    setFilters((prevFilter) => ({
      ...prevFilter,
      ...newFilters,
    }));
  };
  const handlegetAll = (newFilters) => {
    setFilters(newFilters);
  };
  const setNewFilters = (newFilters) => {
    setFilters(newFilters);
  };
  return (
    <Box>
      <Container>
        <Grid container spacing={1}>
          <Grid item className={classes.left} xs={12} md={3}>
            <Paper elevation={0}>
              <ProductFilter
                filters={filters}
                onChangeAll={handlegetAll}
                onChange={handleFiltersChange}
              />
            </Paper>
          </Grid>
          <Grid item className={classes.right} xs={12} md={9}>
            <Paper elevation={0}>
              <ProductSort
                currentSort={filters._sort}
                onChange={hanleChangeSort}
              />
              <FilterViewer filters={filters} onChange={setNewFilters} />
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
