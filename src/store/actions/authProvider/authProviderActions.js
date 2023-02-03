import {
  AUTH_PROVIDER_ERROR,
  AUTH_PROVIDER_FETCH,
  AUTH_PROVIDER_SUCCESS,
} from "./authProviderActionConstants";

export const fetchAuthProvider = (payload) => ({
  type: AUTH_PROVIDER_FETCH,
  payload,
});

export const fetchAuthProviderSuccess = (payload) => ({
  type: AUTH_PROVIDER_SUCCESS,
  payload,
});

export const fetchAuthProviderError = (payload) => ({
  type: AUTH_PROVIDER_ERROR,
  payload,
});
