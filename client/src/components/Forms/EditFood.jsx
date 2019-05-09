import React from 'react';
import { Field, reduxForm, reset } from 'redux-form';
import { connect } from 'react-redux';
import styled from 'styled-components';
import store from '../../store';
import * as Utils from '../../redux/action_types/utils_types';
import { editFoodAction } from '../../redux/actions/food_actions';
import { buildHeaders } from '../../utils/utils';

const EditFood = props => {
   const { handleSubmit } = props;

   const submit = data => {
      store.dispatch({ type: Utils.TOGGLE_LOADING });
      props.editFood(props.food_id, data, buildHeaders());
      props.resetForm('newfood');
      props.closeModal();
   }

   return (
      <Form onSubmit={handleSubmit(submit)} name="editFood">
         <h3>Edit Food</h3>
         <Field
            name="name"
            component="input"
            type="text"
            placeholder="Food Name"
         />
         <Field
            name="description"
            component="input"
            type="text"
            placeholder="Food Description"
         />
         <Field
            name="date"
            component="input"
            type="date"
         />
         <Buttons>
            <button type="submit">Save</button>
            <button onClick={(event) => {
               event.preventDefault();
               props.closeModal();
               props.toggleButtons();
            }}>Nevermind</button>
         </Buttons>
      </Form>
   )
}

function mapStateToProps(state) {
   return {}
}

function mapDispatchToProps(dispatch) {
   return {
      editFood: (id, data, headers) => {
         dispatch(editFoodAction(id, data, headers));
      },
      resetForm: (form_name) => {
         dispatch(reset(form_name));
      }
   }
}

const reduxFormEditFood = reduxForm({ form: 'editFood' })(EditFood);

export default connect(mapStateToProps, mapDispatchToProps)(reduxFormEditFood);

const Form = styled.form`
   h3 {
      font-size: 22px;
      font-weight: bold;
      margin-bottom: 10px;
      color: #fff;
      text-align: center;
   }
   input {
      width: 100%;
      margin: 10px 0;
      border: none;
      padding: 5px;
   }
`;

const Buttons = styled.div`
   text-align: center;
   width: 100%;
   button {
      background-color: #1d928c;
      border: none;
      border-radius: 5px;
      color: #fff;
      display: ${props => props.center ? 'block' : 'inline'};
      font-size: ${props => props.full && '1.8rem'};
      height: ${props => props.full && '40px'};
      margin: 15px 15px 0 0;
      outline: transparent;
      padding: 8px 12px;
      text-shadow: 0 0 5px #000;
      transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
      width: ${props => props.full && '100%'};
   }
   button:hover {
      background-color: #26d4cc;
   }
   button:last-child {
      margin: 15px 0 0 0;
   }
`;