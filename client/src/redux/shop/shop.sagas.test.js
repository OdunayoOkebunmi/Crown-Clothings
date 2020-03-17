import { takeLatest, call, put } from 'redux-saga/effects';

import {
  firestore,
  convertCollectionsSnapshotToMap
} from '../../firebase/firebase.utils';

import {
  fetchCollectionSuccess,
  fetchCollectionFailure
} from './shop.actions';

import ShopActionTypes from './shop.types';

import { fetchCollectionsStartAsync, fetchCollectionsStart } from './shop.sagas';

describe('fetch collections start saga', () => {
  it('should trigger on FETCH_COLLECTIONS_START', () => {
    const generator = fetchCollectionsStart();
    expect(generator.next().value).toEqual(
      takeLatest(ShopActionTypes.FETCH_COLLECTIONS_START, fetchCollectionsStartAsync)
    );
  });
});

describe('fetch collections async saga', () => {
  const generator = fetchCollectionsStartAsync();

  it('should call firestore collection ', () => {
    const getCollection = jest.spyOn(firestore, 'collection');
    generator.next();
    expect(getCollection).toHaveBeenCalled();
  });

  it('should call convertCollectionsSnapshot saga ', () => {
    const mockSnapshot = {};
    expect(generator.next(mockSnapshot).value).toEqual(
      call(convertCollectionsSnapshotToMap, mockSnapshot)
    );
  });

  it('should fire fetchCollectionSuccess if collectionsMap is succesful', () => {
    const mockCollectionsMap = {
      hats: { id: 1 }
    };

    expect(generator.next(mockCollectionsMap).value).toEqual(
      put(fetchCollectionSuccess(mockCollectionsMap))
    );
  });

  it('should fire fetchCollectionFailure if get collection fails at any point', () => {
    const newGenerator = fetchCollectionsStartAsync();
    newGenerator.next();
    expect(newGenerator.throw({ message: 'error' }).value).toEqual(
      put(fetchCollectionFailure('error'))
    );
  });
});
