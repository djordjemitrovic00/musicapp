import {
  createClearType,
  createErrorType,
  createFetchType,
  createLoadingType,
  createSuccessType,
  createSubmitType,
} from '../actionHelpers';


export const LOGIN_USER_SCOPE = 'LOGIN_USER';
export const LOGIN_USER_FETCH = createFetchType(LOGIN_USER_SCOPE);
export const LOGIN_USER_SUCCESS = createSuccessType(LOGIN_USER_SCOPE);
export const LOGIN_USER_ERROR = createErrorType(LOGIN_USER_SCOPE);
export const CLEAR_LOGIN_USER_ERROR = createClearType(
  `${LOGIN_USER_SCOPE}_ERROR`,
);
export const LOGIN_USER_LOADING = createLoadingType(LOGIN_USER_SCOPE);


export const UPDATE_USER_JWT_TOKEN = 'UPDATE_USER_JWT_TOKEN';
export const RESET_LOGIN_STATE = 'RESET_LOGIN_STATE';
export const AUTHENTICATE_USER = 'AUTHENTICATE_USER';
export const LOGOUT_USER = 'LOGOUT_USER';
export const REFRESH_TOKEN = 'REFRESH_TOKEN';

const GENERATE_TOKEN_SCOPE = 'GENERATE_TOKEN';
export const GENERATE_TOKEN = createSubmitType(GENERATE_TOKEN_SCOPE);
export const GENERATE_TOKEN_SUCCESS = createSuccessType(GENERATE_TOKEN_SCOPE);
export const GENERATE_TOKEN_ERROR = createErrorType(GENERATE_TOKEN_SCOPE);
