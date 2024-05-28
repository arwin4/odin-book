import React from 'react';
import postPropType from '@propTypes/post';
import { InlineIcon } from '@iconify/react';
import { Link } from 'react-router-dom';

export default function AuthorLabel({ post }) {
  const { firstName, username, avatarUrl } =
    post.relationships.author.data.attributes;

  return (
    <Link className="author-label" to={`/user/${username}`}>
      <img src={avatarUrl} className="avatar" alt="" />
      <div className="text-label">
        <InlineIcon className="icon" icon="ph:user-circle" />
        <span className="first-name">{firstName}</span>
        <span className="username">@{username}</span>
      </div>
    </Link>
  );
}

/* Prop Types */
AuthorLabel.propTypes = {
  post: postPropType.isRequired,
};
