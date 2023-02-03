import React, { useEffect } from 'react';
import { Redirect, Route } from 'react-router';
import { useDispatch } from 'react-redux';
import { authenticateUser } from '../../store/actions/login/loginActions';
// import { selectIsUserAuthenticated } from '../../store/selectors/userSelectors';
import { LOGIN_PAGE } from '../../constants/pages';

const PrivateRoute = ({ ...props }) => {
  const dispatch = useDispatch();
  // const isUserAuthenticated = useSelector(selectIsUserAuthenticated);
  const isUserAuthenticated = true;

  useEffect(() => {
    if (!isUserAuthenticated) {
      dispatch(authenticateUser());
    }
  }, [isUserAuthenticated]); // eslint-disable-line

  return isUserAuthenticated ? (
    <Route {...props} />
  ) : (
    <Redirect to={LOGIN_PAGE} />
  );
};

export default PrivateRoute;
