import React from 'react';
import { connect } from 'react-redux';
import { signoutAction } from '../redux/actions/user_actions';

const SignOut = props => {
  return (
    <button style={props.style} onClick={props.signOut}><i className="fas fa-sign-out" /></button>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    signOut: () => {
      dispatch(signoutAction());
    }
  }
}

export default connect(null, mapDispatchToProps)(SignOut);
