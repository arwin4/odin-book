import React from 'react';
import PropTypes from 'prop-types';
import postPropType from '@propTypes/post';

import './style/UserPosts.css';
import userPropType from '@propTypes/user';
import { Link } from 'react-router-dom';
import getCurrentUser from '@utils/getCurrentUser';

export default function UserPosts({ posts, user }) {
  const isCurrentUser = user.id === getCurrentUser().id;

  if (posts.length === 0)
    return (
      <div className="user-posts">
        <div className="no-posts">
          {isCurrentUser
            ? `You haven't posted anything yet.`
            : `${user.attributes.firstName} hasn't posted anything yet.`}
        </div>
      </div>
    );

  return (
    <div className="user-posts">
      {posts.map((post) => (
        <Link className="post-link" to={`/post/${post.id}`} key={post.id}>
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
