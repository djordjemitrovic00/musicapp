import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Select, { components, createFilter } from 'react-select';
import { ErrorMessage, useField } from 'formik';
import { ReactComponent as FilledChevronDown } from '../../assets/images/svg/filled-chevron-down.svg';

const SelectField = ({
  label,
  disabled,
  options,
  link,
  defaultSelected = null,
  dropdownFullHeight,
  selectOption,
  ...props
}) => {
  const [field, meta, helpers] = useField(props);

  const filterConfig = {
    ignoreCase: true,
    ignoreAccents: true,
    trim: true,
    matchFrom: 'start',
  };

  useEffect(() => {
    if (defaultSelected) {
      helpers.setValue(defaultSelected);
    }
  }, [defaultSelected]); // eslint-disable-line

  const DropdownIndicator = (props) =>
    components.DropdownIndicator && (
      <components.DropdownIndicator {...props}>
        <FilledChevronDown />
      </components.DropdownIndicator>
    );

  function styles() {
    let style = 'c-input';

    if (meta.error && meta.touched) {
      style += ` c-input--error`;
    }

    if (dropdownFullHeight) {
      style += ` c-input--dropdown-full-height`;
    }

    return style;
  }

  return (
    <div className={styles()}>
      {!!label && (
        <label className="c-input__label" htmlFor={field.name}>
          {label}
        </label>
      )}
      {!!link && <div className="c-input__link">{link}</div>}
      <Select
        defaultValue={defaultSelected || options[0]}
        components={{ DropdownIndicator }}
        isSearchable={false}
        classNamePrefix="c-select"
        options={options}
        isDisabled={disabled}
        {...field}
        {...props}
        onBlur={(e) => {
          helpers.setTouched(true);
          field.onBlur(e);
        }}
        onChange={(selectedOption) => {
          helpers.setValue(selectedOption);

          if (props.onChange) {
            props.onChange();
          }

          if (selectOption) {
            selectOption(selectedOption);
          }
        }}
        filterOption={createFilter(filterConfig)}
      />
      <ErrorMessage name={field.name}>
        {(errorMessage) => {
          if (typeof errorMessage === 'string') {
            return <span className="c-input__error">{errorMessage}</span>;
          }
          return <span className="c-input__error">{errorMessage.value}</span>;
        }}
      </ErrorMessage>
    </div>
  );
};

SelectField.propTypes = {
  field: PropTypes.shape({
    name: PropTypes.string,
  }),
  form: PropTypes.shape({}),
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({})]),
  disabled: PropTypes.bool,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
  ),
  onChange: PropTypes.func,
  link: PropTypes.node,
  defaultSelected: PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
  dropdownFullHeight: PropTypes.bool,
  selectOption: PropTypes.func,
};

export default SelectField;
