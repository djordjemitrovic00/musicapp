import {
  createClearType,
  createErrorType,
  createFetchType,
  createLoadingType,
  createSuccessType,
} from "../actionHelpers";

export const REGISTER_USER_SCOPE = "REGISTER_USER";
export const REGISTER_USER_FETCH = createFetchType(REGISTER_USER_SCOPE);
export const REGISTER_USER_SUCCESS = createSuccessType(REGISTER_USER_SCOPE);
export const REGISTER_USER_ERROR = createErrorType(REGISTER_USER_SCOPE);
export const CLEAR_REGISTER_USER_ERROR = createClearType(
  `${REGISTER_USER_SCOPE}_ERROR`
);
export const REGISTER_USER_LOADING = createLoadingType(REGISTER_USER_SCOPE);

export const RESET_REGISTER_STATE = "RESET_REGISTER_STATE";
