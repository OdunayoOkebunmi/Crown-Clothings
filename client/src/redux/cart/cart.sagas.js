import { takeLatest, put, all, call } from 'redux-saga/effects'
import UserActionTypes from '../user/user.types';
import { clearCart } from './cart.actions'

export function* clearCartOnSignout () {
  yield put(clearCart())
}
export function* onClearCart () {
  yield takeLatest(UserActionTypes.SIGNOUT_SUCCESS, clearCartOnSignout)
}
export function* cartSagas () {
  yield all([
    call(onClearCart)
  ])
}