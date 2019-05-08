import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import dateFns from 'date-fns';
import styled from 'styled-components';
import { GridLoader } from 'react-spinners';
import Navbar from '../components/Navbar';
import Modal from '../components/ModalLogic';
import NewFoodForm from '../components/Forms/NewFood';
import FoodItem from '../components/FoodItem';
import { getFoodsAction } from '../redux/actions/food_actions';
import { buildHeaders } from '../utils/utils';

const Foods = React.memo(props => {

   const [showing, setShowing] = useState('');
   const [wait, setWait] = useState(false)

   useEffect(() => {
      props.getFoodsAction(buildHeaders());
   }, []);

   const toggleButtons = id => {
      if (id === showing) {
         return (
            setShowing('')
         )
      }
      if (showing !== '') setWait(true);
      else setWait(false);
      setShowing(id);
   }

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
                        // move this logic to the Food model 
                        // to figure it out here and pass it down will make it confusing 
                        const difference = dateFns.differenceInCalendarDays(new Date(), food.createdAt);
                        const age = difference === 0 ? `new` : `${difference} days old`;
                        food.age = age;
                        let show = false;
                        if (showing === food._id) show = showing;
                        return (
                           <FoodItem
                              key={index}
                              food={food}
                              show={show}
                              toggleButtons={toggleButtons}
                              wait={wait}
                           />
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

const PlusSignIcon = styled.span`
   color: #0baa82;
   cursor: pointer;
   font-size: 35px;
   position: absolute;
   bottom: 40px;
   right: 20px;
`;