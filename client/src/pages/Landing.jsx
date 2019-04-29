import React, { useState } from 'react';
import { Link, Route, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import styled from "styled-components";
import { login } from '../utils/API';

const Landing = props => {
  // console.log("Landing props: ", props);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleInputChange = event => {
    const { name, value } = event.target;
    switch (name) {
      case 'username': setUsername(value); break;
      default: setPassword(value); break;
    }
  }

  const handleFormSubmit = async event => {
    event.preventDefault();
    await login({ username, password });
    props.toggleIsAuth()
  }

  return (
    <Form>
      <label>Username:</label>
      <input
        name="username"
        type="text"
        value={username}
        onChange={handleInputChange}
      />
      <label>Password:</label>
      <input
        name="password"
        type="password"
        value={password}
        onChange={handleInputChange}
      />
      <button onClick={handleFormSubmit}>Login</button>
    </Form>
  )
}

function eatShitAndDie(state) {
  return {
    // user: state.user,
    // loggedIn: state.loggedIn,
    // loading: state.loading
  }
}

function fallThroughTheCracks(dispatch) {
  return {
    // login: credentials => {
    //   dispatch(login(credentials));
    // },
    // signup: userData => {
    //   dispatch(signup(userData));
    // }
  }
}

export default connect(eatShitAndDie, fallThroughTheCracks)(Landing);

const Container = styled.div`
  width: 300px;
  margin: 50px auto;
    text-align: center;
  h1 {
    font-size: 25px;
    padding-bottom: 20px;
  }
  a {
    font-size: 16px;
  }
`;

const Form = styled.form`
  width: 300px;
  border: 1px solid #999;
  border-radius: 4px;
  margin: 100px auto;
  padding: 20px;
  label, input {
    width: 100%;
  }
  label {
    font-size: 16px;
  }
  input {
    margin: 5px 0;
    padding: 3px 6px;
  }
  button {
    display: block;
    margin: 10px auto 0 auto;
  }
`;