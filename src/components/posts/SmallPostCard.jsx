import React from 'react';
import PropTypes from 'prop-types';

import AuthorLabel from '@components/landing/postCarousel/AuthorLabel';
import DateLabel from '@components/landing/postCarousel/DateLabel';
import MediaContainer from '@components/landing/postCarousel/MediaContainer';
import postPropType from '@propTypes/post';
import { Link } from 'react-router-dom';

import './style/PostCard.css';

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
