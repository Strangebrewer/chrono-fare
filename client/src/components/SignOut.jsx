import React, { Component } from 'react';
import { connect } from 'redux';
import { signOutAction } from '../redux/actions/user_actions';

class SignOut extends Component {

  signOut = () => {
    this.props.signOut();
  }

  render() {
    return (
      <button onClick={this.signOut}>Sign Out</button>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    signOut: () => {
      dispatch(signOutAction());
    }
  }

}

export default connect(mapDispatchToProps)(SignOut);