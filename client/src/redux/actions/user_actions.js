import * as API from '../../utils/API';

export const AUTHENTICATED = 'authenticated_user';
export const UNAUTHENTICATED = 'unauthenticated_user';
export const AUTHENTICATION_ERROR = 'authentication_error';

export function getCurrentUser(headers) {
  return (dispatch) => {
    API.getCurrentUser(headers)
      .then(user => {
        dispatch({
          type: 'TOGGLE_LOGGED_IN'
        });
        dispatch({
          type: 'SET_CURRENT_USER',
          payload: user.data
        });
        dispatch({
          type: 'TOGGLE_LOADING'
        });
      })
      .catch(error => {
        dispatch({
          type: 'SET_CURRENT_USER',
          payload: { user: 'unauthorized' }
        });
      })
  }
}

export function setCurrentUser(user) {
  return dispatch => {
    dispatch({
      type: 'TOGGLE_LOGGED_IN'
    });
    dispatch({
      type: 'TOGGLE_LOADING'
    });
    dispatch({
      type: 'SET_CURRENT_USER',
      payload: user
    });
  }
}

export function login(credentials, history) {
  return async dispatch => {
    try {
      const res = await API.login(credentials);
      dispatch({ type: AUTHENTICATED });
      localStorage.setItem('token', res.data.token);
      history.push('/foods');
    } catch (e) {
      dispatch({
        type: AUTHENTICATION_ERROR,
        payload: 'invalid email or password'
      })
    }
  }
}

export function signup(signupData) {
  return (dispatch) => {
    API.signup(signupData)
      .then(user => {
        localStorage.setItem('token', user.data.token);
        dispatch({
          type: 'SIGNUP_USER',
          payload: user.data
        });
        dispatch({
          type: 'TOGGLE_LOGGED_IN'
        });
      })
      .catch(error => {
        console.log("Error in signup: ", error);
      })
  }
}

function objectifyProjects(projects) {
  const projectObject = {};
  for (let i = 0; i < projects.length; i++) {
    const element = projects[i];
    const order = JSON.parse(element.subject_order);
    projectObject[element._id] = element;
    projectObject[element._id].subject_order = order;
  }
  return projectObject;
}


// added for scalac tutorial
export function signInAction({ username, password }, history) {
  return async dispatch => {
    try {
      const res = await API.login({ username, password });
      dispatch({ type: AUTHENTICATED });
      localStorage.setItem('token', res.data.token);
      history.push('/foods');
    } catch (e) {
      dispatch({
        type: AUTHENTICATION_ERROR,
        payload: 'invalid email or password'
      })
    }
  }
}

// added for scalac tutorial
export function signOutAction() {
  localStorage.removeItem('token');
  return {
    type: UNAUTHENTICATED
  }
}