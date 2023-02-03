import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { HOME_PAGE } from "../../constants/pages";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuthProvider } from "../../store/actions/authProvider/authProviderActions";
import { selectIsLoadingByActionType } from "../../store/selectors/loadingSelectors";
import { AUTH_PROVIDER_SCOPE } from "../../store/actions/authProvider/authProviderActionConstants";
import Backdrop from '../../components/MUI/BackdropComponent';

function AuthCallback({ history }) {
  const dispatch = useDispatch();
  const { provider } = useParams();
  const location = useLocation();

  const handleApiResponseSuccess = () => {
    history.push({
      pathname: HOME_PAGE,
      state: {
        from: history.location.pathname,
      },
    });
  };

  const isLoading = useSelector(selectIsLoadingByActionType(AUTH_PROVIDER_SCOPE));

  useEffect(() => {
    if (!location) {
      return;
    }
    const { search } = location;

    dispatch(fetchAuthProvider({ provider, search, handleApiResponseSuccess }));
  }, [location]);

  return (
    <div>
      {isLoading && <Backdrop position="absolute" isLoading={isLoading} />}
    </div>
  );
}

AuthCallback.propTypes = {
  history: PropTypes.shape({
    replace: PropTypes.func,
    push: PropTypes.func,
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
  }),
};

export default AuthCallback;
