import React, { createContext } from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from '@mui/material/styles';
import useToggleColorMode from '../hooks/useToggleColorMode';

export const ColorModeContext = createContext();

const ColorModeProvider = ({ children }) => {
	const [toggleColorMode, theme] = useToggleColorMode();
	return (
		<ColorModeContext.Provider value={toggleColorMode}>
			<ThemeProvider theme={theme}>{children}</ThemeProvider>
		</ColorModeContext.Provider>
	);
};

ColorModeProvider.propTypes = {
	children: PropTypes.node,
};

export default ColorModeProvider;
