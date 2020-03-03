import UserActionTypes from './user.types';

export const googleSigninStart = () => ({
  type: UserActionTypes.GOOGLE_SIGNIN_START
})
export const signinSuccess = (user) => ({
  type: UserActionTypes.SIGNIN_SUCCESS,
  payload: user
})
export const signinFailure = (error) => ({
  type: UserActionTypes.SIGNIN_FAILURE,
  payload: error
})

export const emailSigninStart = (emailAndPassword) => ({
  type: UserActionTypes.EMAIL_SIGNIN_START,
  payload: emailAndPassword
})

export const checkUserSession = () => ({
  type: UserActionTypes.CHECK_USER_SESSION
})

export const signOutStart = () => ({
  type: UserActionTypes.SIGNOUT_START
})
export const signOutSuccess = () => ({
  type: UserActionTypes.SIGNOUT_SUCCESS
})
export const signOutFailure = (error) => ({
  type: UserActionTypes.SIGNOUT_FAILURE,
  payload: error
})


export const signUpStart = (userCredentials) => ({
  type: UserActionTypes.SIGNUP_START,
  payload: userCredentials
})
export const signUpSuccess = ({ user, additionalData }) => ({
  type: UserActionTypes.SIGNUP_SUCCESS,
  payload: { user, additionalData }
})
export const signUpFailure = (error) => ({
  type: UserActionTypes.SIGNUP_FAILURE,
  payload: error
})