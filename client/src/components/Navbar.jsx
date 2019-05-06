import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import SignOut from './SignOut';

class Navbar extends Component {
   navbarLinks() {
      if (this.props.authenticated) {
         return [
            <Link key="foods" to="/foods"><button><i className="fas fa-turkey" /></button></Link>,
            <SignOut key="signout" />
         ];
      }
      return [
         <Link key="signin" to="/signin"><button>Sign In</button></Link>
      ]
   }

   render() {
      return (
         <Container>
            <Inner className="container">
               <Link to="/"><button><i className="fas fa-home" /></button></Link>
               {this.navbarLinks()}
            </Inner>
         </Container>
      );
   }
}

function mapStateToProps(state) {
   return { authenticated: state.auth.authenticated }
}

export default connect(mapStateToProps)(Navbar);

const Container = styled.div`
   width: 100%;
   background: #ffffff22;
`;

const Inner = styled.div`
   width: 320px;
   max-width: 80%;
   margin: auto;
   /* font-size: 40px; */
   text-align: center;
   display: flex;
   /* justify-content: flex-end; */
   justify-content: center;
   justify-self: end;
   position: relative;
   /* padding-left: 15px; */
   a {
      text-decoration: none;
   }
   button {
      background: none;
      border: 0;
      color: #26a3ec;
      cursor: pointer;
      height: 40px;
      min-width: 75px;
      display: flex;
      justify-content: center;
      outline: transparent;
      position: relative;
      font-size: 18px;
      &:hover {
         color: #fff;
         transition: color .15s ease-in-out;
      }
   }
`;