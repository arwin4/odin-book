import React from 'react';
import PropTypes from 'prop-types';
import postPropType from '@propTypes/post';

import './style/UserPosts.css';

export default function UserPosts({ posts }) {
  console.log(posts);
  return (
    <div className="user-posts">
      {posts.map((post) => (
        <img
          src={post.attributes.imageUrl}
          alt={post.attributes.description}
          key={post.id}
        />
      ))}
    </div>
  );
}

UserPosts.propTypes = {
  posts: PropTypes.arrayOf(postPropType.isRequired).isRequired,
};
