import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { auth } from '../../firebase/firebase.utils'
import { ReactComponent as Logo } from '../../assets/crown.svg';
import { createStructuredSelector } from 'reselect';
import { selectCartHidden } from '../../redux/cart/cart.selectors'
import { selectCurrentUser } from '../../redux/user/user.selectors'
import './header.styles.scss';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';

const Header = ({ currentUser, isHidden }) => (
  <div className="header">
    <Link to='/' className='logo-container'>
      <Logo className='logo' />
    </Link>
    <div className="options">
      <Link className='option' to='/shop'>SHOP NOW</Link>
      <Link className='option' to='/contact'>CONTACT</Link>
      { currentUser ? <div className='option' onClick={ () => auth.signOut() }>SIGN OUT</div> : <Link to='/signin'> SIGN IN</Link> }
      <CartIcon />
    </div>
    {
      isHidden ? null : <CartDropdown />
    }

  </div>
);
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  isHidden: selectCartHidden
})
export default connect(mapStateToProps)(Header);