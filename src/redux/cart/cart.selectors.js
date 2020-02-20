import { createSelector } from 'reselect';
/// there are 2 types of selector 1. input selector that doest use create selector
//2 output selector uses input selector and create selector to build themeselves
// input seclector is a function that gets the whole state and returns a slice of it

const selectCart = state => state.cart // returns a lsice of the state
export const selectCartItems = createSelector(
  [selectCart],
  cart => cart.cartItems
) // this is a memoized selector

export const selectCartItemsCount = createSelector(
  [selectCartItems],
  cartItems => cartItems.reduce(
    (accumulatedQuantity, cartItem) =>
      accumulatedQuantity + cartItem.quantity, 0
  )
)