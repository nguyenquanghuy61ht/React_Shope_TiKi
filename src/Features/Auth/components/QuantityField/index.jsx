import React from "react";
import {
  Box,
  FormControl,
  IconButton,
  OutlinedInput,
  Typography,
} from "../../../../../node_modules/@mui/material/index";
import { Controller } from "react-hook-form";
import {
  AddCircle,
  RemoveCircle,
} from "../../../../../node_modules/@mui/icons-material/index";

function QuantityField(props) {
  const { form, name, label, disabled } = props;
  const { setValue } = form;
  return (
    <FormControl variant="outlined" fullWidth margin="normal">
      <Typography sx={{mb:"5px",ml:"14px"}}>{label}</Typography>
      <Controller
        name={name}
        control={form.control}
        render={({ field: { onChange, onBlur, value, name } }) => (
          <Box>
            <IconButton
              onClick={() => {
                setValue(
                  name,
                  Number.parseInt(value) ? Number.parseInt(value) - 1 : 0
                );
              }}
            >
              <RemoveCircle />
            </IconButton>
            <OutlinedInput
              sx={{ width: "130px" }}
              size="small"
              min="0"
              id={name}
              type="number"
              value={value}
              disabled={disabled}
              onChange={onChange}
              onBlur={onBlur}
            />
            <IconButton
              onClick={() => {
                setValue(
                  name,
                  Number.parseInt(value) ? Number.parseInt(value) + 1 : 1
                );
              }}
            >
              <AddCircle />
            </IconButton>
          </Box>
        )}
      />
    </FormControl>
  );
}

export default QuantityField;
