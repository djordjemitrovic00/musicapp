import createReducer from "../../utils/createReducer";

import {
  AUTH_PROVIDER_ERROR,
  AUTH_PROVIDER_SUCCESS,
} from "../../actions/authProvider/authProviderActionConstants";

const initialState = {
  success: "",
  errorMessage: "",
};

export default createReducer(
  {
    [AUTH_PROVIDER_SUCCESS]: setProvider,
    [AUTH_PROVIDER_ERROR]: setProviderError,
  },
  initialState
);

function setProvider(state, action) {
  return {
    ...state,
    successMessage: action.payload,
  };
}


function setProviderError(state, action) {
  return {
    ...state,
    errorMessage: action.payload,
  };
}



