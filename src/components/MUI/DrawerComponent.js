import React from 'react';
import PropTypes from 'prop-types';
import { Drawer } from '@mui/material';

const DrawerComponent = ({ open, toggleOpen, content, anchor = 'right' }) => (
	<Drawer
		sx={{
			minWidth: 250,
			'& .MuiDrawer-paper': {
				minWidth: 250,
			},
		}}
		anchor={anchor}
		open={open}
		onClose={toggleOpen}
	>
		{content ? content : null}
	</Drawer>
);

DrawerComponent.propTypes = {
	open: PropTypes.bool,
	toggleOpen: PropTypes.func,
	content: PropTypes.any,
	anchor: PropTypes.oneOf(['top', 'right', 'left', 'bottom']),
};

export default DrawerComponent;
