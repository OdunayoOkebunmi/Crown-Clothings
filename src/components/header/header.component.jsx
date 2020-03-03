import React from 'react';
import { connect } from 'react-redux';
import { ReactComponent as Logo } from '../../assets/crown.svg';
import { createStructuredSelector } from 'reselect';
import { selectCartHidden } from '../../redux/cart/cart.selectors'
import { selectCurrentUser } from '../../redux/user/user.selectors'
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import { OptionLink, HeaderContainer, OptionsContainer, LogoContainer } from './header.styles';
import { signOutStart } from '../../redux/user/user.action';

const Header = ({ currentUser, isHidden, signOutStart }) => (
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