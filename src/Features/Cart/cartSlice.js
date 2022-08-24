const { createSlice } = require("@reduxjs/toolkit");

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    showMiniCart: false,
    cartItemes: [],
  },
  reducers: {
    showMiniCart(state) {
      state.showMiniCart=true;
    },
    hideMiniCart(state) {
      state.showMiniCart=false;
    },
    addTocart(state, action) {
      const newItem = action.payload;
      const index = state.cartItemes.findIndex((x) => x.id === newItem.id);
      if (index >= 0) {
        state.cartItemes[index].quantity += newItem.quantity;
      } else {
        state.cartItemes.push(newItem);
      }
    },
    setQuantity(state, action) {
      const { id, quantity } = action.payload;
      const index = state.cartItemes.findIndex((x) => x.id === id);
      if (index >= 0) {
        state.cartItemes[index].quantity = quantity;
      }
    },
    removeFormCart(state, action) {
      const idNeddToRemove = action.payload;
      state.cartItemes = state.cartItemes.filter(
        (x) => x.id !== idNeddToRemove
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
