import * as Food from '../action_types/food_types';

export function foodReducer(state = [], action) {
   switch (action.type) {
      case Food.SET_FOODS:
         return [
            ...state,
            ...action.payload
         ];
      case Food.ADD_FOOD:
         return [
            ...state,
            action.payload
         ];
      case Food.EDIT_FOOD:
         return [
            ...state.map(food => food._id === action.payload._id ? action.payload : food)
         ]
      case Food.DELETE_FOOD:
         return [
            ...state.filter(food => food._id !== action.payload)
         ]
      default: return state;
   }
}