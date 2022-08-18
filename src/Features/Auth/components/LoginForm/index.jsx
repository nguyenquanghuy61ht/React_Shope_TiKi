import { useForm } from "react-hook-form";
import React from "react";
import PropTypes from "prop-types";
import InputField from "../InputField";
import PasswordField from "../PasswordField";
import { makeStyles } from "@mui/styles";
import { Avatar, Button } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { LinearProgress } from "../../../../../node_modules/@mui/material/index";
const useStyles = makeStyles((theme) => ({
  title: { textAlign: "center", marginTop: "10px" },
}));

LoginForm.propTypes = {
  onSubmit: PropTypes.func,
};

function LoginForm(props) {
  const classes = useStyles();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    
  } = useForm({
    defaultValues: {
      identifier: "",
      password: "",
    },
  });
  const handleSubmits =async (value) => {
    const { onSubmit } = props;
    if (onSubmit) {
      await onSubmit(value);
    }
    
  };
  return (
    <div className={classes.root}>
      {isSubmitting && <LinearProgress />}
      <Avatar sx={{ mx: "auto", mb: 2, bgcolor: "secondary.main" }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h3" variant="h5" className={classes.title}>
        Sign In
      </Typography>
      <form onSubmit={handleSubmit(handleSubmits)}>
        <InputField
          registers={{
            ...register("identifier", {
              required: true,
              pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            }),
          }}
          name="identifier"
          label="Email"
        />
        <PasswordField
          registers={{
            ...register("password", {
              required: true,
              minLength: 8,
              maxLength: 12,
            }),
          }}
          name="password"
          label="Password"
        />

        {Object.keys(errors).length !== 0 && (
          <ul
            className="error-container"
            style={{ padding: "0 13px", color: "lightcoral" }}
          >
            {errors.identifier?.type === "required" && (
              <li>Email is required</li>
            )}
            {errors.identifier?.type === "pattern" && (
              <li>Invalid Email Address</li>
            )}
            {errors.password?.type === "required" && (
              <li>Password is required</li>
            )}
            {errors.password?.type === "minLength" && (
              <li>Password must be at least 8 characters</li>
            )}
            {errors.password?.type === "maxLength" && (
              <li>password up to 12 characters</li>
            )}
          </ul>
        )}
        <Button
          type="submit"
          variant="contained"
          sx={{ mt: 2, marginBottom: "15px" }}
          fullWidth
          color="primary"
          disabled={isSubmitting}
        >
          Sign In
        </Button>
      </form>
    </div>
  );
}

export default LoginForm;
