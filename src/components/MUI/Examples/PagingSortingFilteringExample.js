import React, { useEffect, useState } from 'react';
import {
	Paper,
	Box,
	Grid,
	Typography,
	Divider,
	TablePagination,
	TextField,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
} from '@mui/material';
// import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector, batch } from 'react-redux';
import useDebounce from '../../../hooks/useDebounceHook';
import {
	itemsSelector,
	pageSelector,
	itemsPerPageSelector,
	countSelector,
	sortSelector,
} from '../../../store/selectors/randomDataSelectors';
import {
	loadData,
	updatePage,
	updateItemsPerPage,
	updateFilter,
	updateSort,
} from '../../../store/actions/randomData/randomDataActions';

const PagingSortingFilteringExample = () => {
	const [filterText, setFilterText] = useState('');

	const dispatch = useDispatch();
	// const { t } = useTranslation();
	const items = useSelector(itemsSelector);
	const currentPage = useSelector(pageSelector);
	const itemsPerPage = useSelector(itemsPerPageSelector);
	const totalCount = useSelector(countSelector);
	const sort = useSelector(sortSelector) || 'name-asc';

    // Use debounce to prevent too many rerenders
	const debouncedFilterText = useDebounce(filterText, 500);

	useEffect(() => {
		dispatch(loadData(30));
		dispatch(updateSort(sort));
	}, []);

	useEffect(() => {
		batch(() => {
			dispatch(updateFilter(filterText));
			currentPage > 0 && dispatch(updatePage(0));
		});
	}, [debouncedFilterText]);

	const handleFilterTextChange = (event) => {
		const filterText = event.target.value;
		setFilterText(filterText);
	};

	const handleSortChange = (event) => {
		const sort = event.target.value;
		dispatch(updateSort(sort));
	};

	const handlePageChange = (event, newPage) => {
		dispatch(updatePage(newPage));
	};

	const handleItemsPerPageChange = (event) => {
		const itemsPerPage = parseInt(event.target.value);
		batch(() => {
			dispatch(updateItemsPerPage(itemsPerPage));
			dispatch(updatePage(0));
		});
	};


	return (
		<Paper
			sx={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'start',
				py: 2,
				minHeight: 500,
			}}
			elevation={5}
		>
			<Typography sx={{ my: 4 }} variant="h4" gutterBottom align="center">
				Pagination, Filtering and Sorting Example Client Side
			</Typography>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					flexWrap: 'wrap',
					mx: 2,
				}}
			>
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'space-between',
						width: '100%',
					}}
				>
					{/* TODO Separate into SelectComponent */}
					<FormControl sx={{ flexGrow: 1 }}>
						<InputLabel id="sort-label">Sort</InputLabel>
						<Select
							label="Sort"
							labelId="sort-label"
							id="sort-select-helper"
							value={sort}
							onChange={handleSortChange}
						>
							<MenuItem value="name-asc">Name - A-Z</MenuItem>
							<MenuItem value="name-desc">Name - Z-A</MenuItem>
							<MenuItem value="price-asc">Price - Lowest to Highest</MenuItem>
							<MenuItem value="price-desc">Price - Highest to Lowest</MenuItem>
						</Select>
					</FormControl>
					<TextField
						sx={{ flexGrow: 1 }}
						variant="outlined"
						label="Filter"
						placeholder="Filter"
						value={filterText}
						onChange={handleFilterTextChange}
					/>
				</Box>
			</Box>
			<Grid container>
				{items &&
					items.length > 0 &&
					items
						.slice(
							currentPage * itemsPerPage,
							currentPage * itemsPerPage + itemsPerPage
						)
						.map((product, index) => (
							// ! DON'T USE index for key, this is for example only
							<Grid item sx={{ p: 2 }} xs={12} sm={6} md={4} lg={3} key={index}>
								{/* TODO separate into component */}
								<Paper sx={{ p: 3, height: '100%' }} elevation={3}>
									<Typography sx={{ fontWeight: 600 }}>Name: </Typography>
									<Typography display="inline"> {product.name}</Typography>
									<Divider />
									<Typography sx={{ fontWeight: 600 }}>Designer: </Typography>
									<Typography display="inline"> {product.designer}</Typography>
									<Divider />
									<Typography sx={{ fontWeight: 600 }}>Type: </Typography>
									<Typography display="inline"> {product.type}</Typography>
									<Divider />
									<Typography sx={{ fontWeight: 600 }}>Price: </Typography>
									<Typography display="inline"> ${product.price}</Typography>
								</Paper>
							</Grid>
						))}
			</Grid>
			<Box sx={{ width: '100%' }}>
				<TablePagination
					component="div"
					count={totalCount}
					page={currentPage}
					onPageChange={handlePageChange}
					rowsPerPage={itemsPerPage}
					onRowsPerPageChange={handleItemsPerPageChange}
					rowsPerPageOptions={[12, 24, 48, 96]}
					labelRowsPerPage="Items per page"
					showFirstButton
					showLastButton
				/>
			</Box>
		</Paper>
	);
};

export default PagingSortingFilteringExample;
