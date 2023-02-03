import { createSelector } from 'reselect';

const loginSelector = (state) => state.login;

export const selectLoginEmail = createSelector(
  loginSelector,
  (state) => state.email,
);

export const selectUsernames = createSelector(
  loginSelector,
  (state) => state.usernames,
);

export const selectTokens = createSelector(
  loginSelector,
  (state) => state.token,
);

export const selectJWTToken = createSelector(
  loginSelector,
  (state) => state.token,
);


export const selectLoginError = createSelector(
  loginSelector,
  (state) => state.errorMessage,
);
