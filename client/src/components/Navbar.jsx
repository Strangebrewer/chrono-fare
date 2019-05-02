import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import SignOut from './SignOut';

const style = {
  backgroundColor: '#554fa7',
  border: '1px solid red',
  color: 'white'
}

class Navbar extends Component {
  navbarLinks() {
    if (this.props.authenticated) {
      return [
        <li key="foods"><Link to="/foods">Foods</Link></li>,
        <li key="signout"><SignOut style={style} /></li>
      ];
    }
    return [
      <li key="signin"><Link to="/signin">Sign In</Link></li>
    ]
  }

  render() {
    return (
      <nav className="navbar">
        <div className="container">
          <Link to="/"><span className="brand">Hombre</span></Link>
          <ul>
            {this.navbarLinks()}
          </ul>
        </div>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated }
}

export default connect(mapStateToProps)(Navbar);