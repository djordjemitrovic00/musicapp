import {
  deleteRequest,
  getRequest,
  patchRequest,
  replaceInUrl,
  postRequest,
} from './index';
import apiEndpoints from './apiEndpoints';

export const getAccount = (accountUid) =>
  getRequest(replaceInUrl(apiEndpoints.accounts.get, { accountUid }));

export const getAccountUsers = (accountUid) =>
  getRequest(replaceInUrl(apiEndpoints.accounts.getUsers, { accountUid }));

export const getUserPermissions = (currentAccountUid, currentUserUid) =>
  getRequest(
    replaceInUrl(apiEndpoints.accounts.getCurrentUserPermissions, {
      currentAccountUid,
      currentUserUid,
    }),
  );

export const getAccountAddresses = (accountUid) =>
  getRequest(replaceInUrl(apiEndpoints.accounts.getAddresses, { accountUid }));

export const getAccountSettingsRequest = (accountUid) =>
  getRequest(replaceInUrl(apiEndpoints.accounts.getSettings, { accountUid }));

export const updateAccountAddressRequest = (accountUid, addressUid, data) =>
  patchRequest(
    replaceInUrl(apiEndpoints.accounts.updateAddress, {
      accountUid,
      addressUid,
    }),
    data,
  );

export const deleteAccountAddressRequest = (accountUid, addressUid) =>
  deleteRequest(
    replaceInUrl(apiEndpoints.accounts.deleteAddress, {
      accountUid,
      addressUid,
    }),
  );

export const postNewAccountUserRequest = (accountUid, data) =>
  postRequest(
    replaceInUrl(apiEndpoints.accounts.createUser, {
      accountUid,
    }),
    data,
  );

export const updateAccountUserRequest = (
  accountUid,
  userUid,
  actionType,
  data,
) =>
  patchRequest(
    replaceInUrl(apiEndpoints.accounts.updateUser, {
      accountUid,
      userUid,
      actionType,
    }),
    data,
  );

export const postAgreementRequest = (data) =>
  postRequest(apiEndpoints.accounts.agreement, data);
