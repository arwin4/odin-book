import React from 'react';
import postPropType from '@propTypes/post';
import AuthorLabel from './AuthorLabel';
import MediaContainer from './MediaContainer';
import Meta from './Meta';

export default function PostCard({ post }) {
  return (
    <div>
      <AuthorLabel post={post} />
      <MediaContainer post={post} />
      <Meta post={post} />
    </div>
  );
}

/* Prop Types */
PostCard.propTypes = {
  post: postPropType.isRequired,
};
