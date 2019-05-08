import React, { useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Modal from './ModalLogic';
import { deleteFoodAction } from '../redux/actions/food_actions';
import { buildHeaders } from '../utils/utils';

const FoodItem = React.memo(props => {

   const editModal = modal => {
      const { setModal, closeModal } = modal;
      setModal({
         body: <form>(form for editing the food goes here)</form>
      });
   }

   const deleteModal = modal => {
      // create an action, the API function, the route,
      //  the controller function, and the model method(s)
      const { setModal, closeModal } = modal;
      setModal({
         body: <p>Are you sure you want to delete {props.food.name}?</p>,
         buttons: (
            <>
               <button onClick={() => deleteFood(closeModal)}>Yes, Delete It</button>
               <button onClick={closeModal}>No, Keep It</button>
            </>
         )
      });
   }

   const deleteFood = closeModal => {
      props.deleteFood(props.food._id, buildHeaders());
      closeModal();
      props.toggleButtons();
   }

   const { _id, age, description, name } = props.food

   return (
      <Modal>
         {modalProps => (
            <Container isDisplayed={props.show}>
               <h1>{name}</h1>
               <p>{description}</p>
               <p>{age}</p>
               <span><i onClick={() => props.toggleButtons(_id)} className="fal fa-ellipsis-h" /></span>
               <BtnDiv isDisplayed={props.show} wait={props.wait}>
                  <button onClick={() => editModal(modalProps)}>EDIT</button>
                  <button onClick={() => deleteModal(modalProps)}>DELETE</button>
               </BtnDiv>
            </Container>
         )}
      </Modal>
   )
});

function mapStateToProps(state) {
   return {}
}

function mapDispatchToProps(dispatch) {
   return {
      deleteFood: (id, headers) => {
         dispatch(deleteFoodAction(id, headers));
      }
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(FoodItem);

const BtnDiv = styled.div`
   opacity: ${props => props.isDisplayed ? '1' : '0'};
   transform: ${props => props.isDisplayed ? 'translateX(-75px)' : 'translateX(250px)'};
   transition: ${props => props.isDisplayed
      ? props => props.wait
         ? 'opacity .15s ease-in-out 0.2s, transform .15s ease-in-out 0.2s'
         : 'opacity .2s ease-in-out, transform .15s ease-in-out'
      : 'opacity .1s ease-in-out, transform .15s ease-in-out, visibility .4s ease-in-out'}; 
   position: absolute;
   bottom: 10px;
   right: 15px;
   z-index: ${props => props.isDisplayed ? '3' : '1'};
   visibility: ${props => props.isDisplayed ? 'visible' : 'hidden'};
   button {
      border: none;
      border-radius: 5px;
      outline: transparent;
      padding: 8px 16px;
      color: white;
      width: 100px;
   }
   button:first-of-type {
      background-color: #54f36e;
      margin-right: 10px;
   }
   button:last-of-type {
      background-color: #bb1717;
   }
`;

const Container = styled.div`
   width: 100%;
   padding: 5px 15px;
   margin: 20px 0;
   position: relative;
   color: white;
   z-index: 2;
   h1 {
      font-size: 1.6rem;
      font-weight: bold;
   }
   p:first-of-type {
      font-size: 1.2rem;
      margin: 5px 0 5px 0;
   }
   p:last-of-type {
      position: absolute;
      right: 5px;
      top: 5px;
      font-size: 1.3rem;
   }
   span {
      color: ${props => props.isDisplayed ? '#666' : '#fff'};
      position: absolute;
      bottom: 1px;
      right: 5px;
      font-size: 3.5rem;
      z-index: 9;
      transition: color 0.2s ease-in-out;
   }
`;