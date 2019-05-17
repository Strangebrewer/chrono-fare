import { combineReducers } from 'redux';
import { errorReducer, loadingReducer } from './utils_reducer';
import { userReducer, userSearchReducer, authReducer } from './user_reducer';
import { foodReducer } from './food_reducer';
import { reducer as formReducer } from 'redux-form';

const appReducer = combineReducers({
   user: userReducer,
   form: formReducer,
   auth: authReducer,
   loading: loadingReducer,
   foods: foodReducer,
   will_robinson: errorReducer,
   user_search: userSearchReducer
});

const rootReducer = (state, action) => {
   if (action.type === 'UNAUTH_USER') {
      state = undefined;
   }
   return appReducer(state, action)
}

export default rootReducer;