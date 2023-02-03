import createReducer from "../../utils/createReducer";
import {
  ADD_LOADER,
  REMOVE_LOADER,
} from "../../actions/app/appActionConstants";

const initialState = {
  loaderCount: 0,
};
export default createReducer(
  {
    [ADD_LOADER]: addLoader,
    [REMOVE_LOADER]: removeLoader,
  },
  initialState
);

function addLoader(state, action) {
  let loaderCount = state.loaderCount;
  let actionType = action.payload.replace("[FETCH]", "");
  if (!state[actionType]) {
    loaderCount++;
  }
  return {
    ...state,
    [actionType]: true,
    loaderCount,
  };
}

function removeLoader(state, action) {
  let actionType = action.payload
    .replace("[SUCCESS]", "")
    .replace("[ERROR]", "");
  let loaderCount = state.loaderCount;
  if (state[actionType] === true) {
    loaderCount--;
  }

  return {
    ...state,
    [actionType]: false,
    loaderCount,
  };
}
