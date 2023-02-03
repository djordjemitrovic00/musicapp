import createReducer from '../../utils/createReducer';
import {
  SET_USER,
  SET_USER_ERROR,
} from '../../actions/user/userActionConstants';

const initialState = {
  user: {},
};

export default createReducer(
  {
    [SET_USER]: setUser,
    [SET_USER_ERROR]: setUserError,
  },
  initialState,
);

function setUser(state, action) {
  return {
    ...state,
    user: action.payload,
  };
}

function setUserError(state, action) {
  return {
    ...state,
    errorMessage: action.payload,
  };
}
