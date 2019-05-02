import React, { Component } from 'react';
import { connect } from 'react-redux';
import SignOut from '../components/SignOut';
import Navbar from '../components/Navbar';

const Foods = props => {
  console.log("Foods props: ", props);
  return (
    <>
      <Navbar />
      <h1>You can't see me!</h1>
    </>
  );
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps)(Foods);