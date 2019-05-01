import React, { Component } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import { connect } from 'react-redux';
import store from './store';
import requireAuth from './components/Authentication';
import requireNotAuth from './components/NotAuthentication';
import Landing from './pages/Landing';
import SignIn from './components/Signin'
import Foods from './pages/Foods';
import * as API from './utils/API';
import { buildHeaders } from './utils/utils';

import addProps from './utils/AddPropsToRoute'

import { AUTHENTICATED } from './redux/actions/user_actions';

const user = localStorage.getItem('token');

if (user) {
  store.dispatch({ type: AUTHENTICATED });
}

let is_authenticated = false;

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path='/' component={
            requireNotAuth(addProps(SignIn, {
              shit: 'shit',
              fuck: 'fuck'
            }))}
          />

          {/* <Route path="/signin" component={requireNotAuth(Signin)} /> */}

          {/* <Route path="/signup" component={requireNotAuth(Signup)} /> */}

          {/* <Route path="/signout" component={requireAuth(SignOut)} /> */}

          <Route path="/foods" component={requireAuth(Foods)} />

          {/* <Route exact path='/foods'>
            {routeProps => (
              is_authenticated
                ? (
                  <Foods
                    {...routeProps}
                    user={this.state.user}
                    loading={this.state.loading}
                  />
                ) : <Redirect to='/' />
            )}
          </Route> */}
        </Switch>
      </Router>
    );
  }
}

export default App;