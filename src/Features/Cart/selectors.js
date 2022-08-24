import { createSelector } from "@reduxjs/toolkit";
const cartItemSelector = (state) => state.cart.cartItemes;
//count number of product in cart
export const cartItemsCountSelector = createSelector(cartItemSelector, (cartItemes) =>
  cartItemes.reduce((count, item) => count + item.quantity, 0)
);

// calculate  total of cart
export const cartTotalSelector = createSelector(cartItemSelector, (cartItemes) =>
  cartItemes.reduce(
    (total, item) => total + (item.product.salePrice * item.quantity),
    0
  )
);
