/* eslint-disable react/button-has-type */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { InlineIcon } from '@iconify/react';

import './style/CloseButton.css';

export default function CloseButton({
  onClick = () => null,
  icon = '',
  type = 'button',
}) {
  const btnClass = classNames('close-btn');

  return (
    <button
      type={type}
      className={btnClass}
      onClick={onClick}
      aria-label="close modal"
    >
      <InlineIcon className="icon" icon={icon} height="unset" />
    </button>
  );
}

/* Prop Types */
CloseButton.propTypes = {
  onClick: PropTypes.func,
  icon: PropTypes.string,
  type: PropTypes.string,
};
