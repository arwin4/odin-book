import PostCard from '@components/posts/PostCard';
import React from 'react';
import PropTypes from 'prop-types';
import './style/Posts.css';
import postPropType from '@propTypes/post';

export default function Posts({ posts }) {
  return (
    <div className="posts">
      {posts.map((post) => (
        <PostCard post={post} key={post.id} />
      ))}
    </div>
  );
}

/* Prop Types */
Posts.propTypes = {
  posts: PropTypes.arrayOf(postPropType.isRequired).isRequired,
};