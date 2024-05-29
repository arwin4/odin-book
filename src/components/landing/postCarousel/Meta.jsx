import React from 'react';
import postPropType from '@propTypes/post';
import LabelButton from '@components/buttons/LabelButton';
import { useFetcher } from 'react-router-dom';
import getCurrentUser from '@utils/getCurrentUser';

export default function Meta({ post }) {
  const fetcher = useFetcher();
  const currentUser = getCurrentUser();

  const { description } = post.attributes;
  const likeCount = post.relationships.likes.data.length;

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
            value={currentUserLikedThisPost ? 'remove-like' : 'add-like'}
          />
        </fetcher.Form>
        <div className="likes">
          <span className="count">{likeCount} </span>
          people loved this
        </div>
      </div>
    </div>
  );
}

/* Prop Types */
Meta.propTypes = {
  post: postPropType.isRequired,
};
