import * as Utils from '../action_types/utils_types';

export function loadingReducer(state = {}, action) {
   switch (action.type) {
      case Utils.TOGGLE_LOADING:
         return !state;
      default: return state;
   }
}

export function errorReducer(state = '', action) {
   switch (action.type) {
      case Utils.HANDLE_ERROR:
         return action.payload;
      default: return state;
   }
}