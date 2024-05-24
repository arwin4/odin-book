/* eslint-disable react/button-has-type */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { InlineIcon } from '@iconify/react';

import './style/LabelButton.css';

export default function LabelButton({
  onClick = () => null,
  icon = '',
  inline = '', // block style by default
  text,
  type = 'button',
  busy = false,
}) {
  const btnClass = classNames('label-btn', { inline, busy });
  const spinnerIcon = 'svg-spinners:ring-resize';

  return (
    <button type={type} className={btnClass} onClick={onClick}>
      <InlineIcon
        className="icon"
        icon={busy ? spinnerIcon : icon}
        height="unset"
      />
      {text}
    </button>
  );
}

/* Prop Types */
LabelButton.propTypes = {
  onClick: PropTypes.func,
  icon: PropTypes.string,
  inline: PropTypes.string,
  text: PropTypes.string.isRequired,
  type: PropTypes.string,
  busy: PropTypes.bool,
};
