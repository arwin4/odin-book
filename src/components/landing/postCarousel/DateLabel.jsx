import React from 'react';
import postPropType from '@propTypes/post';
import { formatRelative } from 'date-fns';
import { InlineIcon } from '@iconify/react';

export default function DateLabel({ post }) {
  const { dateCreated } = post.attributes;

  const formattedDate = formatRelative(dateCreated, new Date());

  return (
    <div className="date">
      <InlineIcon className="icon" icon="ph:calendar-dots-duotone" />
      {formattedDate}
    </div>
  );
}

/* Prop Types */
DateLabel.propTypes = {
  post: postPropType.isRequired,
};
