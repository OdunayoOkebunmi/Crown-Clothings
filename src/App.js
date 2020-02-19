import React from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.css';
import ShopPage from './pages/shop/shop.component'
import HomePage from './pages/homepage/homepage.component';
import Header from './components/header/header.component';
import SignInSignUp from './pages/sign-in-sign-up/sign-in-sign-up.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      currentUser: null
    }

  }
  unsubscribeFromAuth = null;

  componentDidMount () {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async user => {
      if (user) {
        const userRef = await createUserProfileDocument(user);
        userRef.onSnapshot(snapShot => {
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          })
          console.log(this.state);
        })
      }
      this.setState({ currentUser: user })
    })
  }
  componentWillUnmount () {
    this.unsubscribeFromAuth() //closing the subscription to prevent memory leaks
  }

  render () {
    return (
      <div>
        <Header currentUser={ this.state.currentUser } />
        <Switch>
          <Route exact path='/' component={ HomePage } />
          <Route path='/shop' component={ ShopPage } />
          <Route path='/signin' component={ SignInSignUp } />
        </Switch>
      </div>
    );
  }

}

export default App;