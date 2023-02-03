import createReducer from '../../utils/createReducer';
import {
  CLEAR_LOGIN_USER_ERROR,
  LOGIN_USER_ERROR,
  LOGIN_USER_SUCCESS,
  RESET_LOGIN_STATE,
  UPDATE_USER_JWT_TOKEN,
  GENERATE_TOKEN_SUCCESS,
  GENERATE_TOKEN_ERROR,
} from '../../actions/login/loginActionConstants';

const initialState = {
  email: '',
  token: {
    RefreshToken: '',
    JwtToken: '',
  },
  errorMessage: '',
};

export default createReducer(
  {

    [LOGIN_USER_SUCCESS]: setUser,
    [UPDATE_USER_JWT_TOKEN]: setUserJwtToken,
    [RESET_LOGIN_STATE]: resetLoginState,
    [LOGIN_USER_ERROR]: setError,
    [CLEAR_LOGIN_USER_ERROR]: clearLoginErrors,
    [GENERATE_TOKEN_SUCCESS]: generateToken,
    [GENERATE_TOKEN_ERROR]: generateTokenError,
  },
  initialState,
);


function setUser(state, action) {
  return {
    ...state,
    token: {
      ...state.token,
      JwtToken: action.payload.jwt,
      JwtRefreshToken: action.payload.refreshToken
    },
  };
}

function setUserJwtToken(state, action) {
  return {
    ...state,
    token: {
      ...state.token,
      JwtToken: action.payload,
    },
  };
}

function setError(state, action) {
  return {
    ...state,
    errorMessage: action.payload,
  };
}

function resetLoginState() {
  return initialState;
}

function clearLoginErrors(state) {
  return {
    ...state,
    errorMessage: '',
  };
}

function generateToken(state, action) {
  return {
    ...state,
    token: action.payload,
  };
}

function generateTokenError(state, action) {
  return {
    ...state,
    errorMessage: action.payload,
  };
}
