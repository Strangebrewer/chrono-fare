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
         // console.log("getFoodsAction error: ", e);
      }
   }
}

export function newFoodAction(data, headers) {
   return async dispatch => {
      try {
         const food = await API.newFood(data, headers);
         dispatch({
            type: Food.ADD_FOOD,
            payload: food.data
         });
         dispatch({ type: Utils.TOGGLE_LOADING });
      } catch (e) {

      }
   }
}

export function editFoodAction(id, data, headers) {
   return async dispatch => {
      try {
         const food = await API.editFood(id, data, headers);
         dispatch({
            type: Food.EDIT_FOOD,
            payload: food.data
         });
         dispatch({ type: Utils.TOGGLE_LOADING });
      } catch (e) {

      }
   }
}

export function deleteFoodAction(id, headers) {
   return async dispatch => {
      try {
         await API.deleteFood(id, headers);
         dispatch({
            type: Food.DELETE_FOOD,
            payload: id
         });
      } catch (e) {

      }
   }
}