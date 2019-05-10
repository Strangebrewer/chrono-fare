import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import dateFns from 'date-fns';
import styled from 'styled-components';
import { CircleLoader } from 'react-spinners';
import Navbar from '../components/Navbar';
import Modal from '../components/ModalLogic';
import NewFoodForm from '../components/Forms/NewFood';
import FoodItem from '../components/FoodItem';
import { getFoodsAction } from '../redux/actions/food_actions';
import { buildHeaders } from '../utils/utils';

const Foods = props => {

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
         <Container>
            <Navbar />
            {props.loading
               ? (
                  <LoadingContainer>
                     <CircleLoader
                        color={'#587af3'}
                        loading={props.loading}
                        size={100}
                     />
                  </LoadingContainer>

               ) : (
                  <>
                     {props.foods.map((food, index) => {
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
                           < PlusSignIcon >
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
};

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
   width: 100%;
   height: 100vh;
   margin: auto;
   position: relative;
   background-color: transparent;
`;

const LoadingContainer = styled.div`
   display: flex;
   justify-content: center;
   align-items: center;
   min-height: 50vh;
`;

const PlusSignIcon = styled.span`
   color: ${props => props.theme.green};
   cursor: pointer;
   font-size: 35px;
   position: absolute;
   bottom: 50px;
   right: 30px;
`;