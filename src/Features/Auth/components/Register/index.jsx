import RegisterForm from "../RegisterForm";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { register } from "../../userSlice";
import { useSnackbar } from "notistack";
function Register({ closeDialog }) {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  async function handleSubmit(value) {
    //console.log("todo", value);
    try {
      //auto set username=email
      value.username = value.email;
      const action = register(value);
      const resultAction = await dispatch(action);
      const user = unwrapResult(resultAction);
      enqueueSnackbar("Register successfully!!", { variant: "success" });
      if (closeDialog) {
        closeDialog();
      }
      //do somthinh here on
      console.log("new user", user);
    } catch (error) {
      enqueueSnackbar(error.message, { variant: "error" });
      console.log("failed to register!", error);
    }
  }
  return (
    <>
      <RegisterForm onSubmit={handleSubmit} />
    </>
  );
}

export default Register;
