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
import Backdrop from '../BackdropComponent';
import useDebounce from '../../../hooks/useDebounceHook';
import { useRandomData } from '../../../context/RandomDataContext';

const PagingSortingFilteringExampleServerSide = () => {
	const [filterText, setFilterText] = useState('');
	const { state, data } = useRandomData();
	const { items, loading, totalCount, currentPage, itemsPerPage, sort } = data;
	const { setPage, setItemsPerPage, setSort, setFilter } = state;
	// const { t } = useTranslation();

	// Use debounce to prevent too many rerenders
	const debouncedFilterText = useDebounce(filterText, 500);

	useEffect(() => {
		setFilter(filterText);
	}, [debouncedFilterText]);

	const handleFilterTextChange = (event) => {
		const filterText = event.target.value;
		setFilterText(filterText);
	};

	const handleSortChange = (event) => {
		const sort = event.target.value;
		setSort(sort);
	};

	const handlePageChange = (event, newPage) => {
		setPage(newPage);
	};

	const handleItemsPerPageChange = (event) => {
		const itemsPerPage = parseInt(event.target.value);
		setItemsPerPage(itemsPerPage);
		setPage(0);
	};

	return (
		<Paper
			sx={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'start',
				py: 2,
				minHeight: 500,
				position: 'relative',
			}}
			elevation={5}
		>
			{loading && <Backdrop isLoading position="absolute" />}
			<Typography sx={{ my: 4 }} variant="h4" gutterBottom align="center">
				Pagination, Filtering and Sorting Example Server Side
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
					<FormControl sx={{ flexGrow: 1 }}>
						<InputLabel id="sort-label">Sort</InputLabel>
						<Select
							label="Sort"
							labelId="sort-label"
							id="sort-select-helper"
							value={sort || ''}
							onChange={handleSortChange}
						>
							<MenuItem value="">None</MenuItem>
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
				<Grid container sx={{ position: 'relative' }}>
					{items &&
						items.length > 0 &&
						items.map((item) => (
							<Grid
								item
								sx={{ p: 2 }}
								xs={12}
								sm={6}
								md={4}
								lg={3}
								key={item.id}
							>
								{/* TODO separate into component */}
								<Paper sx={{ p: 3, height: '100%' }} elevation={3}>
									<Typography sx={{ fontWeight: 600 }}>Name: </Typography>
									<Typography display="inline"> {item.name}</Typography>
									<Divider />
									<Typography sx={{ fontWeight: 600 }}>Company: </Typography>
									<Typography display="inline"> {item.company}</Typography>
									<Divider />
									<Typography sx={{ fontWeight: 600 }}>Color: </Typography>
									<Typography display="inline"> {item.color}</Typography>
									<Divider />
									<Typography sx={{ fontWeight: 600 }}>Price: </Typography>
									<Typography display="inline"> {item.price}</Typography>
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
			</Box>
		</Paper>
	);
};

export default PagingSortingFilteringExampleServerSide;
