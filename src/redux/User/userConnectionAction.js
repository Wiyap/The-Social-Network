import { 
  USER_REQUEST, 
  REQUEST_SUCCESS, 
  REQUEST_FAILED,
  CONNECTION_REQUEST_SUCCESS
} from './userConnectionTypes';

export const userRequest = () => {
  return {
    type: USER_REQUEST,
  };
};

export const requestSuccess = (jwt, user) => {
  return {
    type: REQUEST_SUCCESS,
    user,
    jwt
  };
};

export const requestFailed = (error) => {
  return {
    type: REQUEST_FAILED,
    error
  };
};

export const connectionRequestSuccess = (jwt, user) => {
  return {
    type: CONNECTION_REQUEST_SUCCESS,
    user,
    jwt
  };
};