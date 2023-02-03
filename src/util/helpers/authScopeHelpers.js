import { SESSION_STORAGE_SCOPE } from '../../constants/sessionStorage';

export function authScopeGetHelper(key) {
  if (sessionStorage.getItem(SESSION_STORAGE_SCOPE)) {
    return JSON.parse(sessionStorage.getItem(key));
  }

  return JSON.parse(localStorage.getItem(key));
}

export function authScopeStringGetHelper(key) {
  if (sessionStorage.getItem(SESSION_STORAGE_SCOPE)) {
    return sessionStorage.getItem(key);
  }

  return localStorage.getItem(key);
}

export function authScopeSetHelper(key, value) {
  if (sessionStorage.getItem(SESSION_STORAGE_SCOPE)) {
    sessionStorage.setItem(key, value);
  } else {
    localStorage.setItem(key, value);
  }
}

export function authScopeRemoveHelper(key) {
  if (sessionStorage.getItem(SESSION_STORAGE_SCOPE)) {
    sessionStorage.removeItem(key);
  } else {
    localStorage.removeItem(key);
  }
}

export function authScopeClearHelper() {
  sessionStorage.clear();
  if (!sessionStorage.getItem(SESSION_STORAGE_SCOPE)) {
    localStorage.clear();
  }
}
