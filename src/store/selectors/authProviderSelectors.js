import { createSelector } from 'reselect';

const authProviderSelector = (state) => state.authProvider;


export const selectLoginError = createSelector(
  authProviderSelector,
  (state) => state.errorMessage,
);
