import { createSelector } from 'reselect';

const registerSelector = (state) => state.register;

export const selectRegisterError = createSelector(
  registerSelector,
  (state) => state.errorMessage,
);
