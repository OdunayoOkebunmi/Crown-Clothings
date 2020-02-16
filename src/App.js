import React from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.css';
import ShopPage from './pages/shop/shop.component'
import HomePage from './pages/homepage/homepage.component';
import Header from './components/header/header.component';
import SignInSignUp from './pages/sign-in-sign-up/sign-in-sign-up.component';
function App () {
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

export default App;