import {
  SET_USER,
  SET_USER_ERROR,
} from './userActionConstants';

export const setUser = (payload) => ({
  type: SET_USER,
  payload,
});

export const setUserError = (payload) => ({
  type: SET_USER_ERROR,
  payload,
});
