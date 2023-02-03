import React from 'react';
import { Paper, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

// Use these values from REDUX?
const rows = [
	{ id: 1, col1: 'Example', col2: 'Row', col3: '1' },
	{ id: 2, col1: 'Row', col2: 'Example', col3: '2' },
	{ id: 3, col1: '3', col2: 'Row', col3: 'Example' },
];

const columns = [
	{ field: 'col1', headerName: 'Column 1', flex: 1 },
	{ field: 'col2', headerName: 'Column 2', flex: 1 },
	{ field: 'col3', headerName: 'Column 2', flex: 1 },
];

const DataGridExample = () => {
	return (
		<Paper sx={{ p: 2 }} elevation={5}>
			<Typography variant="h4" gutterBottom align="center">
				DataGrid Example
			</Typography>
			<DataGrid autoHeight rows={rows} columns={columns} />
		</Paper>
	);
};

export default DataGridExample;
