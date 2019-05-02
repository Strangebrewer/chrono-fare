import React, { Component } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import { connect } from 'react-redux';
import store from './store';
import requireAuth from './components/Authentication';
import requireNotAuth from './components/NotAuthentication';
import Landing from './pages/Landing'
import SignIn from './components/SignIn'
import Foods from './pages/Foods';
import * as API from './utils/API';
import { buildHeaders } from './utils/utils';
import addProps from './utils/AddPropsToRoute'
import { AUTHENTICATED } from './redux/action_types/user_types';

const token = localStorage.getItem('token');

if (token) {
  store.dispatch({ type: AUTHENTICATED });
}

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path='/'
            component={addProps(Landing, {
              shit: 'shit',
              fuck: 'fuck',
              silly: true,
              funny: { subjective: true, stillValid: true, funny: 'yes' },
              etc: 'many props can go here'
            })}
          />

          <Route path="/signin" component={requireNotAuth(SignIn)} />

          {/* <Route path="/signup" component={requireNotAuth(Signup)} /> */}

          <Route path="/foods" component={requireAuth(Foods)} />
          
        </Switch>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(App);