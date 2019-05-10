import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import SignOut from './SignOut';

const Navbar = props => {

   const navbarLinks = () => {
      if (props.authenticated) {
         return [
            <Link key="foods" to="/foods"><button><i className="fas fa-turkey" /></button></Link>,
            <Link key="door" to={`/door/${props.user.username}`}><button><i className="fas fa-door-closed" /></button></Link>,
            <SignOut key="signout" />
         ];
      }
      return [
         <Link key="signin" to="/signin"><button>Sign In</button></Link>
      ]
   }

   return (
      <Container>
         <Inner className="container">
            <Link to="/"><button><i className="fas fa-home" /></button></Link>
            {navbarLinks()}
         </Inner>
      </Container>
   );
}

function mapStateToProps(state) {
   return {
      authenticated: state.auth.authenticated,
      user: state.user
   }
}

export default connect(mapStateToProps)(Navbar);

const Container = styled.div`
   width: 100%;
   background: ${props => props.theme.navBg};
`;

const Inner = styled.div`
   width: 320px;
   max-width: 80%;
   margin: auto;
   text-align: center;
   display: flex;
   justify-content: center;
   justify-self: end;
   position: relative;
   a {
      text-decoration: none;
   }
   button {
      background: none;
      border: 0;
      color: ${props => props.theme.blue};
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