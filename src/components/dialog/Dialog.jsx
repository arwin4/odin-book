import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { InlineIcon } from '@iconify/react';
import CloseButton from './CloseButton';

// TODO: add soft dismiss

const Dialog = forwardRef(({ children, title, icon }, ref) => (
  <dialog ref={ref}>
    <header>
      <InlineIcon className="icon" icon={icon} height="unset" />
      <h1>{title}</h1>
      <form className="close-btn" method="dialog">
        <CloseButton icon="ph:x-circle" type="submit" />
      </form>
    </header>
    {children}
  </dialog>
));

export default Dialog;

Dialog.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};
