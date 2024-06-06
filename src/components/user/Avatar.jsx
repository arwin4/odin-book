import React, { useRef } from 'react';
import userPropType from '@propTypes/user';
import getCurrentUser from '@utils/getCurrentUser';
import Dialog from '@components/dialog/Dialog';
import ImageUploadBox from '@components/ImageUploadBox';
import { useFetcher } from 'react-router-dom';
import LabelButton from '@components/buttons/LabelButton';

import './style/Avatar.css';
import { InlineIcon } from '@iconify/react';

export default function Avatar({ user }) {
  const changeAvatarModal = useRef();
  const fetcher = useFetcher();
  const busy = fetcher.state !== 'idle';

  if (fetcher.state === 'loading') {
    changeAvatarModal.current.close();
  }

  const isCurrentUser = user.id === getCurrentUser().id;

  return (
    <div className="avatar-wrapper">
      <img src={user.attributes.avatarUrl} alt="" className="avatar" />

      {isCurrentUser && (
        <button
          className="change-avatar-button"
          type="button"
          aria-label="change-avatar"
          onClick={() => changeAvatarModal.current.showModal()}
        >
          <InlineIcon icon="ph:pencil-simple-duotone" height="unset" />
        </button>
      )}

      <Dialog
        title="Upload new avatar"
        icon="ph:user-rectangle"
        ref={changeAvatarModal}
      >
        <fetcher.Form
          className="change-avatar-form"
          method="patch"
          encType="multipart/form-data"
        >
          <ImageUploadBox />
          <LabelButton
            icon="ph:upload-simple"
            text="Submit new avatar"
            type="submit"
            busy={busy}
          />
        </fetcher.Form>
      </Dialog>
    </div>
  );
}

/* Prop Types */
Avatar.propTypes = {
  user: userPropType.isRequired,
};
