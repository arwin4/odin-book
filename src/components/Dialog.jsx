import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

// TODO: add soft dismiss

const Dialog = forwardRef(({ children, title }, ref) => (
  <dialog className="change-avatar-modal" ref={ref}>
    <header>{title}</header>
    {children}
  </dialog>
));

export default Dialog;

Dialog.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
};
