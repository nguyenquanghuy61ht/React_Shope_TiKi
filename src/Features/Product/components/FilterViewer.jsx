import React from "react";
import { Box } from "@mui/system";
import { makeStyles } from "@mui/styles";
import { Chip } from "@mui/material";
import { useMemo } from "react";
import { useEffect } from "react";
import categoryApi from "../../../api/categoryApi";
import { useState } from "react";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexFlow: "row wrap",
    alignItems: "center",
    margin: "16px 0px",
    listStyleType: "none",
    padding: 0,
    "&>li": {
      margin: 0,
      padding: "8px",
    },
  },
}));
const FILTER_LIST = [
  {
    id: 1,
    getLabel: () => "Giao hàng miễn phí",
    isActive: (filters) => filters.isFreeShip,
    isVisible: () => true,
    isRemovable: false,
    onRemove: () => {},
    onToggle: (filters) => {
      const newFilter = { ...filters };
      if (newFilter.isFreeShip) {
        delete newFilter.isFreeShip;
      } else {
        newFilter.isFreeShip = true;
      }
      return newFilter;
    },
  },
  {
    id: 2,
    getLabel: () => "Có khuyễn mãi",
    isActive: () => true,
    isVisible: (filters) => filters.isPromotion,
    isRemovable: true,
    onRemove: (filters) => {
      const newFilters = { ...filters };
      delete newFilters.isPromotion;
      return newFilters;
    },
    onToggle: null,
  },
  {
    id: 3,
    getLabel: (filters) =>
      `Từ ${filters.salePrice_gte} đến ${filters.salePrice_lte} `,
    isActive: () => true,
    isVisible: (filters) =>
      Object.keys(filters).includes("salePrice_lte") &&
      Object.keys(filters).includes("salePrice_gte"),
    isRemovable: true,
    onRemove: (filters) => {
      const newFilters = { ...filters };
      delete newFilters.salePrice_gte;
      delete newFilters.salePrice_lte;
      return newFilters;
    },
    onToggle: null,
  },
  {
    id: 4,
    getLabel: (filter) => filter.name,
    isActive: () => true,
    isVisible: (filters) => Object.keys(filters).includes("category.id"),
    isRemovable: true,
    onRemove: (filters) => {
      const newFilters = { ...filters };

      delete newFilters["category.id"];
      delete newFilters.name;
      return newFilters;
    },
    onToggle: null,
  },
];
function FilterViewer({ filters, onChange }) {
  const [nameItem, setNameItem] = useState({});
  const classes = useStyles();
  const IdCategory = filters["category.id"];
  useEffect(() => {
    (async () => {
      if (IdCategory) {
        const item = await categoryApi.get(IdCategory);
        setNameItem(item);
      }
    })();
  }, [IdCategory]);
  const Filter = useMemo(() => {
    let newFilters = { ...filters };
    newFilters = {
      ...newFilters,
      name: nameItem ? nameItem.name : null,
    };
    return newFilters;
  }, [filters, nameItem]);

  const VisibaleFilter = useMemo(() => {
    return FILTER_LIST.filter((x) => x.isVisible(Filter));
  }, [Filter]);
  return (
    <Box component="ul" className={classes.root}>
      {VisibaleFilter.map((x) => (
        <li key={x.id}>
          <Chip
            size="small"
            label={x.getLabel(Filter)}
            color={x.isActive(filters) ? "info" : "default"}
            clickable={!x.isRemovable}
            onClick={
              x.isRemovable
                ? null
                : () => {
                    if (!onChange) return;
                    const newFilter = x.onToggle(filters);
                    onChange(newFilter);
                  }
            }
            onDelete={
              x.isRemovable
                ? () => {
                    if (!onChange) return;
                    const newFilter = x.onRemove(Filter);
                    onChange(newFilter);
                  }
                : null
            }
          />
        </li>
      ))}
    </Box>
  );
}

export default FilterViewer;
