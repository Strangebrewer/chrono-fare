import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import NewFoodForm from '../components/Forms/NewFood';
import { getFoodsAction } from '../redux/actions/food_actions';
import { buildHeaders } from '../utils/utils';

const Foods = props => {
  useEffect(() => {
    props.getFoodsAction(buildHeaders())
  }, [])

  console.log("Foods props: ", props);
  return (
    <>
      <Navbar />
      <Container>
        <h1>You can't see me!</h1>
        {props.foods.map((food, index) => (
          <div key={index}>
            <h1>{food.name}</h1>
            <p>{food.description}</p>
            <p>{food.date}</p>
          </div>
        ))}
        <NewFoodForm />
      </Container>
    </>
  );
}

function mapStateToProps(state) {
  return {
    user: state.user,
    foods: state.foods
  };
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
  width: 800px;
  margin: auto;
`;