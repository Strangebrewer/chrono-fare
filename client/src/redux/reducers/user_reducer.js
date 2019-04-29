export function userReducer(state = [], action) {
  switch (action.type) {
    case 'SET_CURRENT_USER':
      return {
        ...state,
        ...action.payload
      }
    case 'LOGIN_USER':
      return {
        ...state,
        ...action.payload
      }
    case 'SIGNUP_USER_':
      return {
        ...state,
        ...action.payload
      }
    case 'SET_PROJECT_ORDER':
      return {
        ...state,
        project_order: action.payload
      }
    default: return state;
  }
}

export function authReducer(state = [], action) {
  switch (action.type) {
    case 'TOGGLE_LOGGED_IN':
      return !state.loggedIn;
    default: return state;
  }
}