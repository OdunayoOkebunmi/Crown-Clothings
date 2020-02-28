import { createSelector } from 'reselect';

const selectShop = state => state.shop;

export const selectShopItems = createSelector(
  [selectShop],
  shop => shop.collections
)
export const selectCollection = collectionURLParam => createSelector(
  [selectShopItems],
  collections => collections ? collections[collectionURLParam] : null
)
export const selectCollectionForPreview = createSelector(
  [selectShopItems],
  collections => collections ? Object.keys(collections).map(
    key => collections[key]
  ) : []
)