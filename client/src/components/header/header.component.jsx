import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';

import { selectCartHidden } from '../../redux/cart/cart.selectors'
import { selectCurrentUser } from '../../redux/user/user.selectors'

import { OptionLink, HeaderContainer, OptionsContainer, LogoContainer } from './header.styles';
import { signOutStart } from '../../redux/user/user.action';

import { ReactComponent as Logo } from '../../assets/crown.svg';

export const Header = ({ currentUser, isHidden, signOutStart }) => (
  <HeaderContainer>
    <LogoContainer to='/'>
      <Logo className='logo' />
    </LogoContainer>
    <OptionsContainer>
      <OptionLink to='/shop'>SHOP NOW</OptionLink>
      <OptionLink to='/contact'>CONTACT</OptionLink>
      { currentUser ? <OptionLink as='div' onClick={ signOutStart }>SIGN OUT</OptionLink> : <OptionLink to='/signin'> SIGN IN</OptionLink> }
      <CartIcon />
    </OptionsContainer>
    {
      isHidden ? null : <CartDropdown />
    }
  </HeaderContainer>
);
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  isHidden: selectCartHidden
})
const mapDispatchToProps = dispatch => ({
  signOutStart: () => dispatch(signOutStart())
})
export default connect(mapStateToProps, mapDispatchToProps)(Header);