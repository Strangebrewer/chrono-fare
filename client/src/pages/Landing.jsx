import React, { useState } from 'react';
import { Link, Route, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import styled from "styled-components";
import { loginAction } from '../redux/actions/user_actions';
import Navbar from '../components/Navbar';

const Landing = props => {
   console.log("Landing props: ", props);

   return (
      <Container>
         <Navbar />
         <h1>Hi! Welcome to my fucking page!</h1>
      </Container>
   )
}

function mapStateToProps(state) {
   return {
      user: state.user,
      // loggedIn: state.loggedIn,
      // loading: state.loading
   }
}

function mapDispatchToProps(dispatch) {
   return {
      // loginAction: (credentials, history) => {
      //   dispatch(loginAction(credentials, history));
      // },
      // signup: userData => {
      //   dispatch(signup(userData));
      // }
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(Landing);

const Container = styled.div`
   width: 100%;
   height: 100vh;
   text-align: center;
   h1 {
      font-size: 25px;
      padding-bottom: 20px;
   }
   a {
      font-size: 16px;
   }
`;