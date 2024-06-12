import React from 'react';
import postPropType from '@propTypes/post';

export default function MediaContainer({ post }) {
  const { imageUrl } = post.attributes;
  return (
    <div className="media-container">
      <img alt="" className="media" src={imageUrl} />
    </div>
  );
}

/* Prop Types */
MediaContainer.propTypes = {
  post: postPropType.isRequired,
};
