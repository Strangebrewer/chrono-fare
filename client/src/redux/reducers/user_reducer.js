import { AUTHENTICATED, UNAUTHENTICATED, AUTHENTICATION_ERROR } from '../actions';

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

export function authReducer(state = {}, action) {
  switch (action.type) {
    case AUTHENTICATED:
      return { ...state, authenticated: true }
    case UNAUTHENTICATED:
    return { ...state, authenticated: false }
    case AUTHENTICATION_ERROR:
    return { ...state, error: action.payload }
    default: return state;
  }
}