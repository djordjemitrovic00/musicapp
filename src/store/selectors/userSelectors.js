import { createSelector } from 'reselect';
import isEmpty from 'lodash.isempty';
import { authScopeStringGetHelper } from '../../util/helpers/authScopeHelpers';
import { JWT_TOKEN } from '../../constants/localStorage';

export const userSelector = (state) => state.user;

export const selectAuthUser = createSelector(
  userSelector,
  (state) => state.user,
);

export const selectIsUserAuthenticated = createSelector(
  selectAuthUser,
  (state) => !isEmpty(state) || authScopeStringGetHelper(JWT_TOKEN),
);

export const getUserSecurityQuestion = createSelector(
  userSelector,
  (state) => state.securityQuestion,
);

export const getForgotPasswordRequest = createSelector(
  userSelector,
  (state) => state.user,
);

export const selectForgotPasswordError = createSelector(
  userSelector,
  (state) => state.errorMessage,
);

export const getResetPasswordRequest = createSelector(
  userSelector,
  (state) => state.user,
);