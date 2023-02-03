import {
  AUTHENTICATE_USER,
  CLEAR_LOGIN_USER_ERROR,
  LOGIN_USER_ERROR,
  LOGIN_USER_FETCH,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER,
  RESET_LOGIN_STATE,
  UPDATE_USER_JWT_TOKEN,
  REFRESH_TOKEN,
  GENERATE_TOKEN,
  GENERATE_TOKEN_SUCCESS,
  GENERATE_TOKEN_ERROR,
} from './loginActionConstants';


export const fetchUser = (payload) => ({
  type: LOGIN_USER_FETCH,
  payload,
});

export const fetchUserSuccess = (payload) => ({
  type: LOGIN_USER_SUCCESS,
  payload,
});

export const fetchUserError = (payload) => ({
  type: LOGIN_USER_ERROR,
  payload,
});

export const updateUserToken = (payload) => ({
  type: UPDATE_USER_JWT_TOKEN,
  payload,
});

export const resetLoginState = () => ({
  type: RESET_LOGIN_STATE,
});

export const clearLoginErrors = () => ({
  type: CLEAR_LOGIN_USER_ERROR,
});

export const authenticateUser = () => ({
  type: AUTHENTICATE_USER,
});

export const logoutUser = () => ({
  type: LOGOUT_USER,
});

export const refreshUserToken = (payload) => ({
  type: REFRESH_TOKEN,
  payload
});

export const generateToken = (payload) => ({
  type: GENERATE_TOKEN,
  payload,
});

export const generateTokenSuccess = (payload) => ({
  type: GENERATE_TOKEN_SUCCESS,
  payload,
});

export const generateTokenError = (payload) => ({
  type: GENERATE_TOKEN_ERROR,
  payload,
});
