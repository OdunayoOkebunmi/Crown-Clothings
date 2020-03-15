import { takeLatest, put, all, call, select } from 'redux-saga/effects'
import UserActionTypes from '../user/user.types';
import { clearCart, setCartFromFirebase } from './cart.actions'
import { getUserCartRef } from '../../firebase/firebase.utils';
import { selectCurrentUser } from '../user/user.selectors';
import { selectCartItems } from './cart.selectors';
import CartActionTypes from './cart.types';

export function* clearCartOnSignout () {
  yield put(clearCart())
}
export function* onSignOutSuccess () {
  yield takeLatest(UserActionTypes.SIGNOUT_SUCCESS, clearCartOnSignout);
}

export function* updateCartInFirebase () {
  const currentUser = yield select(selectCurrentUser);
  if (currentUser) {
    try {
      const cartRef = yield getUserCartRef(currentUser.id);
      const cartItems = yield select(selectCartItems);
      yield cartRef.update({ cartItems });
    } catch (error) {
      console.log(error);
    }
  }
}

export function* checkCartFromFirebase ({ payload: user }) {
  const cartRef = yield getUserCartRef(user.id);
  const cartSnapshot = yield cartRef.get();
  yield put(setCartFromFirebase(cartSnapshot.data().cartItems));
}

export function* onUserSignIn () {
  yield takeLatest(UserActionTypes.SIGNIN_SUCCESS, checkCartFromFirebase);
}

export function* onCartChange () {
  yield takeLatest(
    [
      CartActionTypes.ADD_ITEM,
      CartActionTypes.REMOVE_ITEM,
      CartActionTypes.CLEAR_ITEM_FROM_CART
    ],
    updateCartInFirebase
  );
}


export function* cartSagas () {
  yield all([call(onSignOutSuccess), call(onCartChange), call(onUserSignIn)]);
}