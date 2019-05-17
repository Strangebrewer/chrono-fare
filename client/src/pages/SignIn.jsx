import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import styled from "styled-components";
import { loginAction } from '../redux/actions/user_actions';

const SignIn = props => {
   
   console.log("Signin props: ", props)

   const submit = values => {
      props.loginAction(values, props.history);
      props.clearFields();
   }

   const errorMessage = () => {
      if (props.errorMessage) {
         return (
            <span>
               {props.errorMessage}
            </span>
         )
      }
   }

   const { handleSubmit } = props;
   return (
      <Container>
         <Form onSubmit={handleSubmit(submit)}>
            <h2>Sign In</h2>
            <Field
               name="username"
               component="input"
               type="text"
               placeholder="username"
            />
            <Field
               name="password"
               component="input"
               type="password"
               placeholder="password"
            />
            <button type="submit">Sign In</button>
            {errorMessage() && <p style={{ color: 'red' }}>( {errorMessage()} )</p>}
         </Form>
      </Container>
   );
}

function mapStateToProps(state) {
   return {
      will_robinson: state.will_robinson,
      errorMessage: state.auth.error
   }
}

const reduxFormSignIn = reduxForm({ form: 'signin' })(SignIn);

export default connect(mapStateToProps, { loginAction })(reduxFormSignIn);

const Container = styled.div`
  width: 300px;
  margin: 50px auto;
  text-align: center;
  h2 {
    font-size: 25px;
    padding-bottom: 20px;
  }
  a {
    font-size: 16px;
  }
`;

const Form = styled.form`
  width: 300px;
  /* border: 1px solid #999; */
  border-radius: 4px;
  margin: 100px auto;
  padding: 20px;
  input {
    width: 100%;
    margin: 10px 0;
    padding: 3px 6px;
  }
  button {
    display: block;
    margin: 15px auto 15px auto;
  }
`;