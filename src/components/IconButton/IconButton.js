import React, { useRef } from 'react';
import PropType from 'prop-types';

const IconButton = ({ children, onClick, className }) => {
  const buttonRef = useRef(null);

  function handleClick() {
    buttonRef.current.blur();
    if (typeof onClick === 'function') {
      onClick();
    }
  }

  return (
    <button
      type="button"
      ref={buttonRef}
      onClick={handleClick}
      className={`c-icon-button ${className && className}`}
    >
      {children}
    </button>
  );
};

IconButton.propTypes = {
  children: PropType.node,
  onClick: PropType.func,
  className: PropType.string,
};

export default IconButton;
