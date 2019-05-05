import * as Food from '../action_types/food_types';

export function foodReducer(state = [], action) {
   switch (action.type) {
      case Food.SET_FOODS:
         return [
            ...action.payload
         ]
      default: return state;
   }
}