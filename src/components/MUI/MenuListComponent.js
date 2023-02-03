import React, { useState } from 'react';
import { Button, Menu, MenuItem } from '@mui/material';

const MenuListComponent = () => {
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<div>
			<Button onClick={handleClick}>Menu List</Button>
			<Menu id="menu-list" anchorEl={anchorEl} open={open} onClose={handleClose}>
				<MenuItem onClick={handleClose}>Menu Item 1</MenuItem>
				<MenuItem onClick={handleClose}>Menu Item 2</MenuItem>
				<MenuItem onClick={handleClose}>Menu Item 3</MenuItem>
			</Menu>
		</div>
	);
};

export default MenuListComponent;
