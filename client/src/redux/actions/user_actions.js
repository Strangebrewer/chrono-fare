import * as API from '../../utils/API';
import * as User from '../action_types/user_types';
import * as Utils from '../action_types/utils_types';

export function getUserData(headers) {
  return async dispatch => {
    try {
      const user = await API.getCurrentUser(headers);
      dispatch({ type: User.AUTHENTICATED });
      dispatch({ type: Utils.TOGGLE_LOADING, payload: 'false' });
      dispatch({ type: User.SET_CURRENT_USER, payload: user.data });
    } catch (e) {

    }
  }
}

export function loginAction(credentials, history) {
  return async dispatch => {
    try {
      const res = await API.login(credentials);
      console.log("Res from loginAction: ", res)
      if (res.data.error) {
        dispatch({
          type: User.AUTHENTICATION_ERROR,
          payload: 'invalid email or password'
        });
      } else {
        dispatch({ type: User.AUTHENTICATED });
        dispatch({ type: User.SET_CURRENT_USER, payload: res.data });
        localStorage.setItem('token', res.data.token);
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
        dispatch({ type: 'SIGNUP_USER', payload: user.data });
      })
      .catch(error => {
        console.log("Error in signup: ", error);
      })
  }
}

// added for scalac tutorial
export function signoutAction() {
  localStorage.removeItem('token');
  return {
    type: User.UNAUTHENTICATED
  }
}