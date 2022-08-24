import cartReducer from "../Features/Cart/cartSlice";
import userReducer from "../Features/Auth/userSlice";
const { configureStore } = require("@reduxjs/toolkit");
const rootReducer = {
  user: userReducer,
  cart: cartReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
