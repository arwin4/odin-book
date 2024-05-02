import React from 'react';
import postPropType from '../../../propTypes/post';

export default function MediaContainer({ post }) {
  const { imageUrl } = post.attributes;
  return <img alt="" src={imageUrl} height={50} />;
}

/* Prop Types */
MediaContainer.propTypes = {
  post: postPropType.isRequired,
};
