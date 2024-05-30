import React from 'react';
import PropTypes from 'prop-types';
import postPropType from '@propTypes/post';
import commentsPropType from '@propTypes/comments';

import LabelButton from '@components/buttons/LabelButton';
import { useFetcher } from 'react-router-dom';
import getCurrentUser from '@utils/getCurrentUser';

export default function Meta({ post, comments, toggleCommentsVisibility }) {
  const fetcher = useFetcher();
  const currentUser = getCurrentUser();

  const { description } = post.attributes;
  const likes = post.relationships.likes.data;
  const currentUserLikedThisPost = likes.some(
    (like) => like.id === currentUser.id,
  );

  return (
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
        <LabelButton
          icon="ph:chat-centered-text"
          inline="true"
          onClick={() => toggleCommentsVisibility()}
          text={comments.length.toString()}
        />
      </div>
    </div>
  );
}

/* Prop Types */
Meta.propTypes = {
  post: postPropType.isRequired,
  comments: commentsPropType.isRequired,
  toggleCommentsVisibility: PropTypes.func.isRequired,
};
