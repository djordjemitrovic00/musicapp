import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import usePagingHook from '../hooks/usePagingHook';
import { getRequest } from '../request/jsonServerRequest';

const apiCall = (page, itemsPerPage, sort, sortDirection, filter) =>
	getRequest('/items', {
		_page: page,
		_limit: itemsPerPage,
		// Conditionally add to params object if keys exist
		...(sort && { _sort: sort }),
		...(sortDirection && { _order: sortDirection }),
		...(filter && { q: filter }),
	});

const Context = createContext();
export const useRandomData = () => useContext(Context);

const RandomDataProvider = ({ children }) => {
	const setPage = (page) => {
		setState({ ...state, page });
	};

	const setItemsPerPage = (itemsPerPage) => {
		setState({ ...state, itemsPerPage });
	};

	const setSort = (sort) => {
		setState({ ...state, sort });
	};

	const setFilter = (filter) => {
		setState({ ...state, filter });
	};

	const [state, setState] = useState({
		page: 0,
		setPage,
		itemsPerPage: 12,
		setItemsPerPage,
		sort: '',
		setSort,
		filter: '',
		setFilter,
	});

	const data = usePagingHook(
		state.page,
		state.itemsPerPage,
		state.sort,
		state.filter,
		apiCall
	);
	return (
		<Context.Provider value={{ state, data }}>{children}</Context.Provider>
	);
};

RandomDataProvider.propTypes = {
	children: PropTypes.node,
};

export default RandomDataProvider;
