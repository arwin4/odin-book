import React from 'react';
import postPropType from '@propTypes/post';

export default function MediaContainer({ post }) {
  const { imageUrl } = post.attributes;
  return <img alt="" className="media-container" src={imageUrl} />;
}

/* Prop Types */
MediaContainer.propTypes = {
  post: postPropType.isRequired,
};
