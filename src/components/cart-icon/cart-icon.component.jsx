import React from 'react';
import { connect } from 'react-redux'
import { selectCartItemsCount } from '../../redux/cart/cart.selectors';
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
import './cart-icon.styles.scss';
import { toggleCartHidden } from '../../redux/cart/cart.actions';

const CartIcon = ({ toggleCartHidden }) => (
  <div className="cart-icon" onClick={ toggleCartHidden }>
    <ShoppingIcon className='shopping-icon' />
    <span className="item-count">0</span>
  </div>
)
const mapStateToProps = (state) => ({
  itemsCount: selectCartItemsCount(state)
})
const mapDispatchToProps = dispatch => ({
  toggleCartHidden: () => dispatch(toggleCartHidden())
})
export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);