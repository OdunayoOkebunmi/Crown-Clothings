import React from 'react';
import { connect } from 'react-redux';
import { auth } from '../../firebase/firebase.utils'
import { ReactComponent as Logo } from '../../assets/crown.svg';
import { createStructuredSelector } from 'reselect';
import { selectCartHidden } from '../../redux/cart/cart.selectors'
import { selectCurrentUser } from '../../redux/user/user.selectors'
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import { OptionLink, HeaderContainer, OptionsContainer, LogoContainer } from './header.styles';

const Header = ({ currentUser, isHidden }) => (
  <HeaderContainer>
    <LogoContainer to='/'>
      <Logo className='logo' />
    </LogoContainer>
    <OptionsContainer>
      <OptionLink to='/shop'>SHOP NOW</OptionLink>
      <OptionLink to='/contact'>CONTACT</OptionLink>
      { currentUser ? <OptionLink as='div' onClick={ () => auth.signOut() }>SIGN OUT</OptionLink> : <OptionLink to='/signin'> SIGN IN</OptionLink> }
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
export default connect(mapStateToProps)(Header);