import {
  CLEAR_REGISTER_USER_ERROR,
  REGISTER_USER_ERROR,
  REGISTER_USER_FETCH,
  REGISTER_USER_SUCCESS,
  RESET_REGISTER_STATE,
} from "./registerActionConstants";

export const registerUser = (payload) => ({
  type: REGISTER_USER_FETCH,
  payload,
});

export const registerUserSuccess = (payload) => ({
  type: REGISTER_USER_SUCCESS,
  payload,
});

export const registerUserError = (payload) => ({
  type: REGISTER_USER_ERROR,
  payload,
});

export const resetRegisterState = () => ({
  type: RESET_REGISTER_STATE,
});

export const clearRegisterErrors = () => ({
  type: CLEAR_REGISTER_USER_ERROR,
});
