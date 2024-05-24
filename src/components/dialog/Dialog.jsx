import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { InlineIcon } from '@iconify/react';
import CloseButton from './CloseButton';

// TODO: add soft dismiss

const Dialog = forwardRef(({ children, title }, ref) => (
  <dialog className="change-avatar-modal" ref={ref}>
    <header>
      <InlineIcon className="icon" icon="ph:user-rectangle" height="unset" />
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
};
