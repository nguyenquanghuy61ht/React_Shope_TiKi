import React from "react";
import {
  Box,
  FormControl,
  IconButton,
  TextField,
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
    <FormControl
      variant="outlined"
      fullWidth
      margin="normal"
      sx={{ mt: "25px" }}
    >
      <Controller
        name={name}
        control={form.control}
        render={({ field: { onChange, onBlur, value, name } }) => (
          <Box class>
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
            <TextField
              sx={{ width: "100px" }}
              size="small"
              min="0"
              max="10"
              id={name}
              label={label}
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
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
