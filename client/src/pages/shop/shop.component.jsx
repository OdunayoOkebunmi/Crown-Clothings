import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import { fetchCollectionsStart } from '../../redux/shop/shop.actions';
import CollectionsOverviewContainer from '../../components/collections-overview/collections-overview.container';
import CollectionsPageContainer from '../collection/collection.container';

const ShopPage = ({ match, fetchCollectionsStart }) => {
  useEffect(() => {
    fetchCollectionsStart()
  }, [fetchCollectionsStart])

  return (
    <div className='shop-page'>
      <Route
        exact
        path={ `${match.path}` }
        component={ CollectionsOverviewContainer }
      />
      <Route
        exact
        path={ `${match.path}/:collectionId` }
        component={ CollectionsPageContainer }
      />
    </div>
  )
}
const mapDispatchToProps = dispatch => ({
  fetchCollectionsStart: () => dispatch(fetchCollectionsStart())
})
export default connect(null, mapDispatchToProps)(ShopPage);