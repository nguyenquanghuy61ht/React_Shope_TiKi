import { Box, Checkbox, FormControlLabel, TextField, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
const useStyles = makeStyles((theme) => ({
  root: {
    padding: "16px",
    borderTop: "1px solid #CCCCCC",
  },
  list:{
    padding:0,
    margin:0,
    listStyleType:'none',
    '&>li':{
      margin:0,
    }
  }
}));
function FilterByService({ onChange,filters }) {
  const classes = useStyles();
const handleChangeCheck=(e)=>{
  if(!onChange) return;
  const { name, checked } = e.target;
  console.log(name,checked)
  onChange({
    [name]:checked
  })
  
}
  return (
    <Box className={classes.root}>
      <Typography variant="subtitle1">DỊCH VỤ </Typography>
      <ul className={classes.list}>
        {[
          { value: "isPromotion", label: "Có khuyến mãi" },
          { value: "isFreeShip", label: "Miễn phí vận chuyển" },
        ].map((service) => (
          <li key={service.value}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={Boolean(filters[service.value])}
                  onChange={handleChangeCheck}
                  name={service.value}
                />
              }
              label={service.label}
            />
          </li>
        ))}
      </ul>
    </Box>
  );
}

export default FilterByService;
