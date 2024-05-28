import React from 'react';
import postPropType from '@propTypes/post';
import LabelButton from '@components/buttons/LabelButton';
import { useFetcher } from 'react-router-dom';
import getCurrentUser from '@utils/getCurrentUser';

export default function Meta({ post }) {
  const fetcher = useFetcher();
  console.log(fetcher.state);
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
      <div className="likes-wrapper">
        <fetcher.Form className="like-form">
          <LabelButton
            icon={currentUserLikedThisPost ? 'ph:heart-fill' : 'ph:heart'}
            inline="true"
            formMethod={currentUserLikedThisPost ? 'DELETE' : 'POST'}
            type="submit"
            name="post-id"
            value={post.id}
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
