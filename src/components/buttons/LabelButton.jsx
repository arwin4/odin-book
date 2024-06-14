/* eslint-disable react/button-has-type */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { InlineIcon } from '@iconify/react';

import './style/LabelButton.css';

export default function LabelButton({
  onClick = () => null,
  inline = '', // block style by default
  text = null,
  type = 'button',
  icon = null,
  name = null,
  value = null,
  formMethod = null,
  busy = false,
  disabled = false,
}) {
  const btnClass = classNames('label-btn', { inline, busy, disabled });
  const spinnerIcon = 'svg-spinners:ring-resize';

  return (
    <button
      type={type}
      className={btnClass}
      onClick={onClick}
      name={name}
      value={value}
      formMethod={formMethod}
    >
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
  name: PropTypes.string,
  value: PropTypes.string,
  formMethod: PropTypes.string,
  inline: PropTypes.string,
  text: PropTypes.string,
  type: PropTypes.string,
  busy: PropTypes.bool,
  disabled: PropTypes.bool,
};
