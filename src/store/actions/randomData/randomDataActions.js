import {
	LOAD_DATA,
	UPDATE_PAGE,
	UPDATE_ITEMS_PER_PAGE,
    UPDATE_FILTER,
    UPDATE_SORT
} from './randomDataActionConstants';

export const loadData = (payload) => ({
	type: LOAD_DATA,
	payload,
});

export const updatePage = (payload) => ({
	type: UPDATE_PAGE,
	payload,
});

export const updateItemsPerPage = (payload) => ({
	type: UPDATE_ITEMS_PER_PAGE,
	payload,
});

export const updateFilter = (payload) => ({
    type: UPDATE_FILTER,
	payload,
})

export const updateSort = (payload) => ({
    type: UPDATE_SORT,
	payload,
})
