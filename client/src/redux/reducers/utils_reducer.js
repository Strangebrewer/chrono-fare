import * as Utils from '../action_types/utils_types';

export function loadingReducer(state = {}, action) {
  console.log(state.loading);
  return !state.loading;
}