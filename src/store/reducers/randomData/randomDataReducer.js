import createReducer from '../../utils/createReducer';
import {
	LOAD_DATA,
	UPDATE_PAGE,
	UPDATE_ITEMS_PER_PAGE,
	UPDATE_FILTER,
	UPDATE_SORT,
} from '../../actions/randomData/randomDataActionConstants.js';
import generate from '../../../util/helpers/randomData';

const initialState = {
	items: [],
	filteredItems: [],
	count: 0,
	page: 0,
	itemsPerPage: 12,
	filter: '',
	sort: '',
};

export default createReducer(
	{
		[LOAD_DATA]: loadRandomData,
		[UPDATE_PAGE]: updatePage,
		[UPDATE_ITEMS_PER_PAGE]: updateItemsPerPage,
		[UPDATE_FILTER]: updateFilter,
		[UPDATE_SORT]: updateSort,
	},
	initialState
);

function loadRandomData(state, action) {
	const count = action.payload;
	const items = generate(count);

	return {
		...state,
		items,
		filteredItems: items,
		count: items.length,
	};
}

function updatePage(state, action) {
	const page = action.payload;

	return {
		...state,
		page,
	};
}

function updateItemsPerPage(state, action) {
	const itemsPerPage = action.payload;

	return {
		...state,
		itemsPerPage,
	};
}

function updateFilter(state, action) {
	const filter = action.payload;
	const filteredItems = filter
		? state.items.filter((item) => item.name.toLowerCase().includes(filter.toLowerCase())) : state.items;

	return {
		...state,
		filter,
		filteredItems,
		count: filteredItems.length,
	};
}

function updateSort(state, action) {
	const sort = action.payload;
	const [field, direction] = sort.split('-');

	const sortDirection = direction === 'asc' ? 1 : -1;
	const dataItems = state.filteredItems.length
		? state.filteredItems
		: state.items;

	const sorted = dataItems.sort((a, b) => {
		if (a[field] > b[field]) {
			return sortDirection;
		}
		if (b[field] > a[field]) {
			return sortDirection * -1;
		}
        return 0;
	});

	const filteredItems = state.filteredItems.length
		? sorted
		: state.filteredItems;

	return {
		...state,
		sort,
		filteredItems,
	};
}
