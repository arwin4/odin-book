import React from 'react';
import PropTypes from 'prop-types';
import postPropType from '@propTypes/post';

import './style/UserPosts.css';
import userPropType from '@propTypes/user';

export default function UserPosts({ posts, user }) {
  console.log(posts);

  if (posts.length === 0)
    return (
      <div className="user-posts">
        {user.attributes.firstName} has not made any posts yet.
      </div>
    );

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
  user: userPropType.isRequired,
};
