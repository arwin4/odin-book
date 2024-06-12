import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import postPropType from '@propTypes/post';
import commentsPropType from '@propTypes/comments';

import LabelButton from '@components/buttons/LabelButton';
import { useFetcher } from 'react-router-dom';
import getCurrentUser from '@utils/getCurrentUser';
import Dialog from '@components/dialog/Dialog';

export default function Meta({ post, comments, toggleCommentsVisibility }) {
  const confirmPostDeletionModal = useRef();

  const fetcher = useFetcher();
  const currentUser = getCurrentUser();

  const { description } = post.attributes;
  const likes = post.relationships.likes.data;

  // Booleans
  const currentUserIsAuthor =
    currentUser.id === post.relationships.author.data.id;

  const currentUserLikedThisPost = likes.some(
    (like) => like.id === currentUser.id,
  );

  return (
    // TODO: description / comments shouldn't expand width
    <div className="meta">
      <cite className="description">{description}</cite>
      <div className="interaction-wrapper">
        <fetcher.Form className="like-form" method="POST">
          <input type="hidden" name="post-id" value={post.id} />
          <LabelButton
            busy={fetcher.state !== 'idle'}
            icon={currentUserLikedThisPost ? 'ph:heart-fill' : 'ph:heart'}
            inline="true"
            type="submit"
            name="intent"
            text={likes.length.toString()}
            value={currentUserLikedThisPost ? 'remove-like' : 'add-like'}
          />
        </fetcher.Form>
        {currentUserIsAuthor && (
          <LabelButton
            icon="ph:trash"
            inline="true"
            onClick={() => confirmPostDeletionModal.current.showModal()}
          />
        )}
        <LabelButton
          icon="ph:chat-centered-text"
          inline="true"
          onClick={() => toggleCommentsVisibility()}
          text={comments.length.toString()}
        />
      </div>

      <Dialog
        title="Delete post?"
        icon="ph:trash"
        ref={confirmPostDeletionModal}
      >
        <div className="confirmation">
          <fetcher.Form className="delete-post-confirmation-form" method="post">
            <input type="hidden" name="post-id" value={post.id} />
            <input
              type="hidden"
              name="username"
              value={currentUser.attributes.username}
            />
            <LabelButton
              icon="ph:trash"
              text="Confirm"
              type="submit"
              name="intent"
              value="delete-post"
              busy={fetcher.state !== 'idle'}
            />
          </fetcher.Form>
          <form className="cancel-btn" method="dialog">
            <LabelButton text="Cancel" type="submit" method="dialog" />
          </form>
        </div>
      </Dialog>
    </div>
  );
}

/* Prop Types */
Meta.propTypes = {
  post: postPropType.isRequired,
  comments: commentsPropType.isRequired,
  toggleCommentsVisibility: PropTypes.func.isRequired,
};
