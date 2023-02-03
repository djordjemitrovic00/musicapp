import React from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as Checked } from '../../assets/images/svg/checked.svg';
import { ReactComponent as Unchecked } from '../../assets/images/svg/unchecked.svg';

const Checkbox = ({ className, children, name, onChange, checked, field }) => (
  <label htmlFor={name} className={`c-checkbox ${className || ''}`}>
    <input
      name={name}
      id={name}
      className="c-checkbox__field"
      type="checkbox"
      checked={checked}
      {...field}
      onChange={onChange || field.onChange}
    />

    <div className="c-checkbox__indicator">
      {checked ? (
        <Checked className="c-checkbox__icon" />
      ) : (
        <Unchecked className="c-checkbox__icon" />
      )}
    </div>
    <div className="c-checkbox__text">{children}</div>
  </label>
);

Checkbox.propTypes = {
  children: PropTypes.node,
  onChange: PropTypes.func,
  checked: PropTypes.bool,
  name: PropTypes.string,
  field: PropTypes.shape({
    onChange: PropTypes.func,
  }),
  className: PropTypes.string,
};

export default Checkbox;
