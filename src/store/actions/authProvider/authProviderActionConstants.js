import { createErrorType, createFetchType, createSuccessType } from "../actionHelpers";

export const AUTH_PROVIDER_SCOPE = 'AUTH_PROVIDER';
export const AUTH_PROVIDER_FETCH = createFetchType(AUTH_PROVIDER_SCOPE);
export const AUTH_PROVIDER_SUCCESS = createSuccessType(AUTH_PROVIDER_SCOPE);
export const AUTH_PROVIDER_ERROR = createErrorType(AUTH_PROVIDER_SCOPE);