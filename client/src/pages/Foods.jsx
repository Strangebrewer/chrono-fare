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
                        // move all of this logic to the Food model
                        const just_the_time = dateFns.format(food.createdAt, 'hh:mm a');
                        const formatted_date = dateFns.format(food.createdAt, 'MMM Do, YYYY - hh:mm a')
                        const difference = dateFns.differenceInCalendarDays(new Date(), food.createdAt);
                        const age = difference === 0 ? `from today at ${just_the_time}` : `${difference} days old`;
                        
                        return (
                           <FoodItem key={index}>
                              <h1>{food.name}</h1>
                              <p>{food.description}</p>
                              <p>{formatted_date}</p>
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
   width: 320px;
   height: calc(100vh - 40px);
   margin: auto;
   position: relative;
   padding: 15px;
`;

const FoodItem = styled.div`
   width: 100%;
   padding: 5px 10px;
   h1 {
      font-size: 2rem;
   }
   p:first-of-type {
      text-indent: 20px;
      font-size: 1.2rem;
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