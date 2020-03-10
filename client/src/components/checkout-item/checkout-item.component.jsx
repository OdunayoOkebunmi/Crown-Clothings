import React from 'react';
import { connect } from 'react-redux';
import { clearItemFromCart, removeCartItem, addCartItem } from '../../redux/cart/cart.actions';
import {
  CheckoutItemContainer,
  ImageContainer,
  TextContainer,
  QuantityContainer,
  RemoveButtonContainer
} from './checkout-item.styles';


const CheckoutItem = ({ cartItem, clearItemFromCart, removeCartItem, addCartItem }) => {
  const { name, imageUrl, price, quantity } = cartItem;
  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <img src={ imageUrl } alt='item' />
      </ImageContainer>
      <TextContainer>{ name }</TextContainer>
      <QuantityContainer>
        <div onClick={ () => removeCartItem(cartItem) }>&#10094;</div>
        <span>{ quantity }</span>
        <div onClick={ () => addCartItem(cartItem) }>&#10095;</div>
      </QuantityContainer>
      <TextContainer>{ price }</TextContainer>
      <RemoveButtonContainer onClick={ () => clearItemFromCart(cartItem) }>
        &#10005;
      </RemoveButtonContainer>
    </CheckoutItemContainer>
  )

};
const mapDispatchToProps = dispatch => ({
  clearItemFromCart: item => dispatch(clearItemFromCart(item)),
  removeCartItem: item => dispatch(removeCartItem(item)),
  addCartItem: item => dispatch(addCartItem(item))
})
export default connect(null, mapDispatchToProps)(CheckoutItem);