import React from 'react';
import postPropType from '@propTypes/post';

export default function Meta({ post }) {
  const { description } = post.attributes;
  // TODO: prevent description overflow (limit chars at ~30?)
  const likeCount = post.relationships.likes.data.length;

  return (
    <>
      {likeCount}
      {description}
    </>
  );
}

/* Prop Types */
Meta.propTypes = {
  post: postPropType.isRequired,
};
