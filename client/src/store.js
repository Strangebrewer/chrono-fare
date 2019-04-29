import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './redux/reducers/index';
import thunk from 'redux-thunk';

const defaultState = {
  
}

// this gives Redux in chrome dev tools access to this app's Redux store
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  defaultState,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;