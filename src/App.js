import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux'
import './App.css';
import ShopPage from './pages/shop/shop.component'
import HomePage from './pages/homepage/homepage.component';
import Header from './components/header/header.component';
import SignInSignUp from './pages/sign-in-sign-up/sign-in-sign-up.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils'
import { setCurrentUser } from './redux/user/user.action'
class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount () {
    const { setCurrentUser } = this.props
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async user => {
      if (user) {
        const userRef = await createUserProfileDocument(user);
        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          })
        })
      }
      setCurrentUser(user)
    })
  }
  componentWillUnmount () {
    this.unsubscribeFromAuth() //closing the subscription to prevent memory leaks
  }

  render () {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={ HomePage } />
          <Route path='/shop' component={ ShopPage } />
          <Route path='/signin' component={ SignInSignUp } />
        </Switch>
      </div>
    );
  }

}
const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})
export default connect(null, mapDispatchToProps)(App);