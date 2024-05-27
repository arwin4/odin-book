import React from 'react';
import postPropType from '@propTypes/post';

export default function Meta({ post }) {
  const { description } = post.attributes;
  const likeCount = post.relationships.likes.data.length;

  return (
    <div className="meta">
      <cite className="description">{description}</cite>
      <div className="likes">
        <span className="count">{likeCount} </span>
        people loved this
      </div>
    </div>
  );
}

/* Prop Types */
Meta.propTypes = {
  post: postPropType.isRequired,
};
