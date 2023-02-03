import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { ErrorMessage } from 'formik';
import IconButton from '../IconButton/IconButton';
import { ReactComponent as Search } from '../../assets/images/svg/search.svg';
import { ReactComponent as EyeOn } from '../../assets/images/svg/eye-on.svg';
import { ReactComponent as EyeOff } from '../../assets/images/svg/eye-off.svg';
import { ReactComponent as CapsLock } from '../../assets/images/svg/caps-lock.svg';

const BaseInputField = ({
  type,
  label,
  field,
  form,
  placeholder,
  clearPlaceholderOnFocus = true,
  isSearch,
  className,
  disabled,
  centerText,
  link,
  errorMessage,
  autoFocus,
  isCapsLockOn,
  ...props
}) => {
  const [inputPlaceholder, setPlaceholder] = useState(placeholder);

  const inputField = useRef(null);

  useEffect(() => {
    if (autoFocus) {
      inputField.current.focus();
    }
  }, [autoFocus, inputField]);

  useEffect(() => {
    if (errorMessage) {
      form.setFieldError(field.name, errorMessage);
    }
  }, [errorMessage]); // eslint-disable-line

  useEffect(() => {
    setPlaceholder(placeholder);
  }, [placeholder]);

  const [inputType, setInputType] = useState('password');
  const passwordInput = type === 'password' ? ' c-input--password' : '';

  const showPassword = () => {
    if (inputType === 'password') {
      setInputType('text');
    } else {
      setInputType('password');
    }
  };

  // Nester Formik Field Names get bugged because of Undefined values, so i had to fix it like this
  // If you ask why 0 and 1? I dont see a need for forms to be nested more then 2 levels?
  const fieldName = field.name.split('.');

  const formError =
    fieldName[0] && fieldName[1]
      ? form.errors[fieldName[0]] && form.errors[fieldName[0]][fieldName[1]]
      : form.errors[fieldName[0]];

  const formTouched =
    fieldName[0] && fieldName[1]
      ? form.touched[fieldName[0]] && form.touched[fieldName[0]][fieldName[1]]
      : form.touched[fieldName[0]];

  function styles() {
    let style = 'c-input';

    if (formError && formTouched) {
      style += ` c-input--error`;
    }

    if (type === 'password') {
      style += ` c-input--password`;
    }

    if (isSearch) {
      style += ` c-input--search`;
    }

    if (centerText) {
      style += ` c-input--center-text`;
    }

    if (type === 'number') {
      style += ` c-input--demi-bold`;
    }

    if (className) {
      style += ` ${className}`;
    }

    return style;
  }

  const additionalActions = () => {
    if (!clearPlaceholderOnFocus) {
      return null;
    }

    return {
      onFocus: () => {
        setPlaceholder('');
      },
      onBlur: (e) => {
        setPlaceholder(placeholder);
        field.onBlur(e);
      },
    };
  };
  return (
    <div className={styles()}>
      {!!label && (
        <label className="c-input__label" htmlFor={field.name}>
          {label}
        </label>
      )}
      {link && <div className="c-input__link">{link}</div>}
      <div className="c-input__field-wrap">
        <input
          ref={inputField}
          type={type === 'password' ? inputType : type}
          placeholder={inputPlaceholder}
          disabled={disabled}
          {...field}
          {...props}
          {...additionalActions()}
          className="c-input__field"
        />
        {!!isSearch && <Search className="c-input__icon" />}
        {!!passwordInput && (
          <>
            {isCapsLockOn && <CapsLock className="c-input__caps-lock" />}
            <IconButton
              onClick={() => {
                showPassword();
              }}
              className="c-input__icon"
            >
              {inputType === 'password' ? <EyeOff /> : <EyeOn />}
            </IconButton>
          </>
        )}
      </div>

      <ErrorMessage name={field.name}>
        {(errorMessage) => (
          <span className="c-input__error">{errorMessage}</span>
        )}
      </ErrorMessage>
    </div>
  );
};
BaseInputField.propTypes = {
  type: PropTypes.string,
  field: PropTypes.shape({
    name: PropTypes.string,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
  }),
  form: PropTypes.shape({
    errors: PropTypes.shape({}),
    setFieldError: PropTypes.func,
    touched: PropTypes.shape({}),
  }),
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({})]),
  placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  disabled: PropTypes.bool,
  isSearch: PropTypes.bool,
  className: PropTypes.string,
  link: PropTypes.node,
  errorMessage: PropTypes.string,
  centerText: PropTypes.bool,
  clearPlaceholderOnFocus: PropTypes.bool,
  demiBold: PropTypes.bool,
  touched: PropTypes.bool,
  autoFocus: PropTypes.bool,
  isCapsLockOn: PropTypes.bool,
};

export default BaseInputField;
