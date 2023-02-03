import { getRequest, postRequest, replaceInUrl } from "./index";
import apiEndpoints from "./apiEndpoints";

export const getUsernames = (emailorusername) =>
  getRequest(apiEndpoints.authentications.getUsernames, {
    emailorusername,
  });

export const attemptLogin = (payload) =>
  postRequest(apiEndpoints.authentications.login, payload);

export const attemptAuthProvider = (provider, search) =>
  getRequest(
    replaceInUrl(apiEndpoints.authentications.authProvider, {
      provider,
      search,
    })
  );

export const attemptRegister = (payload) =>
  postRequest(apiEndpoints.authentications.register, payload);

export const updateSecurityAnswer = (payload) =>
  postRequest(apiEndpoints.authentications.confirmSecurityQuestion, payload);

export const refreshTokenRequest = (payload) =>
  postRequest(apiEndpoints.authentications.refreshToken, payload);

export const logoutUserRequest = () => getRequest(apiEndpoints.users.logout);

export const generateTokenRequest = (payload) =>
  postRequest(apiEndpoints.authentications.generateToken, payload);
