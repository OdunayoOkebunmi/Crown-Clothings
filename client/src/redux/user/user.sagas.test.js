import { takeLatest, put, call } from 'redux-saga/effects';

import UserActionTypes from './user.types';

import {
  signinFailure,
  signOutSuccess,
  signOutFailure,
} from './user.action';

import {
  auth,
  createUserProfileDocument,
  getCurrentUser
} from '../../firebase/firebase.utils';

import {
  getSnapshotFromuserAuth,
  signinWithGoogle,
  signinWithEmail,
  isAuthenticated,
  userSignout,
  signUp,
  signInAfterSignUp,
  onGoogleSigninStart,
  onEmailSigninStart,
  onCheckUserSession,
  onSignoutStart,
  onSignupStart,
  onSignupSuccess
} from './user.sagas';

describe('on signup success saga', () => {
  it('should trigger on SIGNUP_SUCCESS', () => {
    const generator = onSignupSuccess();
    expect(generator.next().value).toEqual(
      takeLatest(UserActionTypes.SIGNUP_SUCCESS, signInAfterSignUp)
    );
  });
});

describe('on signup start saga', () => {
  it('should trigger on SIGNUP_START', () => {
    const generator = onSignupStart();
    expect(generator.next().value).toEqual(
      takeLatest(UserActionTypes.SIGNUP_START, signUp)
    );
  });
});

describe('on signout start saga', () => {
  it('should trigger on SIGNUP_START', () => {
    const generator = onSignoutStart();
    expect(generator.next().value).toEqual(
      takeLatest(UserActionTypes.SIGNOUT_START, userSignout)
    );
  });
});

describe('on check user session saga', () => {
  it('should trigger on CHECK_USER_SESSION', () => {
    const generator = onCheckUserSession();
    expect(generator.next().value).toEqual(
      takeLatest(UserActionTypes.CHECK_USER_SESSION, isAuthenticated)
    );
  });
});

describe('on email sign in start saga', () => {
  it('should trigger on EMAIL_SIGNIN_START', () => {
    const generator = onEmailSigninStart();
    expect(generator.next().value).toEqual(
      takeLatest(UserActionTypes.EMAIL_SIGNIN_START, signinWithEmail)
    );
  });
});

describe('on google sign in start saga', () => {
  it('should trigger on GOOGLE_SIGNIN_START', () => {
    const generator = onGoogleSigninStart();
    expect(generator.next().value).toEqual(
      takeLatest(UserActionTypes.GOOGLE_SIGNIN_START, signinWithGoogle)
    );
  });
});

describe('on sign in after sign up saga', () => {
  it('should fire getSnapshotFromuserAuth', () => {
    const mockUser = {};
    const mockAdditionalData = {};
    const mockAction = {
      payload: {
        user: mockUser,
        additionalData: mockAdditionalData
      }
    };

    const generator = signInAfterSignUp(mockAction);
    expect(generator.next().value).toEqual(
      getSnapshotFromuserAuth(mockUser, mockAdditionalData)
    );
  });
});

describe('on sign up saga', () => {
  const mockEmail = 'cindy@gmail.com';
  const mockPassword = 'test123';
  const mockDisplayName = 'cindy';

  const mockAction = {
    payload: {
      email: mockEmail,
      password: mockPassword,
      displayName: mockDisplayName
    }
  };

  const generator = signUp(mockAction);

  it('should call auth.createUserWithEmailAndPassword', () => {
    const createUserWithEmailAndPassword = jest.spyOn(
      auth,
      'createUserWithEmailAndPassword'
    );
    generator.next();
    expect(createUserWithEmailAndPassword).toHaveBeenCalled();
  });
});

describe('on sign out saga', () => {
  const generator = userSignout();

  it('should call auth.signOut', () => {
    const expectSignOut = jest.spyOn(auth, 'signOut');
    generator.next();
    expect(expectSignOut).toHaveBeenCalled();
  });

  it('should call signOutSuccess', () => {
    expect(generator.next().value).toEqual(put(signOutSuccess()));
  });

  it('should call signOutFailure on error', () => {
    const newGenerator = userSignout();
    newGenerator.next();
    expect(newGenerator.throw('error').value).toEqual(
      put(signOutFailure('error'))
    );
  });
});

describe('is user authenticated saga', () => {
  const generator = isAuthenticated();

  it('should call getCurrentUser', () => {
    expect(generator.next().value).toEqual(getCurrentUser());
  });

  it('should call getSnapshotFromuserAuth if userAuth exists', () => {
    const mockUserAuth = { uid: '123da' };
    expect(generator.next(mockUserAuth).value).toEqual(
      getSnapshotFromuserAuth(mockUserAuth)
    );
  });

  it('should call signinFailure on error', () => {
    const newGenerator = isAuthenticated();
    newGenerator.next();
    expect(newGenerator.throw('error').value).toEqual(
      put(signinFailure('error'))
    );
  });
});

describe('get snapshot from userAuth', () => {
  const mockUserAuth = {};
  const mockAdditionalData = {};
  const generator = getSnapshotFromuserAuth(mockUserAuth, mockAdditionalData);

  expect(generator.next().value).toEqual(
    call(createUserProfileDocument, mockUserAuth, mockAdditionalData)
  );
});
