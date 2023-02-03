import { createSelector } from 'reselect';

const randomDataSelector = (state) => state.randomData;

export const itemsSelector = createSelector(randomDataSelector, (state) =>
	(state.filter) ? state.filteredItems : state.items
);

export const pageSelector = createSelector(
	randomDataSelector,
	(state) => state.page
);

export const itemsPerPageSelector = createSelector(
	randomDataSelector,
	(state) => state.itemsPerPage
);

export const countSelector = createSelector(
	randomDataSelector,
	(state) => state.count
);

export const filterSelector = createSelector(
	randomDataSelector,
	(state) => state.filter
);

export const sortSelector = createSelector(
	randomDataSelector,
	(state) => state.sort
);
