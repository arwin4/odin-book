import React from 'react';
import postPropType from '@propTypes/post';
import PropTypes from 'prop-types';
import AuthorLabel from './AuthorLabel';
import MediaContainer from './MediaContainer';
import Meta from './Meta';
import './style/PostCard.css';

export default function PostCard({ posts }) {
  let leftPosts;
  if (posts.length > 0) {
    leftPosts = [...posts];
    leftPosts.splice(-1);
  }
  const post = posts.at(-1);

  return (
    <div className="post-card">
      <div className="nested-post">
        {leftPosts.length > 0 && <PostCard posts={leftPosts} />}
      </div>
      <AuthorLabel post={post} />
      <MediaContainer post={post} />
      <Meta post={post} />
    </div>
  );
}

/* Prop Types */
PostCard.propTypes = {
  posts: PropTypes.arrayOf(postPropType.isRequired).isRequired,
};
