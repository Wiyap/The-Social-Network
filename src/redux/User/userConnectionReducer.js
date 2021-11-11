import { 
  USER_REQUEST, 
  REQUEST_SUCCESS, 
  REQUEST_FAILED,
  CONNECTION_REQUEST_SUCCESS
 } from './userConnectionTypes'

const initialState = {
  loading: false,
  user: {},
  jwt: null,
  error: ''
}

const userConnectionReducer = (state = initialState, action) => {
  switch(action.type) {
    case USER_REQUEST:
      return {
        ...state,
        loading: true
      };
    case REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case REQUEST_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error
      };
      case CONNECTION_REQUEST_SUCCESS:
        return {
          ...state,
          loading: false,
          user: action.user,
          jwt: action.jwt
        };
      default:
      return state;
  }
}

export default userConnectionReducer;