import React from 'react';
import PropTypes from 'prop-types';
import postPropType from '@propTypes/post';

import './style/UserPosts.css';
import userPropType from '@propTypes/user';
import { Link } from 'react-router-dom';

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
        <Link to={`/post/${post.id}`} key={post.id}>
          <img
            className="post-media"
            src={post.attributes.imageUrl}
            alt={post.attributes.description}
          />
        </Link>
      ))}
    </div>
  );
}

UserPosts.propTypes = {
  posts: PropTypes.arrayOf(postPropType.isRequired).isRequired,
  user: userPropType.isRequired,
};
