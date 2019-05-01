import { combineReducers } from 'redux';
// import { loadingReducer } from './utils_reducer';
// import { projectsReducer, singleProjectReducer } from './project_reducer';
// import * as SbjReducers from './subject_reducer';
import { userReducer, authReducer } from './user_reducer';
import { reducer as formReducer } from 'redux-form';

const appReducer = combineReducers({
  user: userReducer,
  form: formReducer,
  auth: authReducer
  // loggedIn: authReducer,
  // loading: loadingReducer,
  // projects: projectsReducer,
  // project: singleProjectReducer,
  // subjects: SbjReducers.subjectsReducer
});

const rootReducer = (state, action) => {
  if (action.type === 'UNAUTH_USER') {
    state = undefined;
  }
  return appReducer(state, action)
}

export default rootReducer;