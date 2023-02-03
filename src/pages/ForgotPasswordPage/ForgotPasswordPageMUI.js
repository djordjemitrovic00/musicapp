import React from 'react';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import {
	Box,
	Container,
	Typography,
	Button,
	TextField,
	Link,
	Grid,
} from '@mui/material';
import Backdrop from '../../components/MUI/BackdropComponent';
import { LOGIN_PAGE } from '../../constants/pages';
import { NavLink } from 'react-router-dom';
import forgotPasswordValidation from '../../validations/forgotPasswordValidation';
import forgotPasswordInitialValues from '../../initialValues/forgotPasswordInitialValues';

const ForgotPasswordPage = () => {
	const { t } = useTranslation();

	const handleSubmit = (values) => {
		console.log('Values', values);
	};

	const formik = useFormik({
		initialValues: forgotPasswordInitialValues,
		validationSchema: forgotPasswordValidation,
		onSubmit: handleSubmit,
		validateOnBlur: true,
		enableReinitialize: true,
	});

	return (
		<Container component="main" maxWidth="md">
			<Box
				sx={{
					marginTop: 32,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				<Typography component="h1" variant="h5">
					{t('forgotPassword.title')}
				</Typography>
				<Box
					component="form"
					onSubmit={formik.handleSubmit}
					sx={{ position: 'relative', mt: 1, p: 1 }}
				>
					<Backdrop position="absolute" isLoading={false} />
					<TextField
						name="email"
						label={t('login.forgotPasswordEmail')}
						margin="normal"
						value={formik.values.email}
						onChange={formik.handleChange}
						error={formik.touched.email && Boolean(formik.errors.email)}
						helperText={formik.touched.email && formik.errors.email}
						autoFocus
						fullWidth
					/>
					<Button
						type="submit"
						variant="contained"
						sx={{ mt: 3, mb: 2 }}
						fullWidth
					>
						{t('forgotPassword.label')}
					</Button>
					<Grid container justifyContent="center">
						<Link
							to={LOGIN_PAGE}
							component={NavLink}
							variant="body2"
							underline="hover"
						>
							{t('common.back')}
						</Link>
					</Grid>
				</Box>
			</Box>
		</Container>
	);
};

export default ForgotPasswordPage;
