import { createSelector } from "reselect";

const loadingSelector = (state) => state.loading;

export const selectIsLoadingByActionType = (loadingActionType) =>
  createSelector(loadingSelector, (state) => state[`${loadingActionType}`]);

export const selectIsLoadingByActionTypes = (actionTypes) =>
  createSelector(loadingSelector, (state) =>
    actionTypes.some((actionType) => state[`${actionType}`])
  );

export const selectLoaderCount = createSelector(
  loadingSelector,
  (state) => state.loaderCount
);
