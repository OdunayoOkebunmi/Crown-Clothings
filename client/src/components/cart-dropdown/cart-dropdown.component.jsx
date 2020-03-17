import React from 'react';
import { withRouter } from 'react-router-dom'
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux'
import { selectCartItems } from '../../redux/cart/cart.selectors';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { toggleCartHidden } from '../../redux/cart/cart.actions';
import CartItem from '../cart-item/cart-item.component'
import {
  CartDropdownContainer,
  CartDropdownButton,
  EmptyMessageContainer,
  CartItemsContainer
} from './cart-dropdown.styles';

export const CartDropdown = ({ cartItems, history, dispatch, user }) => (
  <CartDropdownContainer>
    <CartItemsContainer>
      { cartItems.length ? (
        cartItems.map(cartItem => (
          <CartItem key={ cartItem.id } item={ cartItem } />
        ))
      ) : (
          <EmptyMessageContainer>Your cart is empty</EmptyMessageContainer>
        ) }
    </CartItemsContainer>
    {
      user ? (<CartDropdownButton
        onClick={
          () => {
            history.push('/checkout')
            dispatch(toggleCartHidden())
          }
        }
      >
        GO TO CHECKOUT
      </CartDropdownButton>) : (<CartDropdownButton
          onClick={
            () => {
              history.push('/signin')
              dispatch(toggleCartHidden())
            }
          }
        >
          GO TO CHECKOUT
      </CartDropdownButton>)
    }
  </CartDropdownContainer>

)
const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  user: selectCurrentUser
})
export default withRouter(connect(mapStateToProps)(CartDropdown));