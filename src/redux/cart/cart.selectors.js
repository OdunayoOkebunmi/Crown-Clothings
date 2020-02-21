import { createSelector } from 'reselect';


const selectCart = state => state.cart
export const selectCartItems = createSelector(
  [selectCart],
  cart => cart.cartItems
) // this is a memoized selector
export const selectCartHidden = createSelector(
  [selectCart],
  cart => cart.isHidden
)
export const selectCartItemsCount = createSelector(
  [selectCartItems],
  cartItems => cartItems.reduce(
    (accumulatedQuantity, cartItem) =>
      accumulatedQuantity + cartItem.quantity, 0
  )
)

export const selectCartItemsTotal = createSelector(
  [selectCartItems],
  cartItems => cartItems.reduce(
    (accumulatedQuantity, cartItem) =>
      accumulatedQuantity + cartItem.quantity * cartItem.price, 0
  )
)