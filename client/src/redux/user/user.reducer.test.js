import UserActionTypes from './user.types';
import userReducer from './user.reducer';

const initialState = {
  currentUser: null,
  error: null
};

describe('userReducer', () => {
  it('should return initial state', () => {
    expect(userReducer(undefined, {})).toEqual(initialState);
  });

  it('should set currentUser to payload on signInSuccess action', () => {
    const mockUser = { id: 1, displayName: 'Yihua' };

    expect(
      userReducer(initialState, {
        type: UserActionTypes.SIGNIN_SUCCESS,
        payload: mockUser
      }).currentUser
    ).toEqual(mockUser);
  });

  it('should set currentUser to null on signOutSuccess action', () => {
    expect(
      userReducer(initialState, {
        type: UserActionTypes.SIGNOUT_SUCCESS
      }).currentUser
    ).toBe(null);
  });

  it('should set errorMessage to payload on signInFailure, signUpFailure, signOutFailure action', () => {
    const mockError = {
      message: 'errored',
      code: 404
    };

    expect(
      userReducer(initialState, {
        type: UserActionTypes.SIGNIN_FAILURE,
        payload: mockError
      }).error
    ).toBe(mockError);

    expect(
      userReducer(initialState, {
        type: UserActionTypes.SIGNUP_FAILURE,
        payload: mockError
      }).error
    ).toBe(mockError);

    expect(
      userReducer(initialState, {
        type: UserActionTypes.SIGNOUT_FAILURE,
        payload: mockError
      }).error
    ).toBe(mockError);
  });
});
