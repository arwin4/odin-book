import React from 'react';
import postPropType from '@propTypes/post';
import './style/Meta.css';

export default function Meta({ post }) {
  // const { description } = post.attributes;
  // TODO: prevent description overflow (limit chars at ~30?)
  const likeCount = post.relationships.likes.data.length;

  return (
    <div className="meta">
      <div className="likes">
        <span className="count">{likeCount} </span>
        people loved this
      </div>
      {/* <div className="description">{description}</div> */}
    </div>
  );
}
// durationF formatDuration(fnsDuration, { delimiter: ' and ' }),

/* Prop Types */
Meta.propTypes = {
  post: postPropType.isRequired,
};
