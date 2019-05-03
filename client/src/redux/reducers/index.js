import { combineReducers } from 'redux';
import { loadingReducer } from './utils_reducer';
import { userReducer, authReducer } from './user_reducer';
import { foodReducer } from './food_reducer';
import { reducer as formReducer } from 'redux-form';

const appReducer = combineReducers({
  user: userReducer,
  form: formReducer,
  auth: authReducer,
  loading: loadingReducer,
  foods: foodReducer
});

const rootReducer = (state, action) => {
  if (action.type === 'UNAUTH_USER') {
    state = undefined;
  }
  return appReducer(state, action)
}

export default rootReducer;