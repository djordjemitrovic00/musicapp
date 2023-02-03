import React from 'react';
import PropTypes from 'prop-types';
import {
	Dialog,
	DialogContent,
	DialogTitle,
	DialogActions,
	Button,
	useMediaQuery,
	useTheme,
} from '@mui/material';

const DialogComponent = ({
	title,
	content,
	onClose,
	open,
	maxWidth,
	fullWidth,
	responsive,
}) => {
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

	const handleClose = () => {
		onClose();
	};

	return (
		<Dialog
			maxWidth={maxWidth}
			fullWidth={fullWidth}
			fullScreen={responsive && fullScreen}
			onClose={handleClose}
			open={open}
		>
			<DialogTitle>{title}</DialogTitle>
			{content && <DialogContent>{content}</DialogContent>}
			<DialogActions>
				<Button onClick={handleClose}>OK</Button>
				<Button onClick={handleClose}>Cancel</Button>
			</DialogActions>
		</Dialog>
	);
};

DialogComponent.propTypes = {
	title: PropTypes.string,
	open: PropTypes.bool.isRequired,
	content: PropTypes.any,
	onClose: PropTypes.func.isRequired,
	maxWidth: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
	fullWidth: PropTypes.bool,
	responsive: PropTypes.bool,
};

export default DialogComponent;
