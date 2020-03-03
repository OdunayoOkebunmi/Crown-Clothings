import React from 'react';
import './sign-in.styles.scss'
import { connect } from 'react-redux';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { googleSigninStart, emailSigninStart } from '../../redux/user/user.action';
class SignIn extends React.Component {
  state = {
    email: '',
    password: ''
  }
  handleSubmit = async event => {
    event.preventDefault();
    const { emailSigninStart } = this.props
    const { email, password } = this.state;
    emailSigninStart(email, password)
  }

  handleChange = event => {
    const { value, name } = event.target;
    this.setState({ [name]: value })
  }
  render () {
    const { googleSigninStart } = this.props
    return (
      <div className="sign-in">
        <h2>I already have an account</h2>
        <span>Sign in with your email and password</span>
        <form onSubmit={ this.handleSubmit }>
          <FormInput
            name='email'
            type='email'
            handleChange={ this.handleChange }
            value={ this.state.email }
            label='email'
            required
          />
          <FormInput
            name='password'
            type='password'
            value={ this.state.password }
            handleChange={ this.handleChange }
            label='password'
            required
          />
          <div className='buttons'>
            <CustomButton type="submit">Sign in</CustomButton>
            <CustomButton
              type='button'
              onClick={ googleSigninStart }
              isGoogleSignin
            >
              Sign in witgh Google
              </CustomButton>
          </div>

        </form>
      </div>
    )
  }
}
const mapDispatchToProps = (dispatch) => ({
  googleSigninStart: () => dispatch(googleSigninStart()),
  emailSigninStart: (email, password) => dispatch(emailSigninStart({ email, password }))
})
export default connect(null, mapDispatchToProps)(SignIn);