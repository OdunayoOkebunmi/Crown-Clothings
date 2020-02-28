import React from 'react';
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import CollectionOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component'
import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';
import { updateCollection } from '../../redux/shop/shop.actions';
import WithSpinner from '../../components/with-spinner/with-spinner.component'

const CollectionOverviewWithSpinner = WithSpinner(CollectionOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);
class ShopPage extends React.Component {
  state = {
    loading: true
  }
  unsubscribeFromSnapshot = null;
  componentDidMount () {
    const { updateCollection } = this.props
    const collectionRef = firestore.collection('collections')
    this.unsubscribeFromSnapshot = collectionRef.onSnapshot(async snapshot => {
      const collectionMap = convertCollectionsSnapshotToMap(snapshot)
      updateCollection(collectionMap)
      this.setState({ loading: false })
    })
  }

  render () {
    const { match } = this.props
    const { loading } = this.state;
    return (
      <div className='shop-page'>
        <Route
          exact
          path={ `${match.path}` }
          render={ (props) => (<CollectionOverviewWithSpinner isLoading={ loading }  { ...props } />) }
        />
        <Route
          exact
          path={ `${match.path}/:collectionId` }
          render={ (props) => (<CollectionPageWithSpinner isLoading={ loading }  { ...props } />) }
        />
      </div>
    )
  }
}
const mapDispatchToProps = dispatch => ({
  updateCollection: collectionMap => dispatch(updateCollection(collectionMap))
})
export default connect(null, mapDispatchToProps)(ShopPage);