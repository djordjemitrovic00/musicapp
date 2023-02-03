import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@mui/material';

const ErrorMessageComponent = ({ error }) => (
	<Typography variant="body1" color="error" my={2}>
		{error}
	</Typography>
);

ErrorMessageComponent.propTypes = {
	error: PropTypes.string.isRequired,
};

export default ErrorMessageComponent;
