import * as API from '../../utils/API';
import * as User from '../action_types/user_types';
import * as Food from '../action_types/food_types';
import * as Utils from '../action_types/utils_types';

export function getCurrentUser(headers) {
   return async dispatch => {
      const user = await API.getCurrentUser(headers);
      console.log("USer from getCurrentUser: ", user);
      // a timeout to make the preety loading icon stay longer so it doesn't look glitchy
      // Placing the timeout here instead of in the component avoids a stutter caused by re-render
      setTimeout(() => {
         dispatch({ type: User.AUTHENTICATED });
         dispatch({ type: User.SET_CURRENT_USER, payload: user.data });
         dispatch({ type: Food.SET_FOODS, payload: user.data.foods });
         dispatch({ type: Utils.TOGGLE_LOADING });
      }, 1500);
   }
}

export function loginAction(credentials, history) {
   return async dispatch => {
      try {
         const user = await API.login(credentials);
         console.log('user in loginAction:::', user);
         if (user.data.error) {
            dispatch({
               type: User.AUTHENTICATION_ERROR,
               payload: user.data.error
            });
         } else {
            dispatch({ type: User.AUTHENTICATED });
            dispatch({ type: User.SET_CURRENT_USER, payload: user.data });
            localStorage.setItem('token', user.data.token);
            dispatch({ type: Food.SET_FOODS, payload: user.data.foods });
            dispatch({ type: Utils.TOGGLE_LOADING });
            history.push('/foods');
         }
      } catch ({ message }) {
         dispatch({
            type: Utils.HANDLE_ERROR,
            payload: 'Something went wrong - please try again later.'
         })
      }

   }
}

export function signupAction(signupData) {
   return (dispatch) => {
      API.signup(signupData)
         .then(user => {
            dispatch({ type: User.AUTHENTICATED });
            localStorage.setItem('token', user.data.token);
            dispatch({ type: User.SET_CURRENT_USER, payload: user.data });
         })
         .catch(error => {
            console.log("Error in signup: ", error);
         })
   }
}

export function signoutAction() {
   localStorage.removeItem('token');
   return {
      type: User.UNAUTHENTICATED
   }
}

export function searchUsersAction(search_criteria) {
   return async dispatch => {
      try {
         dispatch({ type: Utils.TOGGLE_LOADING });
         const matches = await API.searchUsers(search_criteria);
         dispatch({
            type: User.SET_SEARCH_RESULTS,
            payload: matches.data
         });
         dispatch({ type: Utils.TOGGLE_LOADING });
      } catch ({ message }) {
         dispatch({
            type: Utils.HANDLE_ERROR,
            payload: 'Something went wrong - please try again later.'
         })
      }
   }
}