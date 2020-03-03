import CartActionTypes from './cart.types';
import { addItemToCart, clearItemFromCart, removeItemFromCart } from './cart.utils'
const INITIAL_STATE = {
  isHidden: true,
  cartItems: []
}

const cartReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case CartActionTypes.TOGGLE_CART_HIDDEN:
      return {
        ...state,
        isHidden: !state.isHidden,
      }
    case CartActionTypes.ADD_ITEM:
      return {
        ...state,
        cartItems: addItemToCart(state.cartItems, payload)
      }
    case CartActionTypes.REMOVE_ITEM:
      return {
        ...state,
        cartItems: removeItemFromCart(state.cartItems, payload)

      }
    case CartActionTypes.CLEAR_ITEM_FROM_CART:
      return {
        ...state,
        cartItems: clearItemFromCart(state.cartItems, payload)
      }
    case CartActionTypes.CLEAR_CART:
      return {
        ...state,
        cartItems: []
      }
    default:
      return state
  }
}
export default cartReducer;