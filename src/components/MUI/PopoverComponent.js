import React from 'react';
import PropTypes from 'prop-types';
import { Box, Popover } from '@mui/material';

const PopoverComponent = ({ open, anchorEl, onClose, content }) => {
	const handleClose = () => {
		onClose();
	};

	return (
		<Box component="div">
			<Popover
				sx={{ p: 5 }}
				open={open}
				anchorEl={anchorEl}
				onClose={handleClose}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left',
				}}
			>
				{content}
			</Popover>
		</Box>
	);
};

PopoverComponent.propTypes = {
	anchorEl: PropTypes.object,
	open: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	content: PropTypes.any,
};

export default PopoverComponent;
