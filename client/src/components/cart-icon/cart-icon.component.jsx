import React from 'react';
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect';
import { selectCartItemsCount } from '../../redux/cart/cart.selectors';
import { toggleCartHidden } from '../../redux/cart/cart.actions';
import {
  CartContainer,
  ShoppingIcon,
  ItemCountContainer
} from './cart-icon.styles';


const CartIcon = ({ toggleCartHidden, itemsCount }) => (
  <CartContainer onClick={ toggleCartHidden }>
    <ShoppingIcon />
    <ItemCountContainer>{ itemsCount }</ItemCountContainer>
  </CartContainer>
);
const mapStateToProps = createStructuredSelector({
  itemsCount: selectCartItemsCount
})
const mapDispatchToProps = dispatch => ({
  toggleCartHidden: () => dispatch(toggleCartHidden())
})
export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);