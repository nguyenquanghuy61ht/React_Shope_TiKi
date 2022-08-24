import storageKeys from "constants/storage-keys";
const { createSlice } = require("@reduxjs/toolkit");
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    showMiniCart: false,
    cartItemes: JSON.parse(localStorage.getItem(storageKeys.PRODUCT)) || [],
  },
  reducers: {
    showMiniCart(state) {
      state.showMiniCart = true;
    },
    hideMiniCart(state) {
      state.showMiniCart = false;
    },
    addTocart(state, action) {
      const newItem = action.payload;
      const index = state.cartItemes.findIndex((x) => x.id === newItem.id);
      if (index >= 0) {
        state.cartItemes[index].quantity += newItem.quantity;
        localStorage.setItem(
          storageKeys.PRODUCT,
          JSON.stringify(state.cartItemes)
        );
      } else {
        state.cartItemes.push(newItem);
        localStorage.setItem(
          storageKeys.PRODUCT,
          JSON.stringify(state.cartItemes)
        );
      }
    },
    setQuantity(state, action) {
      const { id, quantity } = action.payload;
      const index = state.cartItemes.findIndex((x) => x.id === id);
      if (index >= 0) {
        state.cartItemes[index].quantity = quantity;
        localStorage.setItem(
          storageKeys.PRODUCT,
          JSON.stringify(state.cartItemes)
        );
      }
    },
    removeFormCart(state, action) {
      const idNeddToRemove = action.payload;
      state.cartItemes = state.cartItemes.filter(
        (x) => x.id !== idNeddToRemove
      );
      localStorage.setItem(
        storageKeys.PRODUCT,
        JSON.stringify(state.cartItemes)
      );
    },
  },
});

const { actions, reducer } = cartSlice;
export const {
  showMiniCart,
  hideMiniCart,
  addTocart,
  setQuantity,
  removeFormCart,
  ChangeCountcart,
} = actions; //namr export
export default reducer; //default export
