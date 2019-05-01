import React, { Component } from 'react';
import { connect } from 'react-redux';

const Foods = props => {
  return (
    <div>
      <h1 style={{ color: 'white' }}>You can't see me!</h1>
    </div>
  );
}

function mapStateToProps(state) {
  return {

  };
}

export default connect(mapStateToProps)(Foods);