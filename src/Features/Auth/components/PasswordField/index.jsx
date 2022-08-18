import React, { useState } from "react";
import PropTypes from "prop-types";
import IconButton from "@mui/material/IconButton";
import { OutlinedInput } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";




function PasswordField(props) {
  const {
    name,
    label,
    disabled,
    registers,
  } = props;
  const [showPassword, setShowPassword] = useState();
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <FormControl variant="outlined" fullWidth margin="normal">
      <InputLabel htmlFor={name}>{label}</InputLabel>

      <OutlinedInput
        {...registers}
        size="small"
        id={name}
        type={showPassword ? "text" : "password"}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={toggleShowPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        label={label}
        disabled={disabled}
      />
    </FormControl>
  );
}

export default PasswordField;
