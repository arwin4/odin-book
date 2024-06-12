import React from 'react';
import PropTypes from 'prop-types';

import postPropType from '@propTypes/post';
import { Link } from 'react-router-dom';

import './style/PostCard.css';
import AuthorLabel from '@components/PostCard/AuthorLabel';
import DateLabel from '@components/PostCard/DateLabel';
import MediaContainer from '@components/PostCard/MediaContainer';

export default function SmallPostCard({ post, interactable = true }) {
  const { username } = post.relationships.author.data.attributes;

  if (!interactable) {
    return (
      <div className="post-card">
        <AuthorLabel post={post} />
        <DateLabel post={post} />
        <MediaContainer post={post} />
      </div>
    );
  }
  return (
    <div className="post-card">
      <Link to={`/user/${username}`}>
        <AuthorLabel post={post} />
      </Link>
      <DateLabel post={post} />
      <Link to={`/post/${post.id}`}>
        <MediaContainer post={post} />
      </Link>
    </div>
  );
}

/* Prop Types */
SmallPostCard.propTypes = {
  post: postPropType.isRequired,
  interactable: PropTypes.bool,
};
