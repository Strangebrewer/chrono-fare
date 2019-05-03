import React, { Component } from 'react';
import { Field, reduxForm, reset } from 'redux-form';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { newFoodAction } from '../../redux/actions/food_actions';
import { buildHeaders } from '../../utils/utils';

const NewFood = props => {
  const { handleSubmit } = props;

  const submit = values => {
    console.log("Values: ", values);
    props.newFoodAction(values, buildHeaders());
    props.resetForm('newfood')
  }

  return (
    <Form onSubmit={handleSubmit(submit)} name="newfood">
      <h2>Add to Fridge</h2>
      <Field
        name="name"
        component="input"
        type="text"
        placeholder="name"
      />
      <Field
        name="comment"
        component="input"
        type="text"
        placeholder="comment"
      />
      <Field
        name="date"
        component="input"
        type="date"
      />
      <button type="submit">Save</button>
    </Form>
  )
}

function mapStateToProps(state) {
  return {
    foods: state.foods
  }
}

function mapDispatchToProps(dispatch) {
  return {
    newFoodAction: (newFood, headers) => {
      dispatch(newFoodAction(newFood, headers));
    },
    resetForm: (form_name) => {
      dispatch(reset(form_name));
    }
  }
}

const reduxFormNewFood = reduxForm({ form: 'newfood' })(NewFood);

export default connect(mapStateToProps, mapDispatchToProps)(reduxFormNewFood);


const Form = styled.form`
  width: 300px;
  /* border: 1px solid #999; */
  margin: 50px auto;
  padding: 30px 15px;
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