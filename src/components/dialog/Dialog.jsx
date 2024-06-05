import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { InlineIcon } from '@iconify/react';
import CloseButton from './CloseButton';

const Dialog = forwardRef(({ children, title, icon }, ref) => {
  // Enable light dismiss. Source: https://stackoverflow.com/a/76466616/22857578
  if (ref.current) {
    ref.current.addEventListener('click', ({ target: dialog }) => {
      if (dialog.nodeName === 'DIALOG') {
        // NOTE: Disabling the transition temporarily is necessary to prevent
        // the position of the dialog from shifting during closing.
        dialog.classList.add('disable-transition');
        dialog.close('dismiss');
        dialog.classList.remove('disable-transition');
      }
    });
  }

  return (
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
  );
});

export default Dialog;

Dialog.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};
