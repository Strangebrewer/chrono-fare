import * as Utils from '../action_types/utils_types';

export function loadingReducer(state = {}, action) {
   switch (action.type) {
      case Utils.TOGGLE_LOADING:
         return !state;
      default: return state;
   }
}