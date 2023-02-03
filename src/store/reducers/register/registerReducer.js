import createReducer from '../../utils/createReducer';
import {
  CLEAR_REGISTER_USER_ERROR,
  REGISTER_USER_ERROR,
  REGISTER_USER_SUCCESS,
  RESET_REGISTER_STATE,
} from '../../actions/register/registerActionConstants';

const initialState = {
  token: {
    JwtToken: '',
  },
  errorMessage: '',
};

export default createReducer(
  {

    [REGISTER_USER_SUCCESS]: setUser,
    [RESET_REGISTER_STATE]: resetRegisterState,
    [REGISTER_USER_ERROR]: setError,
    [CLEAR_REGISTER_USER_ERROR]: clearRegisterErrors,
  },
  initialState,
);


function setUser(state, action) {
  return {
    ...state,
    token: {
      ...state.token,
      JwtToken: action.payload.jwt,
    },
  };
}

function setError(state, action) {
  return {
    ...state,
    errorMessage: action.payload,
  };
}

function resetRegisterState() {
  return initialState;
}

function clearRegisterErrors(state) {
  return {
    ...state,
    errorMessage: '',
  };
}
