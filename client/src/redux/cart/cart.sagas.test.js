import { takeLatest, put } from 'redux-saga/effects';

import UserActionTypes from '../user/user.types';
import { clearCart } from './cart.actions';
import { clearCartOnSignout, onSignOutSuccess } from './cart.sagas';

describe('on signout success saga', () => {
  it('should trigger on SIGN_OUT_SUCCESS', async () => {
    const generator = onSignOutSuccess();
    expect(generator.next().value).toEqual(
      takeLatest(UserActionTypes.SIGNOUT_SUCCESS, clearCartOnSignout)
    );
  });
});

describe('clear cart on signout saga', () => {
  it('should fire clearCart', () => {
    const generator = clearCartOnSignout();
    expect(generator.next().value).toEqual(put(clearCart()));
  });
});
