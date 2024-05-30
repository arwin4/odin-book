import React from 'react';

import AuthorLabel from '@components/landing/postCarousel/AuthorLabel';
import DateLabel from '@components/landing/postCarousel/DateLabel';
import MediaContainer from '@components/landing/postCarousel/MediaContainer';
import postPropType from '@propTypes/post';
import { Link } from 'react-router-dom';

export default function SmallPostCard({ post }) {
  return (
    <div className="post-card">
      <AuthorLabel post={post} />
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
};
