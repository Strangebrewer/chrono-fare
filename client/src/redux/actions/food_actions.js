import * as API from '../../utils/API';
import * as Food from '../action_types/food_types';
import * as Utils from '../action_types/utils_types';

export function getFoodsAction(headers) {
   return async dispatch => {
      try {
         const foods = await API.getFoods(headers);
         dispatch({
            type: Food.SET_FOODS,
            payload: foods.data
         });
      } catch (e) {

      }
   }
}

export function newFoodAction(data, headers) {
   return async dispatch => {
      try {
         const foods = await API.newFood(data, headers);
         dispatch({
            type: Food.SET_FOODS,
            payload: foods.data
         });
         dispatch({ type: Utils.TOGGLE_LOADING });
      } catch (e) {

      }
   }
}