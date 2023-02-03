import { ADD_LOADER, REMOVE_LOADER } from "./appActionConstants";

export const addLoader = (payload) => ({
  type: ADD_LOADER,
  payload,
});

export const removeLoader = (payload) => ({
  type: REMOVE_LOADER,
  payload,
});
