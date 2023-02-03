import React from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as RadioOn } from '../../assets/images/svg/radio-on.svg';
import { ReactComponent as RadioOff } from '../../assets/images/svg/radio-off.svg';

const Checkbox = ({
  className,
  children,
  name,
  checked,
  field,
  value,
  selected,
  id,
}) => (
  <label
    htmlFor={name}
    className={`c-radio ${selected ? 'c-radio--selected' : ''} ${
      className || ''
    }`}
  >
    <input
      name={name}
      id={id}
      className="c-radio__field"
      type="radio"
      checked={checked}
      value={value}
      {...field}
    />
    <div className="c-radio__indicator">
      {selected ? (
        <RadioOn className="c-radio__icon" />
      ) : (
        <RadioOff className="c-radio__icon" />
      )}
    </div>
    <div className="c-radio__text">{children}</div>
  </label>
);

Checkbox.propTypes = {
  children: PropTypes.node,
  checked: PropTypes.bool,
  name: PropTypes.string,
  field: PropTypes.shape({}),
  form: PropTypes.shape({}),
  className: PropTypes.string,
  value: PropTypes.string,
  selected: PropTypes.bool,
  id: PropTypes.string,
};

export default Checkbox;
