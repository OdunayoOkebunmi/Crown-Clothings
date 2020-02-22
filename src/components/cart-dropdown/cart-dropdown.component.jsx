import React from 'react';
import { withRouter } from 'react-router-dom'
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux'
import { selectCartItems } from '../../redux/cart/cart.selectors';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { toggleCartHidden } from '../../redux/cart/cart.actions';
import CartItem from '../cart-item/cart-item.component'
import CustomButton from '../custom-button/custom-button.component';
import './cart-dropdown.styles.scss';

const CartDropdown = ({ cartItems, history, dispatch, user }) => (
  <div className="cart-dropdown">
    <div className="cart-items">
      {
        cartItems.length ? (cartItems.map(cartItem => <CartItem key={ cartItem.id } item={ cartItem } />)) : <span className='empty-message'>You have no item(s) in cart</span>

      }

    </div>
    {
      user ? (<CustomButton
        onClick={
          () => {
            history.push('/checkout')
            dispatch(toggleCartHidden())
          }
        }
      >
        GO TO CHECKOUT
      </CustomButton>) : (<CustomButton
          onClick={
            () => {
              history.push('/signin')
              dispatch(toggleCartHidden())
            }
          }
        >
          GO TO CHECKOUT
      </CustomButton>)
    }


  </div >
)
const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  user: selectCurrentUser
})
export default withRouter(connect(mapStateToProps)(CartDropdown));