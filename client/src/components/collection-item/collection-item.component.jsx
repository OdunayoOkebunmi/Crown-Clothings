import React from 'react';
import { connect } from 'react-redux'
import { addCartItem } from '../../redux/cart/cart.actions';

import {
  CollectionItemContainer,
  CollectionFooterContainer,
  AddButton,
  BackgroundImage,
  NameContainer,
  PriceContainer
} from './collection-item.styles';

const CollectionItem = ({ item, addCartItem }) => {
  const { name, price, imageUrl } = item;

  return (
    <CollectionItemContainer>
      <BackgroundImage className='image' imageUrl={ imageUrl } />
      <CollectionFooterContainer>
        <NameContainer>{ name }</NameContainer>
        <PriceContainer>₦{ price }</PriceContainer>
      </CollectionFooterContainer>
      <AddButton onClick={ () => addCartItem(item) } inverted>
        Add to cart
      </AddButton>
    </CollectionItemContainer>
  );
};
const mapDispatchToProps = dispatch => ({
  addCartItem: item => dispatch(addCartItem(item))
})
export default connect(null, mapDispatchToProps)(CollectionItem);