import * as User from '../action_types/user_types';

export function userReducer(state = [], action) {
  switch (action.type) {
    case User.SET_CURRENT_USER:
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

export function authReducer(state = {}, action) {
  switch (action.type) {
    case User.AUTHENTICATED:
      return { ...state, authenticated: true }
    case User.UNAUTHENTICATED:
    return { ...state, authenticated: false }
    case User.AUTHENTICATION_ERROR:
    return { ...state, error: action.payload }
    default: return state;
  }
}