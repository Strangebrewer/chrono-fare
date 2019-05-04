import React, { PureComponent } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from 'react-redux';
import store from './store';
import requireAuth from './components/Authentication';
import requireNotAuth from './components/NotAuthentication';
import Landing from './pages/Landing'
import SignIn from './pages/SignIn';
import Foods from './pages/Foods';
import Design from './pages/Design';
import { buildHeaders } from './utils/utils';
import addProps from './utils/AddPropsToRoute'
import { getCurrentUser } from './redux/actions/user_actions';
import { AUTHENTICATED } from './redux/action_types/user_types';
import { TOGGLE_LOADING } from './redux/action_types/utils_types';

const token = localStorage.getItem('token');

if (token) {
   store.dispatch({ type: AUTHENTICATED });
}

class App extends PureComponent {

   componentDidMount() {
      if (localStorage.getItem('token')) {
         this.props.getCurrentUser(buildHeaders());
      } else {
         store.dispatch({ type: TOGGLE_LOADING });
      }
   }

   render() {
      console.log("App props: ", this.props)
      return (
         <Router>
            <Switch>

               <Route exact path="/" component={Design} />


               {/* <Route exact path='/'
                  component={addProps(Landing, {
                     shit: 'shit',
                     fuck: 'fuck',
                     silly: true,
                     funny: { subjective: true, stillValid: true, funny: 'yes' },
                     etc: 'many props can go here'
                  })}
               /> */}

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
      user: state.user,
      loading: state.loading
   }
}

function mapDispatchToProps(dispatch) {
   return {
      getCurrentUser: headers => {
         dispatch(getCurrentUser(headers));
      }
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);