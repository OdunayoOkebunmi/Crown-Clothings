import React from 'react';
import { SignInAndSignUpContainer } from './sign-in-sign-up.styles';
import SignIn from '../../components/sign-in/sign-in.component'
import SignUp from '../../components/sign-up/sign-up.component';

const SignInSignUp = () => (
  <SignInAndSignUpContainer>
    <SignIn />
    <SignUp />
  </SignInAndSignUpContainer>

)
export default SignInSignUp;