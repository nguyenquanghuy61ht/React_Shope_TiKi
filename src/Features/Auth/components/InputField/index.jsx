import React from "react";
import PropTypes from "prop-types";
import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";

function InputField(props) {
  const { label, disabled, registers } = props;

  return (
    <TextField
      {...registers}
      size="small"
      margin="normal"
      fullWidth="true"
      label={label}
      disabled={disabled}
    />
  );
}

export default InputField;
