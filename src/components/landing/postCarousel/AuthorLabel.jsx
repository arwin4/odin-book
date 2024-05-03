/* eslint-disable react/prop-types */

import React from 'react';
import { formatRelative } from 'date-fns';

export default function AuthorLabel({ post }) {
  const { firstName } = post.relationships.author.data.attributes;
  const { dateCreated } = post.attributes;
  // TODO: prevent firstName overflow (limit chars at ~30?)

  const formattedDate = formatRelative(dateCreated, new Date());

  return (
    <>
      Posted by {firstName}, {formattedDate}
    </>
  );
}
