import React from 'react';
import postPropType from '@propTypes/post';
import { formatRelative } from 'date-fns';
import { InlineIcon } from '@iconify/react';

export default function Meta({ post }) {
  const { description, dateCreated } = post.attributes;
  const likeCount = post.relationships.likes.data.length;

  const formattedDate = formatRelative(dateCreated, new Date());

  return (
    <div className="meta">
      <div className="date">
        <InlineIcon className="icon" icon="ph:calendar-dots-duotone" />
        {formattedDate}
      </div>
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
