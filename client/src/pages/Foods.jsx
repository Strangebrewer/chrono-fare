import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import dateFns from 'date-fns';
import styled from 'styled-components';
import { GridLoader } from 'react-spinners';
import Navbar from '../components/Navbar';
import Modal from '../components/ModalLogic';
import NewFoodForm from '../components/Forms/NewFood';
import { getFoodsAction } from '../redux/actions/food_actions';
import { buildHeaders } from '../utils/utils';

const Foods = React.memo(props => {

   useEffect(() => {
      props.getFoodsAction(buildHeaders());
   }, [])

   const newFoodModal = modal => {
      modal.setModal({
         body: < NewFoodForm closeModal={modal.closeModal} />
      });
   }

   console.log("Foods props: ", props);

   return (
      <>
         <Navbar />
         <Container>
            {props.loading
               ? (
                  <GridLoader
                     color={'#587af3'}
                     loading={props.loading}
                     size={15}
                  />
               ) : (
                  <>
                     {props.foods.map((food, index) => {
                        const difference = dateFns.differenceInCalendarDays(new Date(), food.createdAt);
                        const age = difference === 0 ? `new` : `${difference} days old`;                        
                        return (
                           <FoodItem key={index}>
                              <h1>{food.name}</h1>
                              <p>{food.description}</p>
                              <p>{age}</p>
                           </FoodItem>
                        )
                     })}

                     <Modal>
                        {modalProps => (
                           <PlusSignIcon>
                              <i className="fas fa-plus-circle" onClick={() => newFoodModal(modalProps)} />
                           </PlusSignIcon>
                        )}
                     </Modal>
                  </>
               )
            }

         </Container>

      </>
   );
});

function mapStateToProps(state) {
   return {
      user: state.user,
      foods: state.foods,
      loading: state.loading
   }
}

function mapDispatchToProps(dispatch) {
   return {
      getFoodsAction: headers => {
         dispatch(getFoodsAction(headers));
      }
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(Foods);

const Container = styled.div`
   /* width: 320px; */
   height: calc(100vh - 40px);
   margin: auto;
   position: relative;
   background-color: black;
`;

const FoodItem = styled.div`
   width: 100%;
   padding: 5px 15px;
   margin: 20px 0;
   position: relative;
   color: white;
   h1 {
      font-size: 1.6rem;
      font-weight: bold;
   }
   p:first-of-type {
      /* text-indent: 20px; */
      font-size: 1.2rem;
      margin: 3px 0 5px 0;
   }
   p:last-of-type {
      position: absolute;
      right: 15px;
      top: 15px;
      font-size: 1.3rem;
   }
`;

const PlusSignIcon = styled.span`
   color: #0baa82;
   cursor: pointer;
   font-size: 35px;
   position: absolute;
   bottom: 40px;
   right: 20px;
`;