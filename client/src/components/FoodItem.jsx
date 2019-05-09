import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Modal from './ModalLogic';
import EditFood from './Forms/EditFood';
import { deleteFoodAction, editFoodAction } from '../redux/actions/food_actions';
import { buildHeaders } from '../utils/utils';

const FoodItem = props => {

   const editModal = modal => {
      const { setModal, closeModal } = modal;
      setModal({
         body: (
            <EditFood
               food_id={props.food._id}
               closeModal={closeModal}
               toggleButtons={props.toggleButtons}
            />
         )
      });
   }

   const deleteModal = modal => {
      const { setModal, closeModal } = modal;
      setModal({
         body: <p>Are you sure you want to delete {props.food.name}?</p>,
         buttons: (
            <>
               <button onClick={() => deleteFood(closeModal)}>Yes, Delete It</button>
               <button onClick={() => {
                  closeModal();
                  props.toggleButtons();
               }}>No, Keep It</button>
            </>
         )
      });
   }

   const deleteFood = closeModal => {
      props.deleteFood(props.food._id, buildHeaders());
      closeModal();
      props.toggleButtons();
   }

   const { _id, age, description, name } = props.food;

   return (
      <Modal>
         {modalProps => (
            <Container isDisplayed={props.show} wait={props.wait}>
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
};

function mapStateToProps(state) {
   return {}
}

function mapDispatchToProps(dispatch) {
   return {
      deleteFood: (id, headers) => {
         dispatch(deleteFoodAction(id, headers));
      },
      editFood: (id, data, headers) => {
         dispatch(editFoodAction(id, data, headers));
      }
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(FoodItem);

const BtnDiv = styled.div`
   opacity: ${props => props.isDisplayed ? '1' : '0'};
   transform: ${props => props.isDisplayed ? 'translateX(0)' : 'translateX(250px)'};
   transition: ${props => props.isDisplayed && props.wait
      ? 'opacity .15s ease-in-out 0.2s, transform .15s ease-in-out 0.2s'
      : 'opacity .2s ease-in-out, transform .15s ease-in-out'}; 
   position: absolute;
   text-align: center;
   bottom: 10px;
   right: 0;
   left: 0;
   z-index: ${props => props.isDisplayed ? '3' : '1'};
   button {
      border: none;
      border-radius: 5px;
      outline: transparent;
      padding: 8px 16px;
      font-size: 12px;
      color: white;
      width: 75px;
      box-shadow: 4px 4px 6px #000;
   }
   button:first-of-type {
      background-color: #2eb344;
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
   color: ${props => props.isDisplayed ? '#9c9c9c' : '#ededed'};
   background-color: ${props => props.isDisplayed ? '#333' : 'transparent'};
   transition: ${props => props.isDisplayed && props.wait
      ? 'color 0.15s ease-in-out 0.2s, background-color 0.15s ease-in-out 0.2s'
      : 'color 0.15s ease-in-out, background-color 0.15s ease-in-out'}; 
   z-index: 2;
   overflow: hidden;
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
      right: 15px;
      top: 5px;
      font-size: 1.3rem;
   }
   span {
      color: #fff;
      position: absolute;
      bottom: 1px;
      right: 15px;
      font-size: 3.5rem;
      z-index: 9;
      transition: color 0.2s ease-in-out;
   }
`;