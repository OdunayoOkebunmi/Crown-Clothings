import ShopActionTypes from './shop.types';
import {
  fetchCollectionsStart,
  fetchCollectionSuccess,
  fetchCollectionFailure,
  fetchCollectionsStartAsync
} from './shop.actions';

describe('fetchCollectionsStart action', () => {
  it('should create the fetchCollectionsStart action', () => {
    expect(fetchCollectionsStart().type).toEqual(
      ShopActionTypes.FETCH_COLLECTIONS_START
    );
  });
});

describe('fetchCollectionSuccess action', () => {
  it('should create the fetchCollectionSuccess action', () => {
    const mockCollectionsMap = {
      hats: {
        id: 1
      }
    };

    const action = fetchCollectionSuccess(mockCollectionsMap);

    expect(action.type).toEqual(ShopActionTypes.FETCH_COLLECTIONS_SUCCESS);
    expect(action.payload).toEqual(mockCollectionsMap);
  });
});

describe('fetchCollectionFailure action', () => {
  it('should create the fetchCollectionFailure action', () => {
    const action = fetchCollectionFailure('errored');

    expect(action.type).toEqual(ShopActionTypes.FETCH_COLLECTIONS_FAILURE);
    expect(action.payload).toEqual('errored');
  });
});

describe('fetchCollectionsStartAsync action', () => {
  it('should create the fetchCollectionsStartAsync action', () => {
    const mockActionCreator = fetchCollectionsStartAsync();
    const mockDispatch = jest.fn();
    mockActionCreator(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledWith(fetchCollectionsStart());
  });
});
