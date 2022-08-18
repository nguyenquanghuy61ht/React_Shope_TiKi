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

RegisterForm.propTypes = {
  onSubmit: PropTypes.func,
};

function RegisterForm(props) {
  const classes = useStyles();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      retypePassword: "",
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
      {isSubmitting && <LinearProgress/>}
      <Avatar sx={{ mx: "auto", mb: 2, bgcolor: "secondary.main" }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h3" variant="h5" className={classes.title}>
        Create An Acount
      </Typography>
      <form onSubmit={handleSubmit(handleSubmits)}>
        <InputField
          registers={{
            ...register("fullName", { required: true, minLength: 5 }),
          }}
          name="fullName"
          label="Full Name"
        />
        <InputField
          registers={{
            ...register("email", {
              required: true,
              pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            }),
          }}
          name="email"
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
        <PasswordField
          registers={{
            ...register("retypePassword", {
              required: true,
              minLength: 8,
              maxLength: 12,
              validate: (val) => {
                if (watch("password") !== val) {
                  return "Your passwords do no match";
                }
              },
            }),
          }}
          name="retypePassword"
          label="Retype Password"
        />
        {Object.keys(errors).length !== 0 && (
          <ul
            className="error-container"
            style={{ padding: "0 13px", color: "lightcoral" }}
          >
            {errors.fullName?.type === "minLength" && (
              <li>fullName must be at least 5 characters</li>
            )}
            {errors.fullName?.type === "required" && <li>Name is required</li>}
            {errors.email?.type === "required" && <li>Email is required</li>}
            {errors.email?.type === "pattern" && <li>Invalid Email Address</li>}
            {errors.password?.type === "required" && (
              <li>Password is required</li>
            )}
            {errors.password?.type === "minLength" && (
              <li>Password must be at least 8 characters</li>
            )}
            {errors.password?.type === "maxLength" && (
              <li>password up to 12 characters</li>
            )}
            {errors.retypePassword?.type === "required" && (
              <li>retypePassword is required</li>
            )}
            {errors.retypePassword?.type === "minLength" && (
              <li>retypePassword must be at least 8 characters</li>
            )}
            {errors.retypePassword?.type === "maxLength" && (
              <li>retypePassword up to 12 characters</li>
            )}
            {errors.retypePassword?.type === "validate" && (
              <li>Your passwords do no match</li>
            )}
          </ul>
        )}
        <Button
          type="submit"
          variant="contained"
          sx={{ mt: 2,marginBottom:"15px"}}
          fullWidth
          color="primary"
          disabled={isSubmitting}
        >
          Create an account
        </Button>
      </form>
    </div>
  );
}

export default RegisterForm;
