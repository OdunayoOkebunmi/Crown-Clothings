import { takeLatest, put, all, call } from 'redux-saga/effects';
import UserActionTypes from './user.types';
import { auth, googleProvider, createUserProfileDocument, getCurrentUser } from '../../firebase/firebase.utils';
import { signinFailure, signinSuccess, signOutFailure, signOutSuccess, signUpFailure, signUpSuccess } from './user.action';


export function* getSnapshotFromuserAuth (userAuth, additionalData) {
  try {
    const userRef = yield call(
      createUserProfileDocument,
      userAuth,
      additionalData
    );
    const userSnapshot = yield userRef.get();
    yield put(signinSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
  } catch (error) {
    yield put(signinFailure(error));
  }
}

export function* signinWithGoogle () {
  try {
    const { user } = yield auth.signInWithPopup(googleProvider);
    yield getSnapshotFromuserAuth(user)
  } catch (error) {
    yield put(signinFailure(error))
  }

}

export function* onGoogleSigninStart () {
  yield takeLatest(UserActionTypes.GOOGLE_SIGNIN_START, signinWithGoogle)
}

export function* signinWithEmail ({ payload: { email, password } }) {
  try {
    const { user } = yield auth.signInWithEmailAndPassword(email, password);
    yield getSnapshotFromuserAuth(user)
  } catch (error) {
    yield put(signinFailure(error))
  }

}
export function* isAuthenticated () {
  try {
    const userAuth = yield getCurrentUser();
    if (!userAuth) return;
    yield getSnapshotFromuserAuth(userAuth)
  } catch (error) {
    yield put(signinFailure(error))
  }
}
export function* userSignout () {
  try {
    yield auth.signOut()
    yield put(signOutSuccess())

  } catch (error) {
    yield put(signOutFailure(error))
  }
}
export function* signUp ({ payload: { email, password, displayName } }) {
  try {
    const { user } = yield auth.createUserWithEmailAndPassword(email, password);
    yield put(signUpSuccess({ user, additionalData: { displayName } }));
  } catch (error) {
    yield put(signUpFailure(error));
  }
}
export function* signInAfterSignUp ({ payload: { user, additionalData } }) {
  yield getSnapshotFromuserAuth(user, additionalData);
}
export function* onEmailSigninStart () {
  yield takeLatest(UserActionTypes.EMAIL_SIGNIN_START, signinWithEmail)
}

export function* onCheckUserSession () {
  yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isAuthenticated);
}

export function* onSignoutStart () {
  yield takeLatest(UserActionTypes.SIGNOUT_START, userSignout)
}

export function* onSignupStart () {
  yield takeLatest(UserActionTypes.SIGNUP_START, signUp)
}
export function* onSignupSuccess () {
  yield takeLatest(UserActionTypes.SIGNUP_SUCCESS, signInAfterSignUp)
}

export function* userSagas () {
  yield all([
    call(onGoogleSigninStart),
    call(onEmailSigninStart),
    call(onCheckUserSession),
    call(onSignoutStart),
    call(onSignupStart),
    call(onSignupSuccess)
  ])
}
