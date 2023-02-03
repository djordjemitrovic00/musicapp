import React, { useState } from 'react';
import { Button, Divider, Paper, Typography } from '@mui/material';
import DialogComponent from '../DialogComponent';
import DrawerComponent from '../DrawerComponent';
import PopoverComponent from '../PopoverComponent';

const Modals = () => {
	const [dialogOpen, setDialogOpen] = useState(false);
	const [drawerOpen, setDrawerOpen] = useState(false);
	const [popoverOpen, setPopoverOpen] = useState(false);
	const [anchorEl, setAnchorEl] = useState(null);

	return (
		<Paper
			sx={{
				p: 2,
				display: 'flex',
				flexDirection: 'column',
			}}
            elevation={5}
		>
			<Typography variant="h4" gutterBottom align="center">
				Modals Example
			</Typography>
			<Divider />
			<Button onClick={() => setDialogOpen(true)}>Open Dialog</Button>
			<Button onClick={() => setDrawerOpen(true)}>Open Drawer</Button>
			<Button
				onClick={(e) => {
					setPopoverOpen(true);
					setAnchorEl(e.currentTarget);
				}}
			>
				Open Popover
			</Button>
			<DialogComponent
				title="Dialog Title"
				content={<Typography>Dialog Content</Typography>}
				open={dialogOpen}
				onClose={() => setDialogOpen(false)}
				maxWidth="md"
				fullWidth
				responsive
			/>
			<DrawerComponent
				anchor="left"
				content={<Typography sx={{ p: 2 }}>Drawer Content</Typography>}
				open={drawerOpen}
				toggleOpen={() => setDrawerOpen(!drawerOpen)}
			/>
			<PopoverComponent
				anchorEl={anchorEl}
				open={popoverOpen}
				onClose={() => {
					setPopoverOpen(false);
					setAnchorEl(null);
				}}
				content={<Typography sx={{ p: 2 }}>Popover Content</Typography>}
			/>
		</Paper>
	);
};

export default Modals;
