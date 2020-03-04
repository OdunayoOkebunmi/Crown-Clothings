import React from 'react';
import { connect } from 'react-redux';
import { clearItemFromCart, removeCartItem, addCartItem } from '../../redux/cart/cart.actions';
import './checkout-item.styles.scss';

const CheckoutItem = ({ cartItem, clearItemFromCart, removeCartItem, addCartItem }) => {
  const { name, imageUrl, price, quantity } = cartItem;
  return (
    <div className="checkout-item">
      <div className="image-container">
        <img src={ imageUrl } alt="item" />
      </div>
      <span className="name">{ name }</span>
      <span className="quantity">
        <div className="arrow" onClick={ () => removeCartItem(cartItem) }>&#10094;</div>
        <span className='value'>  { quantity }</span>
        <div className="arrow" onClick={ () => addCartItem(cartItem) }>&#10095;</div>
      </span>
      <span className="price">₦{ price }</span>
      <div className="remove-button" onClick={ () => clearItemFromCart(cartItem) }>&#10005;</div>

    </div>
  )

};
const mapDispatchToProps = dispatch => ({
  clearItemFromCart: item => dispatch(clearItemFromCart(item)),
  removeCartItem: item => dispatch(removeCartItem(item)),
  addCartItem: item => dispatch(addCartItem(item))
})
export default connect(null, mapDispatchToProps)(CheckoutItem);