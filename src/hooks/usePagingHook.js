import { useState, useCallback, useEffect } from 'react';
import { unstable_batchedUpdates } from 'react-dom';

const usePagingHook = (page, itemsPerPage, sort, filter, apiCallback) => {
	const [items, setItems] = useState([]);
	const [totalPages, setTotalPages] = useState(0);
	const [currentPage, setCurrentPage] = useState(0);
	const [loading, setLoading] = useState(false);
	const [totalCount, setTotalCount] = useState(0);

	const reload = useCallback(async () => {
		setLoading(true);
		try {
			const [sortColumn, sortDirection] = sort.split('-');
			const response = await apiCallback(
				page,
				itemsPerPage,
				sortColumn,
				sortDirection,
				filter
			);
			if (response.status === 200) {
				//   Prevents multiple rerenders
				unstable_batchedUpdates(() => {
					setItems(response.data);
					setTotalCount(parseInt(response.headers['x-total-count']));
					setTotalPages(
						Math.ceil(response.headers['x-total-count'] / itemsPerPage)
					);
					setCurrentPage(page);
				});
			}
		} catch (e) {
			console.error(e);
		} finally {
			setLoading(false);
		}
	}, [
		setItems,
		setLoading,
		setTotalPages,
		setCurrentPage,
		apiCallback,
		page,
		itemsPerPage,
		sort,
		filter,
	]);

	useEffect(() => {
		reload();
	}, [reload]);

	return {
		items,
		loading,
		reload,
		totalCount,
		totalPages,
		currentPage,
		itemsPerPage,
		sort,
	};
};

export default usePagingHook;
