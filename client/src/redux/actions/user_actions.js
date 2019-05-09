import * as API from '../../utils/API';
import * as User from '../action_types/user_types';
import * as Food from '../action_types/food_types';
import * as Utils from '../action_types/utils_types';

export function getCurrentUser(headers) {
   return async dispatch => {
      try {
         const user = await API.getCurrentUser(headers);
         console.log("USer from getCurrentUser: ", user);
         // a timeout to make the preety loading icon stay longer so it doesn't look glitchy
         // Placing the timeout here instead of in the component avoids a stutter caused by re-render
         setTimeout(() => {
            dispatch({ type: User.AUTHENTICATED });
            dispatch({ type: User.SET_CURRENT_USER, payload: user.data });
            dispatch({ type: Food.SET_FOODS, payload: user.data.foods });
            dispatch({ type: Utils.TOGGLE_LOADING });
         }, 1500)
      } catch (e) {

      }
   }
}

export function loginAction(credentials, history) {
   return async dispatch => {
      try {
         const user = await API.login(credentials);
         if (user.data.error) {
            dispatch({
               type: User.AUTHENTICATION_ERROR,
               payload: 'invalid email or password'
            });
         } else {
            dispatch({ type: User.AUTHENTICATED });
            dispatch({ type: User.SET_CURRENT_USER, payload: user.data });
            localStorage.setItem('token', user.data.token);
            dispatch({ type: Food.SET_FOODS, payload: user.data.foods });
            dispatch({ type: Utils.TOGGLE_LOADING });
            history.push('/foods');
         }
      } catch (e) {
         dispatch({
            type: User.AUTHENTICATION_ERROR,
            payload: 'invalid email or password'
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