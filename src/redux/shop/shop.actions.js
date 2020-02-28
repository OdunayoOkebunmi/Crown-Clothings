import ShopActionTypes from './shop.types'

export const updateCollection = (collectionMap) => ({
  type: ShopActionTypes.UPDATE_COLLECTIONS,
  payload: collectionMap

})