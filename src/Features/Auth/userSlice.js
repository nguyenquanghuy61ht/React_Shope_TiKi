import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userApi from "../../api/userApi";
import storageKeys from "constants/storage-keys";
export const register = createAsyncThunk("user/register", async (payload) => {
  //call Api to register
  const data = await userApi.register(payload);
  // save data to local storage
  localStorage.setItem(storageKeys.TOKEN, data.jwt);
  localStorage.setItem(storageKeys.USER, JSON.stringify(data.user));

  return data.user;
});
export const login = createAsyncThunk("user/login", async (payload) => {
  //call Api to register
  const data = await userApi.login(payload);
  // save data to local storage
  localStorage.setItem(storageKeys.TOKEN, data.jwt);
  localStorage.setItem(storageKeys.USER, JSON.stringify(data.user));

  return data.user;
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    current: JSON.parse(localStorage.getItem(storageKeys.USER)) || {},
    openform: false,
    settings: {},
  },
  reducers: {
    OpenForm(state) {
      state.openform = true;
    },
    hideForm(state) {
      state.openform = false;
    },
    logout(state) {
      localStorage.removeItem(storageKeys.USER);
      localStorage.removeItem(storageKeys.TOKEN);
      state.current = {};
    },
  },
  // khin cai thunk thanh cong thi ca[p nhat vao redux
  extraReducers: {
    [register.fulfilled]: (state, action) => {
      state.current = action.payload;
      //return tren thunk return tra ve gi thi o day nhan dc vay
    },
    [login.fulfilled]: (state, action) => {
      state.current = action.payload;
      //return tren thunk return tra ve gi thi o day nhan dc vay
    },
  },
});

const { actions, reducer } = userSlice;
export const { logout, OpenForm,hideForm } = actions;
export default reducer; //default export
