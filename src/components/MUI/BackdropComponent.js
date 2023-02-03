import React from 'react';
import PropTypes from 'prop-types';
import { Backdrop, CircularProgress } from '@mui/material';
import { alpha } from '@mui/system';

const BackdropComponent = ({ position = 'fixed', isLoading }) => (
	<Backdrop
		sx={{
            // 'fixed' takes whole page, 'absolute' takes whole space of the parent element which needs to have 'relative' position
			position,
			backgroundColor: ({ palette }) =>
				alpha(palette.background.default, palette.action.disabledOpacity),
			zIndex: ({ zIndex }) => zIndex.drawer + 1,
		}}
		open={isLoading}
	>
		<CircularProgress />
	</Backdrop>
);

BackdropComponent.propTypes = {
	position: PropTypes.oneOf(['fixed', 'absolute']),
	isLoading: PropTypes.bool.isRequired,
};

export default BackdropComponent;
