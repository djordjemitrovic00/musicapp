import {
  DELETE,
  ERROR,
  FETCH,
  SUCCESS,
  UPDATE,
  SUBMIT,
} from '../actions/actionHelpers';
import { addLoader, removeLoader } from '../actions/app/appActions';

const promiseTypes = [FETCH, UPDATE, DELETE, SUBMIT];
export default ({ dispatch }) => (next) => (action) => {
  const promiseType = promiseTypes.find((promiseType) =>
    action.type.includes(promiseType),
  );
  if (promiseType) {
    dispatch(addLoader(action.type));
    return next(action);
  }

  if (action.type.includes(SUCCESS) || action.type.includes(ERROR)) {
    // const actionType = action.type.includes(SUCCESS)
    //   ? action.type.replace(SUCCESS, '[LOADING]')
    //   : action.type.replace(ERROR, '[LOADING]');

    dispatch(removeLoader(action.type));
    return next(action);
  }
  next(action);
};
