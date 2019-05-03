import * as API from '../../utils/API';

export function getFoodsAction(headers) {
  return async dispatch => {
    try {
      const foods = await API.getFoods(headers);
      dispatch({
        type: 'SET_FOODS',
        payload: foods.data
      })
    } catch (e) {

    }
  }
}

export function newFoodAction(data, headers) {
  return async dispatch => {
    try {
      const foods = await API.newFood(data, headers);
      dispatch({
        type: 'SET_FOODS',
        payload: foods.data
      })
    } catch (e) {

    }
  }
}