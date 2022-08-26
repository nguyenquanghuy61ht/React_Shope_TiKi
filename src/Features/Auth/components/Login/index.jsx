import LoginForm from "../LoginForm";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { login } from "../../userSlice";
import { useSnackbar } from "notistack";
import { current } from "../../../../../node_modules/@reduxjs/toolkit/dist/index";
function Login({ closeDialog }) {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  async function handleSubmit(value) {
    //console.log("todo", value);
    try {
      
      const action = login(value);
      const resultAction = await dispatch(action);
      const user = unwrapResult(resultAction);
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
      <LoginForm onSubmit={handleSubmit} />
    </>
  );
}

export default Login;
