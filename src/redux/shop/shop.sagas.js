import { takeLatest, call, put, all } from 'redux-saga/effects';
import ShopActionTypes from './shop.types'
import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';
import { fetchCollectionFailure, fetchCollectionSuccess } from './shop.actions';
export function* fetchCollectionsStartAsync () {
  try {
    const collectionRef = firestore.collection('collections')
    const snapshot = yield collectionRef.get();
    const collectionMap = yield call(convertCollectionsSnapshotToMap, snapshot);
    yield put(fetchCollectionSuccess(collectionMap))
  } catch (error) {
    yield put(fetchCollectionFailure(error.message))
  }
}

export function* fetchCollectionsStart () {
  yield takeLatest(
    ShopActionTypes.FETCH_COLLECTIONS_START,
    fetchCollectionsStartAsync
  )
}

export function* shopSagas () {
  yield all([call(fetchCollectionsStart)])
}
